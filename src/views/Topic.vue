<template>
    <div class="topic_bg">
        <navigation ref="nav"></navigation>

        <el-row :gutter="20" type="flex" justify="space-around" style="margin:60px 0;padding-top:20px;">
            <el-col :span="4"></el-col>
            <el-col :span="15">
                <el-card shadow="never" style="margin:20px 0">
                    <el-row type="flex" align="middle" justify="space-around">
                        <el-col :span="3" style="">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="topicUrl"
                                fit="cover">
                            </el-image>
                        </el-col>
                        <el-col :span="17" style="">
                            <div style="font-size:20px;font-weight:bolder;margin-bottom:10px">
                                {{this.$router.currentRoute.path.split("/")[2]}}
                            </div>
                            这里是动漫相关话题
                        </el-col>
                        <el-col :span="3" style="">
                            <el-button type="primary" icon="el-icon-edit" @click="publish">发布帖子</el-button>
                        </el-col>
                    </el-row>
                </el-card>
                
                <el-card shadow="never">
                    <div slot="header" class="clearfix">
                        <span>最新发布</span>
                    </div>
                    <el-card v-for="(article, index) in articlelist" :key="index" style="margin-bottom:10px" shadow="never">
                        <!-- 考虑分页算了 -->
                        <el-row :gutter="20" type="flex" align="middle">
                            <el-avatar :size="40" style="" :src="headUrl + article.Avatar"></el-avatar>
                            <el-col :span="18" >
                                <el-button type="text" class="btn" @click="visit(article.UserName)">
                                    {{article.UserName}}
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <span style="color:grey;font-size:13px">
                                    {{article.Article.create_time}}
                                </span>
                            </el-col>
                        </el-row>

                        <div >
                            <el-button type="text" class="title" @click="tDetail(article.Article.tid)">
                                {{article.Article.title}}
                            </el-button>
                        </div>

                        <div class="content" style="font-size: 14px; margin: 0 20px 6px 10px;" v-html="article.Article.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')">
                        </div>
                        <!-- <div style="text-align:center;margin-top:10px;"> -->
                            <el-button @click="tDetail(article.Article.tid)" type="text">
                                <el-image
                                    fit="contain"
                                    style="height:100px;width:100%"
                                    :src="url + article.Article.cover">
                                </el-image>
                            </el-button>
                        <!-- </div> -->

                        <!-- <el-divider></el-divider> -->
                        <div style="">
                            <el-row type="flex" align="middle" justify="space-around">
                                <el-col :span="14">
                                    <el-button size="mini" round @click="goTopic(articleArticle.Article.topic)">
                                        {{article.Article.topic}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan" @click="cancelZan(article,index)" v-if="article.IsZan">
                                        {{article.ZanList.length}}
                                    </el-button>
                                    <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan0" @click="zan(article,index)" v-if="!article.IsZan">
                                        {{article.ZanList.length}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-on" @click="cancelBook(article,index)" v-if="article.IsBook">
                                        {{article.BookList.length}}
                                    </el-button>
                                    <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-off" @click="book(article,index)" v-if="!article.IsBook">
                                        {{article.BookList.length}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-chat-dot-round" @click="tDetail(article.Article.tid)">
                                        {{article.CommentList.length}}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    <el-divider class="only">
                        <span style="color:lightgrey">没有更多数据了</span>
                    </el-divider>
                </el-card>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>

        <el-backtop :visibility-height="120" :right="120" :bottom="120">
            <i class="el-icon-s-promotion"></i>
        </el-backtop>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'
import MyFooter from './MyFooter'
import axios from 'axios'
import {mapState} from 'vuex'
    export default {
        components:{
            Navigation,
            MyFooter
        },
        computed: {
            ...mapState({
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
            })
        },
        mounted() {
            this.topicUrl = 'http://localhost:8090/topic/getimg?topic=' + this.$router.currentRoute.path.split("/")[2] + ".jpg"
            axios.get('http://localhost:8090/topic/getlist', {
                params:{
                    topic: this.$router.currentRoute.path.split("/")[2],
                    visit_uid: this.token.uid
                }
            }).then(res => {
                if(res.data.articlelist == null){
                    this.$router.push('/notFound')
                    return
                }
                this.articlelist = res.data.articlelist
                this.articlelist.forEach(val => {
                    if (val.CommentList == null)
                        val.CommentList = []
                    if (val.ZanList == null)
                        val.ZanList = []
                    if (val.BookList == null)
                        val.BookList = []
                })
            })
        },
        data(){
            return{
                topicUrl: '',
                url: 'http://localhost:8090/article/getcover?cover=',
                articlelist: [],
                headUrl: 'http://localhost:8090/user/getavatar?username=',
            }
        },
        methods:{
            publish(){
                this.$refs.nav.create()
            },
            visit(val){
                if (val == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', val)
            },
            tDetail(val){
                this.$router.push('/details/' + val)
            },
            zan(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('zan',{article:article,token:this.token})
                this.articlelist[index].ZanList.push("...")
                this.articlelist[index].IsZan = true
            },
            cancelZan(article,index){
                this.$store.commit('cancelZan',{article:article,token:this.token})
                this.articlelist[index].ZanList.pop()
                this.articlelist[index].IsZan = false
            },
            book(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('book',{article:article,token:this.token})
                this.articlelist[index].BookList.push("...")
                this.articlelist[index].IsBook = true
            },
            cancelBook(article,index){
                this.$store.commit('cancelBook',{article:article,token:this.token})
                this.articlelist[index].BookList.pop()
                this.articlelist[index].IsBook = false
            }
        }
    }
</script>

<style scoped>
.topic_bg{
    background-color: #E9EEF3;
}
.infinite-list{
    height: 1000px;
}
.btn{
    color: black;
    font-size: 17px;
    font-weight: bolder;
}
.btn:hover{
    color: #409EFF
}
.title{
    font-size:17px;
    font-weight:bolder;
    margin:4px 0 0 10px;
    color:black;
    padding: 6px 0;
}
.title:hover{
    color: #409EFF
}
</style>