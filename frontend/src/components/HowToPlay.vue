<template>
  <div class="content-container">
    <top-navigation ref="top-navigation" />
    <div class="boxsecond">
      <h2>这是一块永远在出售、永远可以更新的广告牌。</h2>
      <h2 class="showmore">
        如何获得一块广告牌？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>您可以选择通过花费一定以太坊来购买一块已经存在的广告牌；</p>
        <p>也可以通过分叉功能免费获得一块新的广告牌</p>
      </div>
      <h2 class="showmore">
        获得广告牌后能做什么？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>创作一个随时在售的广告牌。</p>
        <p>拥有一块广告牌后您可以自行定制：</p>
        <ul>
          <li>广告牌的内容</li>
          <li>广告牌价格和月租金（价格=月租金）</li>
          <li>广告牌内容将存于以太坊区块链上，一经录入，任何人无法更改历史记录。</li>
          <li>广告牌价格是给下一任广告主从你手上购买广告牌的价格。任何人可以在任何时候从现任广告主手中用该价格购买下一任所有权。</li>
        </ul>

        <p>同时，您可以通过两种方式获得经济利益：</p>
        <ul>
          <li>让您的广告牌变得有趣或有价值，并以高价售出</li>
          <li>引导其他人来分叉您的广告牌，并获得他的租金分成</li>
        </ul>
      </div>
      <h2 class="showmore">
        租金是多少？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>月租金是等同于广告牌的出售价格。</p>
      </div>
      <h2 class="showmore">
        租金如何收取？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>当现任广告主持有广告牌时，需要按照当前价格支付月租金。</p>
        <p>您可以将广告牌的价格设定为零。</p>
        <p>如此，则无需支付任何租金，亦无需存入任何预存款。但这也意味着任何人都可以在不需经过您同意的情况下，免费购得该广告牌。</p>
        <p>您也可以将广告牌的价格设定高于零。</p>
        <p>如此，则需要存入一定的预存款用以缴纳租金。未来，您需要按照您自己设定的价格支付每月的租金。如果有人购买您的广告牌，他将支付您自行设定的价格。</p>
        <p>广告牌的内容和价格可以随时更改，预存款也可以随时存入或取出。创建广告牌后，您可以在登录以太坊钱包后，通过“管理我的广告牌”进行更改。</p>
        <p>广告牌的租金是“后收费模式”，即在获得广告牌时并不需要支付任何租金，只有在您广告牌进行出售或者更改价格时，租金才将根据您所持有的时间被计算并从您的预存款中扣除。</p>
        <p>另外，如果您存入的预存款余额不足以支付未来的租金，也将立即结算。结算后，该广告牌的价格将重归为零。</p>
      </div>
      <h2 class="showmore">
        收取的租金用于何处？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>系统收取的租金将有50%用于项目的运营和维护，另50%将归属此广告牌的被分叉对象，用于奖励该广告主的创意和对广告牌推广。</p>
      </div>
      <h2 class="showmore">
        租为了参与此实验，我需要什么？<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <strong>1、支持Web 3 的以太坊数字钱包</strong>
        <ul>
          <li>
            PC端<br>
            <a href="https://metamask.io/" target="_blank">Metamask</a>、Dapper等钱包浏览器插件，需预先安装Chrome 或者 Firefox（火狐） 浏览器
          </li>
          <li>
            手机端<br>
            使用以太坊数字钱包，如Trustwallet、Cobo、Dapper、BUNToy等
          </li>
        </ul>

        <strong>2、以太币（ETH）</strong>
        <ul>
          <li>以太币是类似比特币的一种数字货币，用于在以太坊区块链网络上交易、支付、执行程序命令等行为</li>
          <li>您可以在各大数字货币交易所从其他用户手中购买以太币</li>
          <li>购得以太币后，您需要将所需以太币存入您的以太坊数字钱包。</li>
        </ul>
      </div>
    </div>
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
.showmoreDiv{
   padding:10px;
  margin:10px 0;
  font-size:14px
}
.showmoreDiv strong{display:block}
</style>
