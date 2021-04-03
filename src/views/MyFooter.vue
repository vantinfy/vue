<template>
    <div>
        <div class="foot">
            <el-row type="flex" justify="space-around">
                <el-col :span="4"></el-col>
                <el-col :span="16">
                    <el-row type="flex" justify="space-around">
                        <el-col :span="6">
                            <div class="foot-title">map</div>
                            <el-button type="text" class="btn" @click="jumpTo('Animation')">Animation</el-button>
                            <el-button type="text" class="btn" @click="jumpTo('Comic')">Comic</el-button>
                            <el-button type="text" class="btn" @click="jumpTo('Game')">Game</el-button>
                            <el-button type="text" class="btn" @click="getAnswer()">反馈</el-button>
                        </el-col>
                        <el-col :span="6">
                            <div class="foot-title">about</div>
                            <el-button type="text" class="btn">关于本站</el-button>
                            <el-button type="text" class="btn">加入本站</el-button>
                        </el-col>
                        <el-col :span="6">
                            <div class="foot-title">联系</div>
                            <!-- <input v-model="question">
                            my_Answer:{{answer}} -->
                            <el-popover
                                placement="top-start"
                                trigger="hover">
                                <!-- <el-image
                                    style="width: 144px; height: 144px"
                                    src='../assets/wechat.png'
                                    fit="cover"></el-image> -->
                                    <img src="../assets/wechat.png" style="width:144px;height:144px" fit="contain">
                                <el-button type="text" slot="reference" class="btn">WeChat</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
            <span style="color:grey;font-size:14px">
                Copyright © 2021 acg_chat
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        inject:['reload'], //注入App里的reload方法
        data() {
            return {
                // question:'',
                // answer: 'i don"t know'
            }
        },
    //      watch: {
    //     // 如果 question  发生改变，这个函数就会运行
    //     question: function (newQuestion, oldQuestion) {
    //       this.answer = 'Waiting for you to stop typing...'
    //     //   this.debouncedGetAnswer()
    //     }
    //   },
        methods:{
            jumpTo(val){
                if (this.$router.currentRoute.path.split("/")[2] == val){}
                else{
                    this.$router.push('/topic/' + val)
                    this.reload()
                }
            },
            // getAnswer(){
            //     var vm = this;
            //     this.$axios.get('https://yesno.wtf/api')
            //         .then(function (response) {
            //             vm.answer = response.data.answer
            //         })
            //         .catch(function (error) {
            //             vm.answer = 'Error! Could not reach the API. ' + error
            //         })}
        },
    }
</script>

<style scoped>
.foot-title{
    font-size:16px;
    font-weight:bold;
    color:grey;
    margin-top: 10px
}
.btn{
    color:grey
}

.btn:hover{
    color:#409EEF
}
/* .btn:active{
    color:grey
} */
.foot{
      background: #fff;
      color:#333;
      text-align: center;
      height: 120px;
      line-height: 60px;
  }
</style>