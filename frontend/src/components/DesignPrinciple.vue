<template>
  <div class="content-container">
    <top-navigation ref="top-navigation" />
    <div class="boxsecond">
      <h2>背景简介</h2>
      <h2 class="showmore">
        哈勃格税<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>自19世纪起，世界上有许多社会主义经济学家就致力于解决“垄断”带来的社会资源分配不均的问题。许多当时显赫的经济学家，提出了各式各样的解决办法，包括“国有化（通过税收）”和“公有化背景下的拍卖”。然而许多这些学说都忽略了一个根本的问题：未来从资产中获得的投资激励。没有未来可期的投资回报，在资本主义市场的环境下，人们一开始为什么要购买该资产呢？</p>
        <p>到后来，政府有选择性地对一些资产进行特殊处理，如道路公有化、知识产权时限化，然后对大部分其他资产实行私有产权制度。这样的混合制，其目的是为了解决分配效率与投资效率之间矛盾的困境。</p>
        <p>然而即便如此，在这样的混合制里面，还是有一些不可调和的矛盾。比如在允许私有产权的资产类别里，有许多仍然存在严重的垄断问题，比如采矿权的交易、炙手可热的房地产长达数月的买卖谈判等。而另一方面，对于那些特殊类别的资产，分配的效率往往强烈依赖政府机构和法律强制获得，投资效率在这些资产里几乎没有体现，因而人们在其中的初始投资意愿是极其低下的。</p>
        <p>1965年，哈勃格提出了“第三条路”，也就是这里跟大家探讨的“哈勃格税”。在这个体系里，人们定期向政府汇报自行评估资产的价值，基于这些自评估值缴纳税赋，并被要求必须允许其他任何人以评估的价值将资产买走。在这里，和以往的机制最大的不同之处在于哈勃格税体系使用了“强行购买”的概念，人们不再是传统意义上资产的“所有者”，而更像是“租用者”。另一种解读的方式则是，哈勃格税创造了一种介于“私有制”和“公有制”之间的“部分共同所有制”。</p>
        <p>其核心的制衡因素在于：标价开高了，交税要交更多；开低了，别人可以轻易买走你的财产。这两点迫使每个理性人（假设你不想多交税，假设你不想被人轻易买走）趋向合理范围估价。</p>
        <p>美国的经济学家Glen Weyl和Eric Posner相信，纯粹的私有制经济强化投资效率而弱化分配效率，完全的强政府公有制经济则是截然相反的结果，而哈勃格税则是在两者之间求得两种效率之和最大化的方式。</p>
        <p>（参考文献：Property Is Only Another Name for Monopoly,Eric A. Posner, E. Glen Weyl. 2017）</p>
      </div>
      <h2 class="showmore">
        探索的问题<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>基于哈伯格税，我们想要探索一种新型的资产所有权模式，该模式将介于所有权和租赁使用权之间。具体来说：</p>
        <ul>
          <li>没有永恒的所有权，资产可以随时以当前所有者设定的价格易主</li>
          <li>所有者/租户自定义资产持有费用（租金）</li>
          <li>任何人都可以按这个租金价格抢走该所有/使用权，并重新定价</li>
        </ul>

        <p>纯粹的私有制经济强化投资效率而弱化分配效率，完全的强政府公有制经济则是截然相反的结果，而哈勃格税则是在两者之间求得两种效率之和最大化的方式。</p>
        <p>我们想要探索</p>
        <ul>
          <li>租金的真实含义是什么？</li>
          <li>所有权是否可以有新的定义？</li>
          <li>是否能够在新的场景下产生新的付费模式？</li>
        </ul>
      </div>
      <br>
      <h2>关于本实验的设计/玩法</h2>
      <h2 class="showmore">
        税收形式与定价<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>在我们实验的过程中,我们意识到在哈勃格税的框架下，税收形式和定价应当基于资产种类的不同而有所区分：投资性强弱、使用价值大小、交易频率高低，等等。广告牌不同于房产或艺术品，使用者更倾向于短时间占有或租用，而非长期占有。所以哈勃格税在这里应该理解为租金和使用费用。</p>
        <p>我们将广告牌的定价和费用设计为以30天为单位的形式，即，用户自行设定广告牌的30天价格，用户按照这个价格缴纳100%的月租金，其他人也可以随时按照这个价格把广告牌买走。</p>
        <p>下表的三个例子，分别是Radical Markets里使用的较为传统的房地产、南非艺术家Simon使用的数字艺术品，和我们的实验中使用的广告牌。拥有艺术品一段时间所给艺术家支付的税，可以理解为拍卖者对于艺术家的资助（patronage），但在拥有广告牌的期间随意更改上面的内容，则更明确体现了“一段时间使用权”的本质。</p>
        <table class="reference">
          <tbody>
            <tr>
              <th>属性</th>
              <th>广告牌</th>		
              <th>房产</th>
              <th>艺术品</th>
            </tr>
            <tr>
              <td>交易频率</td>
              <td>中到高</td>		
              <td>低</td>
              <td>低</td>
            </tr>
            <tr>
              <td>使用价值占比</td>		
              <td>高</td>		
              <td>中</td>		
              <td>低</td>
            </tr>
            <tr>
              <td>投资价值占比</td>
              <td>低</td>
              <td>中</td>		
              <td>高</td>
            </tr>
            <tr>
              <td>收税主体</td>
              <td>社区</td>
              <td>国家</td>		
              <td>艺术家</td>
            </tr>
            <tr>
              <td>稀缺性</td>
              <td>持有人赋予</td>
              <td>天然稀缺</td>		
              <td>制作人赋予</td>
            </tr>
          </tbody>
        </table>

        <p>那么，为什么我们认为哈勃格税不是单纯的租金，而是介于所有权和使用权之间的一种新型所有权模式呢？这里的关键点在于自主定价权。有了这个自主定价权，这个资产就是暂时属于你的。而由于广告牌既可以给广告主产生物质或精神方面的收益，又可以出售赚取差价，广告牌也被注入了资本品的概念。</p>
      </div>
      <h2 class="showmore">
        玩法<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>广告牌是一个独立的ERC721标准资产，在以太坊网络上确权。</p>
        <p>参与到这个实验里的玩家需要：</p>
        <ul>
          <li>根据上一任买主定义的价格（初始为0）拍下广告牌</li>
          <li>预存一定数量的以太坊作为抵扣哈勃格税金</li>
          <li>定义给下一任买主的标价</li>
          <li>在拥有广告牌期间随意更改上面文字广告的内容</li>
        </ul>
        <p>购买广告牌的过程中会产生两笔费用，第一笔是购买时支付给上一人拥有者的广告牌价格，第二笔则是在转移广告牌所有权（两种情形：1. 卖出手中广告牌2.取出预存款后可抵扣款项为0）时智能合约按持有广告牌时间扣除的税金。</p>
      </div>
      <h2 class="showmore">
        一键分叉<span>+</span>
      </h2>
      <div style="display:none" class="showmoreDiv">
        <p>由于广告牌的使用价值高而投资价值相对而言较低，因此我们在原项目This Artwork is Always on Sale的基础上，增加了“一键分叉”的功能。其目的是为了允许认为自身流量较大且不愿意为已有广告牌支付溢价（在这里，溢价可能代表的是广告牌的触达人数/流量，但这种情况并不是绝对）的个人/机构创造自己全新的广告牌资产，并依靠自己的社区管理广告牌的运营和一系列发展。</p>
        <p>同时，为了激励主动传播广告牌项目和哈勃格税理念的玩家，广告牌被分叉后，其拥有者将获得新分叉出来广告牌所缴纳税金的50%。另50%将用于广告牌项目的维护和发展。</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import TopNavigation from "./Sections/TopNavigation";
export default {
  name: "DesignPrinciple",
  components: {
    "top-navigation": TopNavigation
  },
  mounted:function(){
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

  table.reference{
      border-collapse: collapse;
      width: 100%;
      margin:15px auto;
  } 
  table.reference tr:nth-child(odd) {
      background-color: #f6f4f0;
  }
  table.reference th {
      color: #fff;
      background-color: #555;
      border: 1px solid #555;
      font-size: 14px;
      padding: 3px;
      vertical-align: top;
      text-align: left;
  }
  table.reference td {
      line-height: 2em;
      min-width: 24px;
      border: 1px solid #d4d4d4;
      padding: 5px;
      padding-top: 7px;
      padding-bottom: 7px;
      vertical-align: top;
      font-size:12px
  }
</style>
