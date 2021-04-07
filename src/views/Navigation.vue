<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-button type="text" class="btn" @click="index">主站</el-button>
                    <el-button type="text" class="btn" @click="create">发布</el-button>

                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-button type="text" class="btn" style="margin:0 10px">
                                消息 <el-badge is-dot v-show="isLogin && (systemNoticeCnt != 0 || commentNoticeCnt != 0 || subscribeNoticeCnt != 0 || zanBookNoticeCnt != 0)"></el-badge>
                            </el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="text-align:center">                            
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_sys()">系统通知</el-button>
                                <el-badge :value="systemNoticeCnt" :max="99" v-if="systemNoticeCnt"></el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_cment()">评论</el-button>
                                <el-badge :value="commentNoticeCnt" :max="99" v-if="commentNoticeCnt"></el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_zbook()">点赞收藏</el-button>
                                <el-badge :value="zanBookNoticeCnt" :max="99" v-if="zanBookNoticeCnt"></el-badge>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_follow()">新关注</el-button>
                                <el-badge :value="subscribeNoticeCnt" :max="99" v-if="subscribeNoticeCnt"></el-badge>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="text" class="btn" @click="book()">收藏</el-button>
                    <el-button type="text" v-show="token.level > 0" class="btn" @click="manage()">管理</el-button>
                </el-col>
            
                <!-- 搜索框以及抽屉(在header外) -->
                <el-col :span="8">
                    <el-button @click="drawer = true" icon="el-icon-my-search" circle></el-button>
                </el-col> 

                <el-col :span="8">
                    <el-dropdown placment="bottom-start">
                        <span class="el-dropdown-link">
                            <el-button v-show="!isLogin" icon="el-icon-user" circle></el-button>
                            <el-button type="text">
                                <el-avatar :size="40" fit="cover" :src="headUrl" v-show="isLogin">
                                </el-avatar>
                            </el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div style="text-align:center;margin:10px 0;color:black" v-show="isLogin">
                                {{token.user_name}}
                            </div>                         
                            <el-dropdown-item  v-show="!isLogin">
                                <el-button type="text" @click="login()" style="text-align:right">登录/注册</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item  v-show="isLogin">
                                <el-button type="text" @click="userspace()">个人中心</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item divided v-show="isLogin">
                                <el-button type="text" @click="exit()">退出登录</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                
            </el-row>
        </el-header>

        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            size="40%"
            style="text-align:center">
            <span style="margin:0;">想要找点什么呢？</span>
            <el-row>
                <el-col>
                    <el-input
                        placeholder="搜索"
                        clearable
                        size="medium"
                        v-model="input_search"
                        @keyup.enter.native="search(input_search)"
                        style="width:30%;margin-top:10px">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        computed: mapState({
            usr: state => state.users.usr,
            token: state => state.users.token,
            activeName: state => state.spacelist.activeName,
            systemNoticeCnt: state => state.notice.systemNoticeCnt,
            commentNoticeCnt: state => state.notice.commentNoticeCnt,
            zanBookNotice:state=>state.notice.zanBookNotice,
            subscribeNoticeCnt: state => state.notice.subscribeNoticeCnt,
            systemNotice: state => state.notice.systemNotice,
            commentNotice: state => state.notice.commentNotice,
            zanBookNoticeCnt:state=>state.notice.zanBookNoticeCnt,
            subscribeNotice: state => state.subscribeNotice,
        }),
        mounted(){
            // axios.get('http://localhost:8090/user/getlogin',{
            //     params:{
            //             token: this.$store.token,
            //         }
            // }).then(res => {
            //         console.log(res)
            //         if(res.data.isLogin){
            //             this.isLogin = true
            //         }else{
            //             this.isLogin = false
            //         }
            //     })
            // console.log((new Date().getTime() + 120 * 60 * 1000))
            // if(parseInt(this.token.split("-")[2])+ 120 * 60 * 1000<(new Date().getTime() + 60 * 60 * 1000)||this.token=='')
            if(this.token == '')
                this.isLogin = false // 登录信息失效
            else{
                this.isLogin = true
                if (this.token.avatar != null){
                    this.headUrl = 'http://localhost:8090/user/getavatar?uid=' + this.token.uid
                    axios.get('http://localhost:8090/notice/getallnotice',{
                        params:{
                            uid: this.token.uid,
                            level: this.token.level,
                        }
                    }).then(res => {
                        this.$store.commit('setZero',"all")
                        if (res.data.system_notice != null){
                            this.$store.commit('setSystemNotice', res.data.system_notice.reverse())
                            this.systemNotice.forEach(val => {
                                if(val.is_read == 0)
                                    this.$store.commit('add', "sys")
                            })
                        }
                        if (res.data.subscribe_notice != null){
                            this.$store.commit('setSubscribeNotice', res.data.subscribe_notice.reverse())
                            this.subscribeNotice.forEach(val => {
                                if(val.is_read == 0)
                                    this.$store.commit('add', "subs")
                            })
                        }
                        if (res.data.comment_notice != null){
                            this.$store.commit('setCommentNotice', res.data.comment_notice.reverse())
                            this.commentNotice.forEach(val => {
                                if(val.is_read == 0)
                                    this.$store.commit('add', "com")
                            })
                        }
                        if (res.data.zan_book_notice != null){
                            this.$store.commit('setZanBookNotice', res.data.zan_book_notice.reverse())
                            this.zanBookNotice.forEach(val => {
                                if(val.is_read == 0)
                                    this.$store.commit('add', "zbk")
                            })
                        }
                    })
                }
            }
            // this.great()
        },
        data(){
            return{
                drawer: false,
                direction: 'ttb',
                input_search:'',
                isLogin: false,
                headUrl: null,
                sysNotice: 0,
                comNotice: 0,
                subsNotice: 0,
            }
        },
        methods:{
            index(){
                if(this.$route.path != '/'){    // 注意route与router不同
                    this.$router.push('/')
                    // window.location.reload()
                }else{
                    this.$router.go(0)// 刷新页面
                }
            },
            create(){
                if (this.isLogin){
                    let form = {
                        title: '',
                        topic: '',
                        cover: '',
                        content: '',
                        isNewArticle: 1,
                    }
                    this.$store.commit('setDraftForm', form)
                    this.$router.push('/article/new')
                }else{
                    this.$message.warning(`请先登录再操作`);
                }
            },
            msg_sys(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'system_notice'})
            },
            msg_cment(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'comment_notice'})
            },
            msg_zbook(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'zan_book_notice'})
            },
            msg_follow(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'subscribe_notice'})
            },
            book(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myBook', {visit: false, token: this.token})
            },
            manage(){
                this.$router.push('/management/user_manage')
            },
            login(){
                this.$router.push('/login')
            },
            userspace(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myPost', {visit: false, token: this.token})
            },
            exit(){
                this.isLogin = false
                this.$store.commit('clearToken')
                // router.push('/')
            },
            search(val){
                // console.log(val)
                // this.$router.push('/search/keyword=' + val)
                this.drawer = false
                this.$store.commit('search', {mode: "article", keyword: val})
            },
            // great(){
            //     document.getElementById('saveImage').onchange = function () {
            //         console.log("image change")
            //         var imgFile = this.files[0];
            //         var fr = new FileReader();
            //         fr.onload = function () {
            //             document.getElementById('portrait').src = fr.result;
            //         };
            //         fr.readAsDataURL(imgFile);
            //     }
            // },
            // imageSubmit(){
            //     let x = document.getElementById('saveImage').files[0];
            //     console.log(x);
            //     let params = new FormData() ; //创建一个form对象
            //     params.append('file',x,x.name); //append 向form表单添加数据
            //     //添加请求头 通过form添加的图片和文件的格式必须是multipart/form-data
            //     let config = {
            //         headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     this.$axios.post("/user/image",params,config)
            //         .then(function(res){
            //             console.log(res);
            //             this.imageSave = res.data.image;
            //             sessionStorage.setItem('headImg',this.imageSave); //将图片保存，并能够在其他地方加载显示
            //             router.go(0); //刷新页面，头像改变
            //         }.bind(this))
            //         .catch(function (error) {
            //             console.log(error);
            //         })
            // },
        }
    }
</script>

<style scoped>
 .el-header{
    background-color: lightsteelblue;
    color: #333;
    text-align: center;
    /* height:800px; */
    line-height: 60px;
    /* display: block; */
    z-index: 3;
    position: fixed;
    left:0;
    top:0;
    right:0;
  }
  .btn{
      color: white;
      font-size: 16px;
  }
  /* .el-dialog.el-dialog__body{
      padding:20px
  } */
  /* .myUpload .img .el-upload-list__item-thumbnail{
        width:100px!important;
        height:100px!important;
        object-fit: contain!important;
  } */
  /* .hide .el-upload--picture-card {
        display: none;
    } */
</style>