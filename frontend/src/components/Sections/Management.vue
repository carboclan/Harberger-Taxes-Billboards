<template>
  <div>
    <h2>{{ tips1 }}：</h2>
    <div class="firstclass funbtnclass">
      <ul class="ulinputclass">
        <li class="liinputclass">
          ETH&nbsp;<input ref="newprice" type="number" placeholder="输入新价格">
        </li>
        <li class="inputsecondli">
          <button class="confirmbuttonclass" @click="changePrice">
            修改价格
          </button>
        </li>
      </ul>
    </div>

    <div class="firstclass funbtnclass">
      <ul class="ulinputclass">
        <li class="liinputclass">
          ETH&nbsp;<input ref="depositbal" type="number" placeholder="输入充值金额">
        </li>
        <li class="inputsecondli">
          <button class="confirmbuttonclass" @click="depositWei">
            充值预存款
          </button>
        </li>
      </ul>
    </div>
    <div class="firstclass funbtnclass">
      <ul class="ulinputclass">
        <li class="liinputclass">
          ETH&nbsp;<input ref="withdrawDeposit" type="number" placeholder="输入取出金额">
        </li>
        <li class="inputsecondli">
          <button class="confirmbuttonclass" @click="withdrawDeposit">
            取出预存款
          </button>
        </li>
      </ul>
    </div>
    <div class="firstclass funbtnclass">
      <textarea ref="newContent" placeholder="插入新广告内容： （本广告牌字数限制：24个中文字符/48个字符）" class="initNameclass" />
      <span class="contenttipsclass">{{ contenttips }}</span><br>
      <p>
        <button class="confirmbuttonclass confirmname" @click="changeContent">
          确认修改名称
        </button>
      </p>
      <div>
        <textarea ref="newContentImg" placeholder="插入新广告图片： （包含http(s)://）" class="initNameclass" />
        <span class="contenttipsclass">{{ contenttips }}</span><br>
        <p>
          <button class="confirmbuttonclass confirmname" @click="changeContentImg">
            确认修改图片
          </button>
        </p>
      </div>
      <div>
        <!-- <p>
          <button class="confirmbuttonclass  confirmname" @click="withdrawAllDeposit">
            取出所有预存款
          </button>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tips1'
  ],
  data() {
    return {
      contenttips:"",
      isLogin:false
    };
  },
  mounted() {
    this.isLogin = this.$store.state.web3.coinbase != null ? true : false
  },
  methods: {
    changePrice: function() {
      let priceToChange = this.$refs.newprice.value;

      const data = Object.assign({}, { priceToChange })
      this.$root.changePrice(data)
    },
    changeContent:function(){
      let contentToChange = this.$refs.newContent.value;
      if(contentToChange.length > 24){
        this.contenttips="内容长度不超过24个汉字或48个字符"
        return;
      }

      const data = Object.assign({}, { contentToChange })
      this.$root.changeContent(data)
    },
    changeContentImg:function(){
      let contentToChange = this.$refs.newContentImg.value;
      if(contentToChange.length > 24){
        this.contenttips="内容长度不超过24个汉字或48个字符"
        return;
      }

      const data = Object.assign({}, { contentToChange })
      this.$root.changeContent(data)
    },
    depositWei: function() {
      let depositToAdd = this.$refs.depositbal.value;

      const data = Object.assign({}, { depositToAdd })
      this.$root.addDeposit(data)
    },
    withdrawDeposit: function() {
      
      let amountToWithdraw = this.$refs.withdrawDeposit.value;

      const data = Object.assign({}, { amountToWithdraw })
      this.$root.withdrawDeposit(data)
    },
    withdrawAllDeposit: function() {
      console.log('ArtContent2_holder_mb.vue withdrawAllDeposit 111')
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/util.scss";
  @import "../../styles/app.scss";
  .el-tabs__content div.el-tab-pane .in-el-tab-pane{
    background: #d1bbbb;
    word-break: break-all
    }
  .funbtnclass{
    margin-top:28px;
  }
  .buyclass span{
    display:inline-block;
    width:20%;
    text-align:center;
    margin-top:10px;
    height:35px;
  }
  .ulinputclass{
    list-style: none;
    padding: 0;
    margin:10px 0;
    overflow:hidden
  }
  .ulinputclass li{
    float:left;
    width:45%;
  }
  .ulinputclass li.inputsecondli{
    width:20%;
    margin-left:3%;
    min-width:100px
  }
    .ulinputclass .confirmbuttonclass{
        display:inline-block;
        width: 100%;
        margin:2px 0;
        height: 24px
        }
  .ulinputclass .liinputclass{
    border-bottom: 1px solid #9c9797;
  }
  .ulinputclass .liinputclass input{
    background: transparent;
    border:none;

  }
  .liinputclass{
    font-size: 16px;
    color: #777171;
  }
  textarea{
    width: 90%;
    margin-top: 15px;
    padding: 10px 15px;
}
  .contenttipsclass{
    text-align: right;
    width: 100%;
    color:#fff;
  }
  .funbtnclass{
    margin-top:28px;
  }
  .confirmname{
    width: 40%;
  }
</style>
