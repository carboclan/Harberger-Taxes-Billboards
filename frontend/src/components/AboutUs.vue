<template>
  <div class="content-container">
    <top-navigation ref="top-navigation" />
    <div class="boxsecond">
      Comming soon...
    </div>
      <button class="confirmbuttonclass buyclassbtn" @click="withdraw">
        withdraw
      </button>    
  </div>
</template>

<script>
import $ from "jquery";
import TopNavigation from "./Sections/TopNavigation";
export default {
  name: "HowToPlay",
  components: {
    "top-navigation": TopNavigation
  },
  mounted:function() {
    $(".showmore").click(function(){
      if(!$(this).next("div").is(':visible')){
        $(this).next("div").slideDown();
        $(this).find("span").html("-");
      }else{
        $(this).next("div").slideUp();
        $(this).find("span").html("+");
      }
    });
  },
  methods: {
    withdraw() {
      const data = Object.assign({}, { })
      this.$root.withdrawTaxIncome(data)
    },
  }  
}
</script>

<style lang="scss" scoped>
@import "../styles/util.scss";
@import "../styles/app.scss";
.showmore{
  border-bottom:1px dotted #dedede;font-size:16px;display:block;
  padding:10px;
  margin:10px 0
}
.showmore span{float:right}
p:first-line{
}
.showmoreDiv{
   padding:10px;
  margin:10px 0;
  font-size:14px;
  line-height: 28px
}
.showmoreDiv strong{display:block}
</style>
