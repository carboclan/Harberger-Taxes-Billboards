<template>
  <div>
    <p><strong>购买广告牌</strong></p>
    <p><strong>您需要支付<span>{{ artprice }} ETH</span>&nbsp;&nbsp;<span>(¥ {{ etzprice }})</span></strong></p>
    <p class="firstclass buyclass">
      <ul class="ulinputclass">
        <li style="width:100px;text-align:right">
          价格：
        </li>
        <li class="liinputclass">
          ETH&nbsp;<input ref="initprice" type="number" placeholder="自定义价格">
        </li>
      </ul>
      <ul class="ulinputclass">
        <li style="width:100px;text-align:right">
          储备金金额：
        </li>
        <li class="liinputclass">
          ETH&nbsp;<input ref="initdeposit" type="number" placeholder="输入预存款">
        </li>
      </ul>
    </p>
    <div class="firstclass buyclass">
      <textarea ref="initname" placeholder="插入新广告内容： （本广告牌字数限制：24个中文字符/48个字符）" class="initNameclass" cols="160" rows="2" />
      <div class="contenttipsclass">
        {{ contenttips }}
      </div>
    </div>
    <div>
      <p>您可以购买这个广告牌，购买后您可以自行定制：</p>
      <ul>
        <li>广告牌的内容</li>
        <li>广告牌价格和月租金（价格=月租金）</li>
      </ul>
    </div>
    <div>
      <p>您可以通过两种方式获得经济利益</p>
      <ul>
        <li>让您的广告牌变得有趣或者有价值，并以高价出售</li>
        <li>引导其他人来分叉您的广告牌，并获得他的租金成分</li>
      </ul>
      <p>
        您可以将广告牌的价格设定为零。<br><br>
        如此，则无需支付任何租金，亦无需存入人呢和存款。但这也意味着任何人都可以在不需经过您的同意的情况下，免费购得该广告牌。<br><br>
        您也可以将广告牌的价格设定高于零。<br><br>
        如此，则需要存入一定的预存款用以缴纳租金。未来，您需要按照您自己设定的价格支付每月的租金。如果有人购买您的广告牌，他将支付您自行设定的价格。<br><br>
        广告牌的内容和价格可以随时更改，预存款也可以随时存入或者去除。创建广告牌后，您可以再登录以太坊钱包后，通过“管理我的广告牌”进行更改。<br><br>
        广告牌的租金在该广告牌被其他人购买后进行结算<br><br>
        另外，如果您存入的预存款余额不足以支付未来的租金，也将立即结算。结算后，该广告牌的价格将重归于零，而广告牌的所有权将被系统收回。系统收取的租金将有50%用于项目的运营和维护，另50%将归属次广告牌的被购买对象，用于奖励该广告主的创意和对广告牌推广。
      </p>
    </div>
    <p>
      <button class="confirmbuttonclass buyclassbtn" @click="buy">
        购买
      </button>
      <tips />
    </p>
  </div>
</template>

<script>
import Tips from './Tips';
export default {
  components: {
    "tips": Tips
  },
  props: [
    'language',
    'artprice',
    'etzprice'
  ],
  data() {
    return {
      contenttips:"",
    };
  },
  methods: {
    buy: function() {
      const initName = this.$refs.initname.value
      function strlen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {

          var a = str.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
          } else {
            len += 1;
          }
        }
        return len;
      }
      if (strlen(initName)>48) {
        this.contenttips = '内容长度不超过24个汉字或48个英文字符,现在长度是'+strlen(initName);
        return;
      }

      const initPrice = this.$refs.initprice.value
      const initDeposit = this.$refs.initdeposit.value
      const artPrice = this.artprice

      const data = Object.assign({}, { initPrice, initDeposit, artPrice, initName })
      this.$root.buyAdBoard(data)
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../styles/util.scss";
  @import "../../styles/app.scss";
  .buyclass span{
    display:inline-block;
    width:20%;
    text-align:center;
    margin-top:10px;
    height:35px;
  }
  input{
    height:25px;
    width:65%;
    border:0;
    text-align:left;
    font-size:14px;
    outline:medium;
  }
  .buyclass{
    margin:10px 0
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
    width:15%;
    margin-left:3%
  }
  .ulinputclass .liinputclass{
    border-bottom: 1px solid #9c9797;
  }
  .ulinputclass .liinputclass input{
    background: transparent
  }
  .liinputclass{
    font-size: 16px;
    color: #777171;
  }
  .contenttipsclass{
    text-align: right;
    width: 100%;
    color:#fff;
  }
  .initNameclass{
    width:90%;
   margin-top:15px;
   padding:10px 15px
  }
</style>
