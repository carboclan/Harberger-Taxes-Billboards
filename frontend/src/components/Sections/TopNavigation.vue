<template>
  <ul class="topMenu">
    <li>
      <div class="autoplayclass">
        <img v-show="isa" src="../../assets/player/play.png" width="30px" @click="isPlay">
        <img v-show="isb" src="../../assets/player/pause.png" width="30px" @click="isStop">
        <audio id="audio" ref="audio" src="../../../static/music.mp3" preload loop autoplay="true" />
      </div>
    </li>
    <li>
      <a target="_blank" href="#">中</a>/
      <a target="_blank" href="#">EN</a>
    </li>
    <li>
      <router-link to="/about">
        关于我们
      </router-link>
    </li>
    <li>
      <router-link to="/design">
        实验设计
      </router-link>
    </li>
    <li>
      <router-link to="/how_to_play">
        玩法说明
      </router-link>
    </li>
    <li>
      <router-link to="/">
        首页
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      isa: false,
      isb: true,
    };
  },
  methods: {
    isPlay() {
      document.getElementById("audio").play();
      this.isa = false;
      this.isb = true;
      return false;
    },
    isStop() {
      document.getElementById("audio").pause();
      this.isb = false;
      this.isa = true;
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/util.scss";
@import "../../styles/app.scss";
ul.topMenu {
  list-style: none;
  float: right;
  position: fixed;
  top: 0;
  right: 0px;
  z-index: 99;
  left: 0;
  display: block;
  background: rgba(255, 255, 255, 0.7);
  margin: 0;
}
ul.topMenu li {
  float: right;
  margin-right: 10px;
}
ul.topMenu li a {
  display: inline-block;
  color: #333;
  text-align: center;
  padding: 15px 10px;
  border-radius: 3px;
}
.autoplayclass {
  margin: 15px 30px 0 0;
}
</style>
