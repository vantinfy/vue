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
                                    <el-avatar :size="120" fit="cover" style="" :src="headUrl + visitUser.avatar"></el-avatar>
                                </el-col>

                                <el-col :span="12" style="text-align:left;margin:10px 0">
                                    <div class="name">
                                        {{visitUser.user_name}}
                                        <span v-if="visitUser.sex=='男'" style="margin-left:6px;color:#4169E1;font-weight:bolder">♂</span>
                                        <span v-if="visitUser.sex=='女'" style="margin-left:6px;color:#FF1493;font-weight:bolder">♀</span>
                                        <span style="margin-left:20px;font-weight:thin;font-size:14px">uid:{{visitUser.uid}}</span>
                                    </div>
                                    <span style="margin-bottom:10px;color:#be002f;font-weight:thin;font-size:14px" v-show="new Date(visitUser.state.replace(/-/g, '/')).getTime() > new Date().getTime()">
                                        <!-- 字体颜色：殷红#be002f -->
                                        <i class="el-icon-loading"></i> 该账号封禁中，恢复时间：{{visitUser.state}}
                                    </span>

                                    <div class="sign">{{visitUser.sign}}</div>
                                    <div>
                                        <el-button size="medium" v-show="!isfollowed" @click="subscribe" round>关注</el-button>
                                        <el-button size="medium" v-show="isfollowed" type="primary" plain @click="unsubscribe" round>已关注</el-button>
                                    </div>

                                </el-col>

                                <el-col :span="8" style="text-align:center;margin:10px 0">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px" @click="myFollow()">{{follow_fans_cnt.follow_cnt}}</el-button>
                                            <div>关注</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px" @click="myFans()">{{follow_fans_cnt.fans_cnt}}</el-button>
                                            <div>粉丝</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-button type="text" style="padding-bottom:0;font-size:18px;color:#333">{{visitUser.zan}}</el-button>
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
                            </div>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-document" @click="myPost()">
                                    Ta的发帖
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-folder-opened" @click="myBook()">
                                    Ta的收藏
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-chat-line-round" @click="myComment()">
                                    Ta的评论
                                </el-button>
                            </el-card>
                            <el-divider></el-divider>

                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-star-on" @click="myFollow()">
                                    Ta的关注
                                </el-button>
                            </el-card>
                            <el-card shadow="nerver" :body-style="{ padding: '0px' }" class="card">
                                <el-button type="text" style="width:100%" icon="el-icon-view" @click="myFans()">
                                    Ta的粉丝
                                </el-button>
                            </el-card>
                        </el-card>
                    </el-col>
                    <el-col :span="17" >
                        <post-list v-show="post"></post-list>
                        <book-list v-show="book"></book-list>
                        <comment-list v-show="comment"></comment-list>
                        <follow-list v-show="follow"></follow-list>
                        <!-- <follow-list v-show="follow" @siteReload="siteReload"></follow-list> -->
                        <fans-list v-show="fans"></fans-list>
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
import MessageList from './List/MessageList'
import BookList from './List/BookList'
import FollowList from './List/FollowList'
import FansList from './List/FansList'
import CommentList from './List/CommentList'
import MyFooter from './MyFooter'
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        inject:['reload'], //注入App里的reload方法
        components:{
            Navigation,
            PostList,
            CommentList,
            MessageList,
            BookList,
            FollowList,
            FansList,
            MyFooter
        },
        computed: {
            ...mapState({
                post: state => state.spacelist.post,
                book: state => state.spacelist.book,
                comment: state => state.spacelist.comment,
                follow: state => state.spacelist.follow,
                fans: state => state.spacelist.fans,
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
                follow_fans_cnt:state=>state.users.follow_fans_cnt,
            }),
            // updateState(){
            //     console.log("computed>>>>>>>", this.$state.users.visitUser)
            //     return this.$state.users.visitUser
            // }
        },
        // watch: {
        //     updateState: function(val){
        //         this.siteReload()
        //     }
        // },
        data(){
            return{
                headUrl: this.api + 'user/getavatar?username=',
                followCnt: 0,
                fansCnt: 0,
                isfollowed: false,
                // dialogFormVisible: false,
                // myself: false,
            }
        },
        mounted(){
            axios.get(this.api + 'user/getavatar',{
                params:{
                    uid: this.$router.currentRoute.path.split('/')[2]
                }
            }).then(res => {
                if (res.data.notFound == true){
                    this.$router.push('/notFound')
                    return
                }
            })
            if(this.token.uid == this.visitUser.uid)
                this.$store.commit('myPost', {visit: false, token: this.token})
            axios.get(this.api + 'user/refreshuserinfo',{
                params:{
                    uid: this.visitUser.uid,
                    visit_uid: this.token.uid,
                }
            }).then(res => {
                this.isfollowed = res.data.isfollowed
                this.$store.commit('updateVisitUser',res.data.refreshUserInfo)
            })
            // if (this.token != '')
            //     for (let i = 0; i < this.token.follow.split("-").length; i++){
            //         if (this.token.follow.split("-")[i] == this.visitUser.uid){
            //             this.hasNotSubsribe = true
            //             break
            //         }
            //     }
            // this.siteReload()
            // if (this.visitUser.avatar == null){
            //     this.headUrl = ''
            // }
            // if(this.visitUser.follow != "")
            //     this.followCnt = this.visitUser.follow.split("-").length
            // if(this.visitUser.fans != "")
            //     this.fansCnt = this.visitUser.fans.split("-").length
        },
        methods:{
            subscribe(){
                axios.get(this.api + 'user/subscribe', {
                    params: {
                        follow_uid: this.token.uid,
                        follow_name: this.token.user_name,
                        be_follow_uid: this.visitUser.uid,
                        be_follow_name: this.visitUser.user_name
                    }
                }).then(res => {
                    if(res.data.successFollow)
                        this.reload()
                })
                // this.isfollowed = true
            },
            unsubscribe(){
                axios.get(this.api + 'user/unsubscribe', {
                    params: {
                        uid: this.token.uid,
                        target_uid: this.visitUser.uid,
                    }
                })
                this.isfollowed = false
            },
            myPost(){
                this.$store.commit('myPost', {visit: true, token: this.visitUser})
            },
            myBook(){
                this.$store.commit('myBook', {visit: true, token: this.visitUser})
            },
            myComment(){
                this.$store.commit('myComment', {visit: true, token: this.visitUser})
            },
            myFollow(){
                this.$store.commit('myFollow', {visit: true, token: this.visitUser})
            },
            myFans(){
                this.$store.commit('myFans', {visit: true, token: this.visitUser})
            },
            // siteReload(){
                // console.log("update", this.visitUser.avatar)//vuex尚未刷新
                // console.log("页面刷新data", this.headUrl)//data尚未加载
                // this.reload()
            // }
        }
    }
</script>

<style scoped>
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
</style>