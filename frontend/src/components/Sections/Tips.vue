<template>
  <div v-show="isshowtips" class="pledgetipsclass" :class="{'classa':isa,'classb':isb}">
    {{ tiptext }}
  </div>
</template>

<script>
export default {
  name: 'MainScreen',
  components:{
  },
  data () {
    return {
      isshowtips:false,
      tiptext:"error",
      isa:true,
      isb:false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init:function(){
      this.$trans.$off('tiptext')
      this.$trans.$on("tiptext",(data)=>{  
        this.isshowtips=true		
        if(data.type==2){
          this.isb=true;
          this.isa=false
        }else if(data.type==3){
          this.isa=true
          this.isb=false
        }
        this.tiptext=data.tiptext
        setTimeout(this.showtips,5000)
      })
    },
    showtips:function(){
      this.isshowtips=false
    }
  }
}
</script>

<style scoped="scoped">
.classa{
	color: green;
	display: none;
  font-weight: bold
}
.classb{
	color: #ef5075;
    font-weight: bold
}
.pledgetipsclass{
  font-size: 20px;
  text-align: center;
  line-height:30px;
  padding:5px 0;
}
</style>