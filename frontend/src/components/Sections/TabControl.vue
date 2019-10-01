<template>
  <section class="section-wrapper">
    <div id="tablist" class="el-tabs__nav flex-container card-container">
      <!-- <div ref="tabIteam" tabindex="0" class="el-tabs__item el-tabs__item1 is-active flex-item">
        <span>1</span>
      </div> -->
      <router-link v-for="(item, index) in adList" :key="index" :to="{name: 'Main', params: { id: item.adId }}" :tabindex="index" class="el-tabs__item el-tabs__item2 flex-item card">
        <span>
          <!--
          <img 
            v-if="item.content" 
            :src="JSON.parse(item.content).cover"
            alt="cover"
          >-->
          <!-- v-if="item.content.cover" 
           {{ item }} -->
          <!-- {{ item.adId }} -->
          <br>
          owner: <a href="">{{ item.owner.toString().slice(-6) }}</a>
          <br>
          price: {{ item.price / 10 ** 18 }}
          <br>
          content: {{item.content || '-' }}
        </span>
      </router-link>
      <!--
      <div tabindex="3" class="el-tabs__item el-tabs__item4 flex-item">
        <span>广告牌历史记录</span>
      </div>
      -->
    </div>

    <br>
    <div class="content-container  text-left">
      <h2>现价：<span>{{ artprice }} ETH</span>&nbsp;&nbsp;<span>(¥ {{ etzprice }})</span></h2>
      <p>
        现持有人：<span><a href="">{{ currentpatron }}</a></span><br>
        已持有时间：<span>{{ timeHeld }}</span><br>
        广告牌编号：<span>{{ adBoardId }}</span><br>
        分叉自：<span>{{ parentBoardId }}号广告牌</span><br>
        可用预存款：<span>{{ depositable }} ETH</span><br>
        拥有可赎回权利期限：<span>{{ dueDate }}</span><br>
        这是一块永远可以更新的广告牌。<br>
        你可以点击下方购买按钮花费以太坊购买它；<br>
        你也可以点击下方创建按钮免费分叉它。<br>
      </p>
    </div>
    <div id="tablist" class="el-tabs__nav flex-container">
      <div ref="tabIteam" tabindex="0" class="el-tabs__item el-tabs__item1 is-active flex-item">
        <span>创建你的广告牌</span>
      </div>
      <div tabindex="1" class="el-tabs__item el-tabs__item2 flex-item">
        <span v-if="isOwner">
          管理广告牌
        </span>
        <span v-else>
          买下广告牌
        </span>
      </div>
      <!--
      <div tabindex="3" class="el-tabs__item el-tabs__item4 flex-item">
        <span>广告牌历史记录</span>
      </div>
      -->
    </div>

    <div class="el-tabs__content">
      <div id="pane-0" class="el-tab-pane pane-0">
        <div class="in-el-tab-pane">
          <div v-if="isLogin">
            <fork />
          </div>
          <div v-else>
            <not_login_fork />
          </div>
        </div>
      </div>
      <div id="pane-1" class="el-tab-pane pane-1" :style="eltabpaneHeight">
        <div class="in-el-tab-pane" :style="eltabpaneHeight1">
          <div v-if="isLogin">
            <div v-if="isOwner">
              <management :tips1="tips1" />
            </div>
            <div v-else>
              <purchase
                :artprice="artprice"
                :etzprice="etzprice"
                :tips1="tips1"
              />
            </div>
          </div>
          <div v-else>
            <not_login_purchase />
          </div>
        </div>
      </div>
      <div id="pane-3" class="el-tab-pane pane-3" :style="eltabpaneHeight">
        <div class="in-el-tab-pane" :style="eltabpaneHeight1">
          <history />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery';
import NotLoginFork from './NotLoginFork';
import NotLoginPurchase from './NotLoginPurchase';
import Fork from './Fork';
import Management from './Management';
import Purchase from './Purchase';
import History from './History';
import { mapState } from 'vuex'
export default {
  components: {
    "not_login_fork": NotLoginFork,
    "not_login_purchase": NotLoginPurchase,
    "fork": Fork,
    "management": Management,
    "purchase": Purchase,
    "history": History
  },
  props: [
    'language',
    'artprice',
    'etzprice',
    'currentpatron',
    'timeHeld',
    "adBoardId",
    "parentBoardId",
    'depositable',
    'dueDate',
    'tips1'
  ],
  data() {
    return {
      contenttips:"",
      namecontentclassx1:{
        height:'',
      },
      namecontentclassx:{
        height:'',
      },
      tabBtn:{
        height:'',
      },
      tabBtn1:{
        height:'',
      },
      eltabpaneHeight:{
        height:'',         
      },
      eltabpaneHeight1:{
        height:'',         
      },
      isLogin:false,
      isOwner:false,
      adList: [],
      cover: '',
      text: ''      
    };
  },
  computed: {
    ...mapState({
      coinbase: state => state.web3.coinbase,
      owner: state => state.currentAdBoard.owner
    }),
  },
  watch: {
    coinbase (coinbase) {
      this.isLogin = (coinbase != null) ? true : false
      console.log('coinbase', coinbase)
      this.getTotalNumber()

    },
    owner (owner) {
      this.isOwner = (this.$store.state.web3.coinbase.toLowerCase() === owner.toLowerCase())
      // console.log('coinbase', this.$store.state.web3.coinbase)
      // console.log('owner', owner)
    },
    artName(newVal) {
      let val = JSON.parse(newVal)
      if (val.cover) this.cover = val.cover
      if (val.text) this.text = val.text
    }    
  },
  mounted() {
    $(".el-tabs__item:not(.el-tabs__item3)").click(
      function() {
        let tabindex = $(this).attr("tabindex");
        $(this).addClass("is-active").siblings().removeClass("is-active");
        $(".el-tab-pane").css("display", "none");
        $(".pane-" + tabindex).css("display", "block");
      }
    );

    let coinbase = this.$store.state.web3.coinbase;
    let owner = this.$store.state.currentAdBoard.owner;
    console.log('coinbase', coinbase)
    console.log('owner', owner)
    this.isLogin = (coinbase != null)
    this.isOwner = this.isLogin && (owner != null) && (coinbase.toLowerCase() === owner.toLowerCase())

    // setTimeout(() => {
    //   this.getTotalNumber()
    // }, 1000)

  },
  created(){
    this.getHeight();
    window.addEventListener('onload',this.getHeight);
    window.addEventListener('resize',this.getHeight);

  },
  destoryed(){
    window.addEventListener('onload',this.getHeight);
    window.addEventListener('resize',this.getHeight);
  },

  methods: {
    getHeight:function() {
      this.tabBtn.height=parseInt(window.innerWidth/12)+'px';
      this.tabBtn1.height=parseInt(window.innerWidth/12)+'px';
    },
    getAdBoardData: async function(total) {
      for (let i = 0; i < total; i++) {
        try {
          let res = await this.$root.getAdBoardDataId(i)
          console.log('res', res)
          // arr.push(res)
          this.adList.push(res)
        } catch (error) {
          console.log('getAdBoardDataId', error)
        }
      }
    },
    getTotalNumber: async function () {
      await this.$root.getTotalNumber().then(res => {
        // console.log('totalNumber', res)
        this.getAdBoardData(Number(res))
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/util.scss";
  @import "../../styles/app.scss";
  // .el-tabs__item1{
  //   /* background:url(../../assets/img/m7.jpg); */
  //   box-shadow: 0 0 30px rgba(65,109,206,.95);
  // }
  // .el-tabs__item2{
  //   /* background:url(../../assets/img/m4.jpg); */
  //   box-shadow: 0 0 30px rgba(209, 140,96, 0.95);
  // }
  // .el-tabs__item3{
  //   /* background:url(../../assets/img/m6.jpg); */
  //   box-shadow: 0 0 30px rgba(209, 140,96, 0.95);
  // }
  // .el-tabs__item4{
  //   /* background:url(../../assets/img/m8.jpg); */
  //   box-shadow: 0 0 30px rgba(65,109,206,.95);
  // }
.content-container{
  width: 96%;
}
.flex-container {
    width: 100%;
    margin:20px 0;
}

.flex-item {
  cursor: pointer;
    width:20%;
    float: left;
    text-align: center;
    padding: 20px 0;
    margin:10px 20px
}
.el-tabs__item{
      box-shadow: 0 0 10px rgba(0,0,0,.3)!important;
}
  .el-tabs__item.is-active,.el-tabs__item:hover{
    box-shadow: 0 0 10px rgba(65,109,206,.95)!important;
    font-weight: bold
  }
  .el-tabs__item.is-active span,.el-tabs__item:hover span{
    transform: translate(0,4px);
    -ms-transform: translate(0,4px); /* IE 9 */
    -webkit-transform: translate(0,4px); /* Safari and Chrome */
     font-weight: bold
  }
  .el-tab-pane{
    margin-bottom:100px;
  }
  .in-el-tab-pane{
    padding:10px 20px;
    line-height:24px;
  }
  .el-tabs__item{
  background: #fff
  }
  .el-tabs__item span{
  overflow: hidden;
  background: #fff
  }
  .el-tabs__item span p{
    overflow: hidden;
    text-align: center;
    font-size:1rem;
    margin-top:20px
  }
  #pane-0{
  /* background:url(../../assets/img/m5.jpg); */
  display:block
  }
  #pane-1{
    /* background:url(../../assets/img/m2.jpg); */
    display:none
  }
  #pane-2{
    /* background:url(../../assets/img/m3.jpg); */
    display:none
  }
  #pane-3{
    /* background:url(../../assets/img/m3.jpg); */
    display:none
  }
  .el-tabs__content div.el-tab-pane{
    overflow: hidden;
    text-align: left
    }
  .el-tabs__content div.el-tab-pane .in-el-tab-pane{
    background:rgba(255,255,255,.7);
    margin:20px;
    overflow: hidden;
    box-shadow:0 0 10px rgba(0,0,0,.7);
    background:#f6f6f6;
    font-size:14px
  }
  .titleclass{
    text-align:center;
  }
  .namecontentclass{
    font-size:2rem;
    background:#fff;
        align-items: center;
    flex-direction: row;
    display:flex;
}
.namecontentclassWrap1{
    padding:10px;
    box-shadow: 0 0 10px rgba(0,0,0,.7);
    /* background:url(../../assets/img/m1.jpg); */
    background-size:cover;
  }
  .namecontentclass p{
    text-align:center;
    margin: 0 auto;
  }
  .el-tabs__content{width:100%}
</style>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 32%;
  margin: 10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;
  transition: all .3s;
}
.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important;
}
.card:hover span {
  color: #000;
}
.card span {
  overflow: hidden;
  background: #fff;
  color: #333;
  font-size: 16px;
}
.card:nth-of-type(3n-1) {
  margin: 10px 2%;
}


</style>