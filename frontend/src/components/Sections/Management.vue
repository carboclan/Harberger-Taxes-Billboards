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
      <!-- <textarea ref="newContent" v-model="content" placeholder="插入新广告内容： （本广告牌字数限制：24个中文字符/48个字符）" class="initNameclass" /> -->
      <span class="contenttipsclass">{{ contenttips }}</span><br>
      <!-- <p>
        <button class="confirmbuttonclass confirmname" @click="changeContent">
          确认修改名称
        </button>
      </p> -->
      <div class="billboard-slide">
        <div class="billboard-container">
          <p class="billboard-title">
            上传广告图片
          </p>
          <div class="billboard-img">
            <input ref="file" type="file" accept="image/png, image/jpeg, image/jpg, image/gif, image/webp" @change="upload">
            <img v-if="!cover" id="billboardAdd" class="add" src="@/assets/upload/add.png" alt="add" @click="uploadAdd">
            <img v-if="cover" id="billboardCover" class="cover" :src="cover" alt="cover">
            <div v-if="cover" id="billboardDel" class="full" @click="cover = ''">
              <img class="del" src="@/assets/upload/del.png" alt="del">
            </div>
            <div v-if="loading" id="billboardLoading" class="full-loading">
              上传中...
            </div>
          </div>
          <p class="des">
            *请上传2/1尺寸的图片
          </p>
          <input
            id="billboardInput"
            v-model="cover"
            type="text"
            class="billboard-input"
            placeholder="输入图片的链接地址（包含http(s)://）"
          >
          <input
            id="billboardInputContent"
            v-model="content"
            type="text"
            class="billboard-input"
            placeholder="插入新广告内容： （本广告牌字数限制：24个中文字符/48个字符）"
          >
          <a id="definedButton" href="javascript:void(0);" class="button defined-btn" @click="changeContentImg">确定</a>
        </div>
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
import axios from "axios";

export default {
  props: [
    'tips1'
  ],
  data() {
    return {
      contenttips:"",
      content: '',
      isLogin:false,
      cover: '',
      loading: false,
      file: '',
    };
  },
  mounted() {
    this.isLogin = this.$store.state.web3.coinbase != null ? true : false
  },
  methods: {

    uploadToSmDotMs(imgFile)  {
      let formData = new FormData();
      formData.append("smfile", imgFile);
      return axios({
        url: "https://sm.ms/api/upload",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
    },
    uploadAdd() {
      let fileDom = this.$refs.file
      fileDom.click()
    },
    async upload(e) {
      this.file = e.target.files[0];
      this.uploadBtn()
    },
    async uploadBtn() {
      this.loading = true
      let fileDom = this.$refs.file
      fileDom.setAttribute("type", "text");
      await this.uploadToSmDotMs(this.file)
        .then(res => {
          if (res.status === 200 && res.data.code === "success") {
            // console.log(res.data.data.url)
            this.cover = res.data.data.url;
          } else alert("上传图片失败");
        })
        .catch(e => {
          console.log(e);
          alert("上传图片失败");
        }).finally(() => {
          this.loading = false
          fileDom.setAttribute("type", "file");
        })
    },
    changePrice: function() {
      let priceToChange = this.$refs.newprice.value;

      const data = Object.assign({}, { priceToChange })
      this.$root.changePrice(data)
    },
    // changeContent:function(){
    //   let contentToChange = this.content
    //   if(contentToChange.length > 24){
    //     this.contenttips="内容长度不超过24个汉字或48个字符"
    //     return;
    //   }

    //   let contentData = {
    //     text: contentToChange,
    //     cover: this.cover,
    //   }
    //   let contentDataJson = JSON.stringify(contentData)

    //   const data = Object.assign({}, { contentToChange: contentDataJson })
    //   this.$root.changeContent(data)
    // },
    changeContentImg:function(){
      if(!this.cover.length){
        return alert('图片地址不能为空')
      }

      if(!this.content.length) {
        return alert("内容不能为空")
      }

      if(this.content.length > 24){
        return alert("内容长度不超过24个汉字或48个字符")
      }

      let contentData = {
        text: this.content,
        cover: this.cover,
      }
      let contentDataJson = JSON.stringify(contentData)

      const data = Object.assign({}, { contentToChange: contentDataJson })
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


<style scoped>
.billboard-container {
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  padding: 20px;
}

.billboard-title {
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  padding: 0;
  margin: 0;
  font-family: var(--font-family);
  line-height: 1.5;
}
.billboard-img {
  width: 100%;
  margin: 10px 0 0 0;
  height: 340px;
  border-radius: 6px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  background: rgba(241, 241, 241, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.billboard-img input[type="file"],
.billboard-img input[type="text"] {
  background: rgba(255, 255, 255, 0);
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
.billboard-img .add,
.billboard-img .del {
  width: 30px;
}
.billboard-img .cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.billboard-img .full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s;
}
.billboard-img .full:hover {
  opacity: 1;
}
.billboard-img .full-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s;
  color: #fff;
}

.billboard-container .des {
  font-size: 12px;
  font-weight: 400;
  color: #b2b2b2;
  padding: 0;
  margin: 6px 0 16px 0;
  text-align: left;
  font-family: var(--font-family);
  line-height: 1.5;
}

.billboard-input {
  height: 35px;
  background: rgba(241, 241, 241, 1);
  border-radius: 6px;
  box-sizing: border-box;
  border: none;
  width: 100%;
  outline: none;
  padding: 10px;
  color: #333;
  line-height: 1.5;
  font-size: 12px;
  font-family: var(--font-family);
}
.billboard-input::placeholder {
  color: rgba(178, 178, 178, 1);
}
.billboard-input:nth-of-type(2) {
  margin-top: 10px;
}
.billboard-container .button {
  display: inline-block;
  width: 100%;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 1px;
  line-height: 1;
  font-size: 12px;
  text-align: center;
}
.billboard-container .button.defined-btn {
  background: #1c9cfe;
  margin-top: 10px;
}

.billboard-button {
  position: absolute;
  left: -60px;
  top: 0;
  width: 130px;
  display: flex;
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 0 0 0 4px;
  cursor: pointer;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.billboard-button img {
  width: 30px;
  height: 30px;
}

</style>
