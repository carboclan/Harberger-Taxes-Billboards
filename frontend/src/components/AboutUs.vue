<template>
  <div class="content-container">
    <top-navigation ref="top-navigation" />
    <div class="boxsecond">
      <h2>关于我们</h2>
      <!-- <h2 class="showmore">
        如何获得一块广告牌？<span>+</span>
      </h2> -->
      <div class="showmoreDiv">
        <p>
          本实验由BES (<a href="https://beslab.xyz/" target="_blank"> beslab.xyz </a>) 区块链实验室和DOGI区块链游戏媒体 (<a href="https://www.dogigames.com" target="_blank"> DOGIgames.com </a>) 共同发起。<br>
          本实验本着去中心化协作和自治的理念，全程开源，欢迎各路英雄一起来玩。<br>
          加微信号xiaopangljl进群讨论。<br>
          详情参见GitHub：<a href="https://github.com/BlockchainEconomicsStudio/AdvertisementBoard" target="_blank">点击这里</a>
        </p>

        <p>
          Blockchain Economics Studio（BES）是一个专注于发现和构建区块链科技未来经济的工作室。我们同创业者、开发者、投资人一起合作从零开始孵化产品或服务。目前项目包括虚拟货币资产管理平台、虚拟机构交易终端、非可替代性资产、PoC 共识协议以及区块链应用程序等。我们的研究重点主要在区块链世界的新经济模型。我们相信区块链会成为数字时代，人与机器新型合作的支柱产业，我们也希望能够连结人们及他们的创意来实现这一目标。
          DOGIgames是一家专注区块链游戏的媒体。我们认为区块链将对游戏带来深远的变革。虽然我们无法预测这种变革发生的具体时间，但我们相信他必将发生。DOGIgames愿意发掘并传播全球区块链游戏从业者在推动变革的洞见、创新、探索、成功和以及失败。DOGIgames也致力将中国区块链游戏行业的进展传播到全球各个角落。
          本项目早期贡献者包括：
        </p>
        <ul>
          <li>
            Jade - 连续创业者，建立 BES 的目的是连接区块链技术与现实价值。坚信问题比答案更重要，希望以独立开源组织的形式推动自己关心问题的解决。热爱哲学，统计学，神经科学，人工智能，长年瑜伽及冥想。(<a href="https://github.com/yujadehou" target="_blank"> https://github.com/yujadehou </a>)
          </li>
          <li>
            Mable - 毕业于哥伦比亚大学，获艺术史与统计学士学位，相信美是统一技术与艺术的矢量。传统金融与互联网战略出身，现任一家早期风投任合伙人。热爱通过独立采访者的方式让社会接触到多样的思考，致力于探索生活、艺术与哲学的有机结合形式。(<a href="https://github.com/mablejiang" target="_blank"> https://github.com/mablejiang </a>)
          </li>
          <li>
            小胖 - 前 Apple Store 员工，因偶遇比特币而经历了更加丰厚的生命，认同疯狂区块链世界里理性认知的力量，坚信区块链将带来更好的世界，也坚信 BES 会成为更好世界的一部分。(<a href="https://github.com/littlefat-liujingli" target="_blank"> https://github.com/littlefat-liujingli </a>)
          </li>
          <li>Nick – 区块链游戏生态建设者。投机于股市和币圈，专注中短线趋势操作。多国注册会计师，擅长泡沫中洞察真相。对电子游戏和有趣的灵魂没不了抵抗力。(<a href="https://github.com/Wu-Nick" target="_blank"> https://github.com/Wu-Nick </a>)</li>
          <li>Liu Ya – AjoyLab 区块链游戏制作人。作为创业者开发的游戏曾进入苹果畅销榜Top 20， 产品累计超过1,000 万的下载量。曾在诺基亚担任高级软件工程师， 拥有丰富的从系统底层到应用层的开发经验。(<a href="https://github.com/liuya-dogi" target="_blank"> https://github.com/liuya-dogi </a>)</li>
          <li>Mino - DApp 产品经理。探索区块链技术与现实之间的结合的场景，相信去中心化的应用将进一步改变人们的生活方式和生产关系。世界乱糟糟，待我去改造。(<a href="https://github.com/Minoyoo" target="_blank"> https://github.com/Minoyoo </a>)</li>
          <li>垚垚-需要灵感创作的前端工程师。985学校毕业，一直在金融和游戏领域的较为知名的公司从事前端工作，对前端效果精益求精，对新兴事物充满好奇和探索。(<a href="https://github.com/xuefengyixin" target="_blank"> https://github.com/xuefengyixin </a>)</li>
        </ul>

        <p>相关报道请参见：</p>
        <p>
          Mable 2019 &lt;一块广告牌——二十一世纪的共享广播站？&gt;, (<a href="https://mp.weixin.qq.com/s/NCjncWZAMEn-lljXKRMM6w" target="_blank"> https://mp.weixin.qq.com/s/NCjncWZAMEn-lljXKRMM6w </a>)<br>
          Nick 2019  &lt;用哈伯格税卖广告，我们迈出了网站token化的第一步&gt;,(<a href="https://www.dogigames.com/cn/insight-cn/2019/06/27/10003.html" target="_blank"> https://www.dogigames.com/cn/insight-cn/2019/06/27/10003.html </a>)<br>
          Simon的Medium：(<a href="https://medium.com/@simondlr/this-artwork-is-always-on-sale-92a7d0c67f43" target="_blank"> https://medium.com/@simondlr/this-artwork-is-always-on-sale-92a7d0c67f43 </a>)<br>
          Vitalik Buterin 关于Radical Markets 和Harberger taxes 的介绍： Vitalik  2018, ‘On Radical Markets’  Vitalik Buterin's website, (<a href="https://vitalik.ca/general/2018/04/20/radical_markets.html" target="_blank"> https://vitalik.ca/general/2018/04/20/radical_markets.html </a>)
        </p>
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
