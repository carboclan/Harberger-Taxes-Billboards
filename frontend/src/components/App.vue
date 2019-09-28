<template>
  <div id="app">
    <router-view
      :is-d-app-ready="isDAppReady"
      :current-view="currentView"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    isDAppReady: {
      type: Boolean,
      default: false
    },
    currentView: {
      type: Object,
      default: null
    }
  }
}

</script>

<style>
  html {
    background: #eef0ef;
  }

  body {
    margin: 0;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  textarea {
    resize: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    margin: auto;
  }
.boxsecond {
  clear: both;
  padding-top: 100px;
}
  .confirmbuttonclass{
    width:30%;
    height:40px;
    border:0;
    border-radius:6px;
    background-color:#f5f2f2;
    font-size:14px;
    margin:30px auto 20px;
        color: #333;
    box-shadow: 0 0.2px 2px 0 rgba(0,0,0,0.2), 0 3px 5px 0 rgba(0,0,0,0.19);
        display: block

  }
.confirmbuttonclass:hover,.confirmbuttonclass:active{
  box-shadow:0 0 10px rgba(65, 109, 206, 0.95) !important
}
@media screen and (min-width:981px) {
.boxsecond {
  width: 60%;
  max-width: 1400px;
  margin:100px auto
}
}
@media screen and (max-width:980px) {
.boxsecond{
    width:90%;
    min-width:320px;
    margin-left:auto;
    margin-right:auto;
  }
ul.topMenu li a{
  padding-left:0!important;
  padding-right:0!important
}
.autoplayclass{
  margin:10px 5px 0 0!important
}
.flex-item{
    width:40%!important;
    margin-bottom:10px!important;
    margin-right:0!important
}
.flex-item:nth-child(odd){
  margin-left:7%!important
}
.flex-item:nth-child(even){
  margin-left:4%!important
}
.content-container{
  width:100%;
  }
}
</style>
