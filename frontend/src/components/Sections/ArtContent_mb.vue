<template>
  <div>
    <div class="content-container  text-left">
      <!-- <h2 class="titleclass">{{artTitle}}登录MetaMesk后PC</h2> -->
      <div class="namecontentclassWrap1" :style="namecontentclassx1">
        <div class="namecontentclass" :style="namecontentclassx">
          <img v-if="cover" :src="cover" alt="cover">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
    <tabcontrol
      :language="language"
      :artprice="artprice"
      :etzprice="etzprice"
      :currentpatron="currentpatron"
      :time-held="timeHeld"
      :ad-board-id="adBoardId"
      :parent-board-id="parentBoardId"
      :depositable="depositable"
      :due-date="dueDate"
      :total-collected="totalCollected"
      :art-title="artTitle"
      :art-name="artName"
      :tips1="tips1"
    />
  </div>
</template>

<script>
import TabControl from './TabControl'

export default {
  name: 'ArtContent',
  components: {
    "tabcontrol": TabControl
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
    'totalCollected',
    'artName',
    'artTitle',
    'tips1'
  ],
  data(){
    return {
      history: [],
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
      cover: '',
      text: ''
    }
  },
  watch: {
    artName(newVal) {
      let val = JSON.parse(newVal)
      if (val.cover) this.cover = val.cover
      if (val.text) this.text = val.text
    }
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
      this.namecontentclassx1.height =parseInt(window.innerWidth/2)+'px';
      this.namecontentclassx.height =parseInt(window.innerWidth/2)+'px';
    }
  }
};
</script>

<style lang="scss" scoped>
  .titleclass{
    text-align:center;
  }
   .namecontentclass{
    font-size:50px;
    background:#fff;
        align-items: center;
    flex-direction: row;
    display:flex;
    position: relative;
}

.namecontentclass img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.namecontentclass p {
  z-index: 9;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
}
.namecontentclassWrap1{
    box-shadow: 0 0 10px rgba(0,0,0,.7);
    // background:url(../../assets/img/m1.jpg);
    background-size:cover;
  }
  .namecontentclass p{
    text-align:center;
    margin: 0 auto;
  }
  .contenttipsclass{
    text-align: right;
    width: 100%;
    color:#fff;
  }
    .el-tabs__item {
    width:40%;
    float:left;
    margin:10px 5%;
    cursor: pointer;
    background-size:cover;
    padding:0;
  }
  .el-tabs__item.is-active span,.el-tabs__item:hover span{
    transform: translate(0,4px);
    -ms-transform: translate(0,4px); /* IE 9 */
    -webkit-transform: translate(0,4px); /* Safari and Chrome */
  }
</style>