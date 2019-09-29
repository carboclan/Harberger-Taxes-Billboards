<template>
  <div>
    <div class="content-container  text-left">
      <!-- <h2 class="titleclass">{{artTitle}}登录MetaMesk后PC</h2> -->
      <div class="namecontentclassWrap1" :style="namecontentclassx1">
        <div class="namecontentclass" :style="namecontentclassx">
          <img v-if="cover" :src="cover" alt="cover">
          <p v-if="text">
            {{ text }}
          </p>
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
  computed: {
  
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
      this.namecontentclassx1.height =parseInt(window.innerWidth/3)+'px';
      this.namecontentclassx.height =parseInt(window.innerWidth/3)+'px';
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
  // width: 90%;

  line-height: 1.5;
  font-size: 30px;
  font-weight: bold;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 100px;
  padding: 6px 34px;
  text-decoration: none;
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
    width:20%;
    float:left;
    margin:10px 2%;
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

<style>

:root {
  --font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Nimbus Sans L",
    Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  --neon-text-color: #f40;
  --neon-border-color: #08f;
}
  .namecontentclass p {
  animation: flicker 1.5s infinite alternate;
}
.ss .img-full .buy-button {
  animation: flicker-small 1.5s infinite alternate;
}
  .namecontentclass p::-moz-selection,
.ss .img-full .buy-button::-moz-selection {
  background-color: var(--neon-border-color);
  color: var(--neon-text-color);
}

  .namecontentclass p::selection,
.ss .img-full .buy-button::selection {
  background-color: var(--neon-border-color);
  color: var(--neon-text-color);
}

/* Animate neon flicker */
@keyframes flicker {
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
      0 0 2rem var(--neon-text-color), 0 0 4rem var(--neon-text-color),
      0 0 6rem var(--neon-text-color), 0 0 8rem var(--neon-text-color),
      0 0 10rem var(--neon-text-color);

    box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
      0 0 2rem var(--neon-border-color), inset 0 0 2rem var(--neon-border-color),
      0 0 4rem var(--neon-border-color), inset 0 0 4rem var(--neon-border-color);
  }

  20%,
  24%,
  55% {
    text-shadow: none;
    box-shadow: none;
  }
}

@keyframes flicker-small {
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.1rem -0.1rem 0.5rem #fff, 0.1rem 0.1rem 0.5rem #fff,
      0 0 1rem var(--neon-text-color), 0 0 2rem var(--neon-text-color),
      0 0 3rem var(--neon-text-color), 0 0 4rem var(--neon-text-color),
      0 0 5rem var(--neon-text-color);

    box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
      0 0 1rem var(--neon-border-color), inset 0 0 1rem var(--neon-border-color),
      0 0 2rem var(--neon-border-color), inset 0 0 2rem var(--neon-border-color);
  }

  20%,
  24%,
  55% {
    text-shadow: none;
    box-shadow: none;
  }
}

</style>