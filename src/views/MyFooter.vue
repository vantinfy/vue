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
                            <el-button type="text" class="btn" @click="feedbackView = true">反馈</el-button>
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
                                    <div style="text-align:center">站长微信</div>
                                <el-button type="text" slot="reference" class="btn">WeChat</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
            <el-dialog  title="提交反馈" :visible.sync="feedbackView">
                <el-input
                    type="textarea"
                    placeholder="反馈只有站长会收到哦"
                    v-model="feedbackContent"
                    maxlength="300"
                    show-word-limit
                    :autosize="{ minRows: 6, maxRows: 6}"
                    >
                </el-input>
                <div slot="footer">
                    <el-button @click="feedbackView = false">取 消</el-button>
                    <el-button type="primary" @click="feedback">提 交</el-button>
                </div>
            </el-dialog>
            <span style="color:grey;font-size:14px">
                Copyright © 2021 acg_chat
            </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
    export default {
        inject:['reload'], //注入App里的reload方法
        data() {
            return {
                feedbackView: false,
                feedbackContent: '',
                config: {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                // question:'',
                // answer: 'i don"t know'
            }
        },
        computed: {
            ...mapState({
                token: state => state.users.token
            })
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
            feedback(){
                if(this.token == ''){
                    this.$message.warning("请先登录再操作")
                    return
                }
                if (this.feedbackContent.replace(/\s|\s/g,'') == ''){
                    this.$message.warning("理由不能为空")
                    return
                }
                let params = new FormData()
                params.append("feedbackContent", this.feedbackContent)
                params.append("type", "feedback")
                params.append("user_name", this.token.user_name)
                params.append("uid", this.token.uid)
                axios.post('http://localhost:8090/notice/feedback', params, this.config).then(res => {
                    if(res.data.isFeedback)
                        this.$message.success(res.data.msg)
                    else
                        this.$message.warning(res.data.msg)
                    this.feedbackView = false
                })
            }
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