<template>
    <div id="userspace_bg">
        <navigation></navigation>
        <el-row type="flex" justify="space-around" style="margin-top:60px;padding-top:30px">
            <el-col :span="4"></el-col>
            <el-col :span="16">
                <el-row>
                    <el-col style="">
                        <el-card shadow="never">
                            <el-row :gutter="20" style="" type="flex" align="middle">
                                <el-col :span="4" style="text-align:center">
                                    <el-avatar :size="120" fit="cover" style="" :src="headUrl"></el-avatar>
                                </el-col>

                                <el-col :span="12" style="text-align:left;margin:10px 0">
                                    <div class="name">
                                        {{token.user_name}}
                                        <span style="margin-left:20px;font-weight:thin;font-size:14px">uid:{{token.uid}}</span>
                                    </div>
                                    <span style="margin-bottom:10px;color:#be002f;font-weight:thin;font-size:14px" v-show="silence">
                                        <!-- 字体颜色：殷红#be002f -->
                                        <i class="el-icon-loading"></i> 账号封禁中，恢复时间：{{token.state}}
                                    </span>

                                    <div class="sign">{{token.sign}}</div>
                                    <div>
                                        <el-button size="medium" @click="dialogFormVisible = true">修改</el-button>
                                        <!-- <el-button size="medium" @click="subscribe">关注</el-button>
                                        <el-button size="medium" type="primary" plain @click="unsubscribe">已关注</el-button> -->
                                    </div>

                                    <el-dialog title="编辑资料" :visible.sync="dialogFormVisible">
                                        <!-- dialog对话框提交表单 -->
                                        <el-form :model="form">
                                            <el-row type="flex" justify="space-around" align="middle">
                                                <el-col :span="8"></el-col>
                                                <el-col :span="8" style="text-align:center;margin-bottom:20px">
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        action="/empty"
                                                        accept=".jpg,.gif,.png,.jpeg"
                                                        :show-file-list="true"
                                                        :auto-upload="false"
                                                        :on-change="upLoadChange"
                                                        :limit="1"
                                                        :on-exceed="handleExceed"
                                                        :file-list="nowAvatar"
                                                        :on-success="handleAvatarSuccess"
                                                        :before-upload="beforeAvatarUpload">
                                                        <el-button type="text">
                                                            <el-avatar :size="100" fit="cover" :src="headUrl"></el-avatar>
                                                        </el-button>
                                                    </el-upload>
                                                    <div style="color:grey;font-size:13px">点击头像修改</div>
                                                    <!-- <div><img v-if="headUrl" :src="headUrl" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i></div> -->
                                                    <!-- <el-button type="text">
                                                        <el-avatar :size="80" style="" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                                    </el-button> -->
                                                </el-col>
                                                <el-col :span="8"></el-col>
                                            </el-row>
                                            <el-form-item label="昵称" :label-width="formLabelWidth">
                                                <el-input v-model="form.name" autocomplete="off" placeholder="请输入新昵称" maxlength="20" show-word-limit clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="性别" :label-width="formLabelWidth">
                                                <el-radio-group v-model="form.radio">
                                                <el-radio label="男">男</el-radio>
                                                <el-radio label="女">女</el-radio>
                                                <el-radio label="保密">保密</el-radio>
                                            </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="密码" :label-width="formLabelWidth">
                                                <el-input v-model="form.pwd" autocomplete="off" placeholder="请输入新密码" maxlength="20" show-word-limit clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="签名" :label-width="formLabelWidth">
                                                <el-input v-model="form.sign" autocomplete="off" placeholder="请输入新签名" maxlength="48" show-word-limit clearable></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="changeEdit()">确 定</el-button>
                                        </div>
                                    </el-dialog>

                                </el-col>

                                <el-col :span="8" style="text-align:center;margin:10px 0">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px" @click="myFollow()">{{followCnt}}</el-button>
                                            <div>关注</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px" @click="myFans()">{{fansCnt}}</el-button>
                                            <div>粉丝</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px;color:#333">{{token.zan}}</el-button>
                                            <!-- <span style="padding-bottom:0;font-size:18px">99</span> -->
                                            <div>赞</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="20" type="flex" justify="space-around" style="margin-top:20px">
                    <el-col :span="7" >
                        <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span>个人中心</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                            </div>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-document" @click="myPost()">
                                    我的发帖
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-edit" @click="myDraft()">
                                    我的草稿
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-chat-line-round">
                                    我的评论
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card" v-if="silence">
                                <el-button type="text" style="width:100%" icon="el-icon-warning-outline" @click="appealVisible = true">
                                    禁言申诉
                                </el-button>
                            </el-card>
                            <el-dialog title="提交申诉" :visible.sync="appealVisible">
                                <el-form :model="appealForm">
                                    <!-- <el-form-item label="具体帖子链接（选填）" >
                                        <el-input v-model="appealForm.link" placeholder="请输入链接" maxlength="64" show-word-limit clearable></el-input>
                                    </el-form-item> -->
                                    <el-form-item label="申诉理由" >
                                        <el-input v-model="appealForm.reason" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入申诉理由" maxlength="300" show-word-limit clearable></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="appeal()">确 定</el-button>
                                </div>
                            </el-dialog>
                            <el-divider></el-divider>

                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-folder-opened" @click="myBook()">
                                    我的收藏
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-star-on" @click="myFollow()">
                                    我的关注
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-view" @click="myFans()">
                                    我的粉丝
                                </el-button>
                            </el-card>
                            <el-divider></el-divider>

                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-message-solid" @click="myMessage()">
                                    我的消息
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-s-tools" @click="dialogFormVisible = true">
                                    编辑资料
                                </el-button>
                            </el-card>
                            <el-divider></el-divider>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-switch-button" @click="exit()">
                                    退出登录
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <!-- <el-popconfirm
                                    confirm-button-text='好的'
                                    cancel-button-text='不用了'
                                    icon="el-icon-info"
                                    icon-color="red"
                                    title="此操作不可逆，将注销账号信息，确定吗？"
                                    >
                                    <el-button type="text" style="width:100%;color:red" icon="el-icon-delete" slot="reference">
                                        注销账号
                                    </el-button>
                                </el-popconfirm> -->
                                <!-- <el-button type="text" style="width:100%;color:red" icon="el-icon-delete" @click="revoke()">
                                    注销账号
                                </el-button> -->
                                <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="revokeHint">
                                    <p>将注销账号信息，此操作不可逆，确定吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="revokeHint = false">手滑了</el-button>
                                        <el-button type="danger" size="mini" @click="revoke">确定</el-button>
                                    </div>
                                    <el-button type="text" style="width:100%;color:red" icon="el-icon-delete" slot="reference">注销账号</el-button>
                                </el-popover>
                            </el-card>
                        </el-card>
                    </el-col>
                    <el-col :span="17" >
                        <post-list v-show="post"></post-list>
                        <draft-list v-show="draft"></draft-list>
                        <book-list v-show="book"></book-list>
                        <follow-list v-show="follow"></follow-list>
                        <fans-list v-show="fans"></fans-list>
                        <message-list v-show="msg"></message-list>
                        <!-- <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span>个人中心</span>
                            </div>
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                        </el-card> -->
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>

        <my-footer></my-footer>
    </div>
</template>

<script>
import Navigation from './Navigation'
import PostList from './List/PostList'
import DraftList from './List/DraftList'
import MessageList from './List/MessageList'
import BookList from './List/BookList'
import FollowList from './List/FollowList'
import FansList from './List/FansList'
import MyFooter from './MyFooter'
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        inject:['reload'], //注入App里的reload方法
        components:{
            Navigation,
            PostList,
            DraftList,
            MessageList,
            BookList,
            FollowList,
            FansList,
            MyFooter
        },
        computed: mapState({
            post: state => state.spacelist.post,
            draft: state => state.spacelist.draft,
            book: state => state.spacelist.book,
            follow: state => state.spacelist.follow,
            fans: state => state.spacelist.fans,
            msg: state => state.spacelist.msg,
            token: state => state.users.token,
            visitUser: state => state.users.visitUser,
        }),
        // beforeRouteUpdate (to, from, next) {
        //     // console.log(to)
        //     // 随时监测url以便加载不同的子组件(postlist等)
        //     switch(to.params.list){
        //         case 'postlist':
        //             this.myPost();
        //             break;
        //         case 'booklist':
        //             this.myBook();
        //             break;
        //         case 'followlist':
        //             this.myFollow();
        //             break;
        //         case 'fanslist':
        //             this.myFans();
        //             break;
        //         case 'messagelist':
        //             this.myMessage();
        //             break;
        //     }
        //     next()
        // },
        data(){
            return{
                headUrl: '',
                // post: true,
                // book: false,
                // follow: false,
                // fans: false,
                // msg: false,
                // list:[postlist, booklist, followlist, fanslist, messagelist]
                // list: [1, 0, 0, 0, 0]
                // list: [true, false, false, false, false]
                dialogFormVisible: false,
                appealVisible: false,
                form:{
                    name: '',
                    pwd: '',
                    sign: '',
                    radio: "保密",
                    // region: '',
                    // date1: '',
                    // date2: '',
                    // delivery: false,
                    // type: [],
                    // resource: '',
                    // desc: ''
                },
                silence: false, // 封禁状态
                appealForm:{
                    reason: '',
                    link: '',
                },
                nowAvatar: [],
                file:null,
                revokeHint: false,
                formLabelWidth: '120px',
                followCnt: 0,
                fansCnt: 0,
                config: {
                    headers:{'Content-Type':'multipart/form-data'}
                }
            }
        },
        mounted(){
            if (this.token != ""){
                if (new Date(this.token.state.replace(/-/g, '/')).getTime() > new Date().getTime())
                    this.silence = true
            }else{
                this.$router.push('/login')
                return
            }
            axios.get('http://localhost:8090/user/getavatar',{
                params:{
                    uid: this.$router.currentRoute.path.split('/')[2]
                }
            }).then(res => {
                if (res.data.notFound == true){
                    this.$router.push('/notFound')
                    return
                }
            })
            if (this.token.avatar != null)
                this.headUrl = 'http://localhost:8090/user/getavatar?uid=' + this.$router.currentRoute.path.split('/')[2]
            this.form.name = this.token.user_name
            this.form.pwd = this.token.password
            this.form.radio = this.token.sex
            this.form.sign = this.token.sign
            if(this.token.follow != "")
                this.followCnt = this.token.follow.split("-").length
            if(this.token.fans != "")
                this.fansCnt = this.token.fans.split("-").length
        },
        methods:{
            // subscribe(){
            //     let formData = new FormData();
            //     formData.append("username", this.token.user_name)
            //     formData.append("uid", this.token.uid)
            //     // formData.append("target_user", this.appealForm.link);
            //     // formData.append("appeal_reason", this.appealForm.reason);
            //     let config = {
            //         headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     axios.post("http://localhost:8090/user/subscribe", formData, config)
            //         .then(function(res) {
            //             console.log(res)
            //         }
            //     )
            // },
            // unsubscribe(){
            //     let formData = new FormData();
            //     formData.append("username", this.token.user_name)
            //     formData.append("uid",this.token.uid)
            //     // formData.append("target_user", this.appealForm.link);
            //     // formData.append("appeal_reason", this.appealForm.reason);
            //     let config = {
            //         headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     axios.post("http://localhost:8090/user/unsubscribe", formData, config)
            //         .then(function(res) {
            //             console.log(res)
            //         }
            //     )
            // },
            myPost(){
                this.$store.commit('myPost', {visit: false, token: this.token})
            },
            myDraft(){
                this.$store.commit('myDraft', {visit: false, token: this.token})
            },
            myBook(){
                this.$store.commit('myBook', {visit: false, token: this.token})
            },
            appeal(){//申诉
                // let that = this
                if(!this.silence){
                    this.$message.info('你没有被禁言哦')
                    return
                }
                let formData = new FormData()
                if (this.appealForm.reason.replace(/\s|\s/g,'') == ''){
                    this.$message.warning("理由不能为空")
                    return
                }
                formData.append("user_name", this.token.user_name)
                formData.append("uid", this.token.uid)
                // formData.append("appeal_link", this.appealForm.link);
                formData.append("type", "appeal")
                formData.append("appeal_reason", this.appealForm.reason);
                axios.post("http://localhost:8090/notice/feedback", formData, this.config)
                this.$message.success("提交成功")
                this.appealVisible = false
            },
            myFollow(){
                this.$store.commit('myFollow', {visit: false, token: this.token})
            },
            myFans(){
                this.$store.commit('myFans', {visit: false, token: this.token})
            },
            myMessage(){
                this.$store.commit('myMessage',{token:this.token, type:'system_notice'})
            },
            upLoadChange(file,filelist){
                let isJPEG = file.raw.type === 'image/jpeg';
                let isPNG = file.raw.type === 'image/png';
                let isGIF = file.raw.type === 'image/gif';
                let isLt15M = file.size / 1024 / 1024 < 15;
                if ( !isJPEG && !isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是".jp(e)g"或".png"或"gif"格式!');
                    this.nowAvatar = []
                }
                if (!isLt15M) {
                    this.$message.error('上传头像图片大小不能超过 15MB!');
                    this.nowAvatar = []
                    return
                }
                this.file = file
                // let that = this
                // let formdata2 = new FormData()
                // formdata2.append("file", file.raw)
                // formdata2.append("username", this.token.username)
                // let config = {
                //     headers:{'Content-Type':'multipart/form-data'}
                // };
                // axios.post("http://localhost:8090/user/modifyavatar", formdata2, config)
                //     .then(function(res) {
                //         console.log(res)
                //         that.$store.commit('updateToken', res.data.user)
                //     }
                // )
                // axios.get("http://localhost:8090/user/getavatar",{
                //     params:{
                //         username: that.token.avatar
                //     }
                // })
                // this.nowAvatar = []
                // this.reload();
                // this.$router.go(0)
            },
            upLoad(file) {
                console.log("submit post")
                let that = this
                let formData = new FormData();
                formData.append("username", this.token.username)
                formData.append("file", file.file);
                console.log(file);
                axios.post("http://localhost:8090/user/modifyavatar", formData, this.config)
                    .then(function(res) {
                        // console.log(res)
                        that.$store.commit('updateToken', res.data.user)
                    }
                )
            },
            handleAvatarSuccess(res, file) {
                this.$message.success('done')
                this.nowAvatar = []
                // this.headUrl = URL.createObjectURL(file.raw);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`最多选择 1 个文件`);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isJPEG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isLt15M = file.size / 1024 / 1024 < 12;

                if (!isJPG && !isJPEG && !isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是".jp(e)g"或".png"或"gif"格式!');
                }
                if (!isLt15M) {
                    this.$message.error('上传头像图片大小不能超过 15MB!');
                }
                return isJPG&& isJPEG && isPNG && isLt15M;
            },
            exit(){
                this.$store.commit('clearToken')
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
                axios.post('http://localhost:8090/notice/feedback', params, this.config).then(res => {
                    if(res.data.isFeedback)
                        this.$message.success(res.data.msg)
                    else
                        this.$message.warning(res.data.msg)
                    this.feedbackView = false
                })
            },
            revoke(){ // 注销账号
                let formdata = new FormData()
                formdata.append("username", this.token.user_name)
                formdata.append("uid", this.token.uid)
                axios.post("http://localhost:8090/user/revoke", formdata, this.config)
                this.exit()
            },
            changeEdit(){ // 修改资料
                console.log("changedit")
                // this.$refs.upload.submit();
                let that = this
                let formdata = new FormData()
                formdata.append("uid", this.token.uid)
                formdata.append("newname", that.form.name)
                formdata.append("sex", that.form.radio)
                formdata.append("newpwd", that.form.pwd)
                formdata.append("newsign", that.form.sign)
                
                let formdata2 = new FormData()
                formdata2.append("file",this.file.raw)
                formdata2.append("username",this.token.user_name)
                axios.post("http://localhost:8090/user/modifyavatar", formdata2, this.config)
                    .then(function(res) {
                        // console.log(res)
                        that.$store.commit('updateToken', res.data.user)
                    }
                )
                axios.post("http://localhost:8090/user/modifyinfo", formdata, this.config)
                    .then(function(res) {
                        // console.log(res)
                        if(res.data.isUpdate){
                            that.$store.commit('updateToken', res.data.user)
                        }
                    })
                    .catch(function (error) {
                        console.log("can't find:---->", error);
                    })
                this.dialogFormVisible = false
                // this.reload()
                this.$router.go(0)
            }
        }
    }
</script>

<style scoped>
/* .avatar-uploader{
    width:60px;
    height: 60px;
    background-color: aqua;
} */
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
.foot{
      background: #fff;
      color:#333;
      text-align: center;
      height: 120px;
      line-height: 60px;
  }
#userspace_bg{
    /* background-color: lightsteelblue; */
    background-color: #E9EEF3;
}
.name{
    font-size:18px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.sign{
    font-size:14px;
    margin: 10px 0;
}
.card{
    border:none;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 } 
 .box-card{
    margin-bottom: 100px
}
/* .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  } */
</style>