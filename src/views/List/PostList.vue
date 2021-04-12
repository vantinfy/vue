<template>
    <div>
        <el-card class="box-card" shadow="never" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
            <div slot="header" class="clearfix">
                <span v-show="!visitmode">我的发帖列表</span>
                <span v-show="visitmode">Ta的发帖列表</span>
            </div>
            <el-card v-for="(article, index) in mypost" :key="index" shadow="nerver" style="margin-bottom:10px">
                <el-row type="flex" align="middle">
                    <el-col :span="20">
                        <i class="el-icon-time"></i>
                        <span style="margin-left:10px;font-size:14px;color:grey">
                            {{article.Article.create_time}}
                        </span>
                    </el-col>
                    <el-col :span="4" style="text-align:right;">
                        <el-popover
                            placement="right"
                            width="160"
                            v-model="deleteHint[index]"
                            v-show="token.uid == current.uid">
                            <div style="text-align: center; margin: 0">
                                <el-button type="text" size="mini" @click="delArticle(article, index)" style="padding:0;color:red;font-size:16px">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference" style="font-size:16px;font-weight:bolder;color:black;padding:0">···</el-button>
                        </el-popover>
                    </el-col>
                </el-row>
                <div>
                    <el-button type="text" class="title content" @click="tDetail(article.Article.tid)">
                        {{article.Article.title}}
                    </el-button>
                </div>
                <div class="content" style="margin-bottom:4px" v-html="article.Article.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')">
                </div>
                <el-image 
                    style="width: 30%;"
                    :src="url + article.Article.cover" 
                    :preview-src-list="[url + article.Article.cover]">
                </el-image>
                <el-divider></el-divider>
                <el-row type="flex" align="middle" justify="space-around">
                    <el-col :span="14">
                        <el-button size="mini" round @click="goTopic(article.Article.topic)">
                            {{article.Article.topic}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan" @click="cancelZan(article,index)" v-if="article.IsZan">
                            {{article.ZanCount}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan0" @click="zan(article,index)" v-if="!article.IsZan">
                            {{article.ZanCount}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-on" @click="cancelBook(article,index)" v-if="article.IsBook">
                            {{article.BookCount}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-off" @click="book(article,index)" v-if="!article.IsBook">
                            {{article.BookCount}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-chat-dot-round" @click="tDetail(article.Article.tid)">
                            {{article.CommentCount}}
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
            <el-divider class="only">
                <span style="color:lightgrey">没有更多数据了</span>
            </el-divider>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
    export default {
        inject:['reload'],
        computed: {
            ...mapState({
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
            })
        },
        watch: {
            visitUser:{
                handler(newValue, oldValue) {
                    // console.log("watch: ", "newValue>>", newValue.avatar, "oldValue>>",  oldValue.avatar)
                    this.updateCurrent(newValue)
                },
                // immediate: true,  //刷新加载 立马触发一次handler
                deep: true  // 可以深度检测到 obj 对象的属性值的变化
            }
        },
        mounted () {
            if(this.$router.currentRoute.path.split("/")[1] == "visit"){
                this.visitmode = true
                this.current = this.visitUser
            }
            else{
                this.visitmode = false
                this.current = this.token
            }
            this.updateCurrent(this.current)
            // axios.get(this.api + "user/getmypost",{
            //     params:{
            //         uid: this.current.uid,
            //         visit_uid:this.token.uid,
            //     }
            // }).then(res =>{
            //     this.mypost = res.data.postlist
            //     // if (res.data.postlist != null){
            //     //     // for(let i = 0,len=this.mypost.length;i<len;i++){
            //     //     //     this.mypost[i].ZanList == null?[]:this.mypost[i].ZanList
            //     //     //     this.mypost[i].BookList == null?[]:this.mypost[i].BookList
            //     //     //     this.mypost[i].CommentList == null?[]:this.mypost[i].CommentList
            //     //     // }
            //     //     this.mypost = res.data.postlist
            //     //     // this.mypost.forEach((val,key) => {
            //     //     //     // val.ZanList == null? []:val.ZanList
            //     //     //     // val.BookList == null? []:val.BookList
            //     //     //     // val.CommentList == null? []:val.CommentList
            //     //     //     if (val.ZanList == null){
            //     //     //         console.log("my zan is nil",key)
            //     //     //         val.ZanList = []
            //     //     //     }
            //     //     //     if (val.BookList == null){
            //     //     //         console.log("my book is nil",key)
            //     //     //         val.BookList = []
            //     //     //     }
            //     //     //     if (val.CommentList == null){
            //     //     //         console.log("my com is nil",key)
            //     //     //         val.CommentList = []
            //     //     //     }
            //     //     // })
            //     // }
            //     // console.log(this.mypost)
            // })
        },
        data() {
            return {
                mypost: [],
                url: this.api + 'article/getcover?cover=',
                // srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                visitmode: false,
                current: '',
                loading: true,
                deleteHint: [],
            }
        },
        methods: {
            updateCurrent(val) {
                this.current = val
                axios.get(this.api + "user/getmypost",{
                    params:{
                        uid: this.current.uid,
                        visit_uid:this.token.uid,
                    }
                }).then(res => {
                    this.loading = false
                    this.mypost = res.data.postlist
                    if (this.mypost != null)
                        this.mypost.forEach(val => {
                            this.deleteHint.push(false)
                        })
                })
            },
            tDetail(val){
                // console.log("jump start>>>>", val)
                this.$router.push('/details/' + val)
                // console.log("jump done>>>>", val)
            },
            delArticle(article,index){
                axios.get(this.api + 'user/delmyarticle',{
                    params:{
                        tid: article.Article.tid
                    }
                }).then(res => {
                    if(res.data.isDelete)
                        this.reload()
                    else
                        this.$notify({
                            title: '网络好像出了点问题，稍后再试试吧',
                            type: 'error',
                            offset: 100
                        })
                })
                // this.mypost[index]
                // this.reload()
            },
            goTopic(val){
                this.$router.push('/topic/' + val)
            },
            zan(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('zan',{article:article,token:this.token})
                this.mypost[index].ZanCount++
                this.mypost[index].IsZan = true
                if(this.visitmode)
                    this.visitUser.zan++
                else
                    this.token.zan++
            },
            cancelZan(article,index){
                this.$store.commit('cancelZan',{article:article,token:this.token})
                this.mypost[index].ZanCount--
                this.mypost[index].IsZan = false
                if(this.visitmode)
                    this.visitUser.zan--
                else
                    this.token.zan--
            },
            book(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('book',{article:article,token:this.token})
                this.mypost[index].BookCount++
                this.mypost[index].IsBook = true
            },
            cancelBook(article,index){
                this.$store.commit('cancelBook',{article:article,token:this.token})
                this.mypost[index].BookCount--
                this.mypost[index].IsBook = false
            }
        },
    }
</script>

<style scoped>
.box-card{
    margin-bottom: 40px
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
 .title{
    color:black;
    /* margin:6px 0; */
    font-size:20px;
    font-weight:bolder
}
.title:hover{
    color:#409EFF
}
.only.el-divider--horizontal{
    margin: 40px 0 20px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
}
</style>