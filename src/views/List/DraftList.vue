<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>我的草稿</span>
            </div>
            <el-card v-for="(article, index) in mydraft" :key="index" shadow="nerver" style="margin-bottom:10px">
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
                            v-model="delHint[index]">
                            <div style="text-align: center; margin: 0">
                                <el-button type="text" size="mini" @click="delDraft(article, index)" style="padding:0;color:red;font-size:16px">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference" style="font-size:16px;font-weight:bolder;color:black;padding:0">···</el-button>
                        </el-popover>
                    </el-col>
                </el-row>
                <div>
                    <el-button type="text" class="title content" @click="alter(article.Article)">
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
                        <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-zan" @click="cancelZan(article,index)" v-if="article.IsZan">
                            {{article.ZanCount}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-zan0" @click="zan(article,index)" v-if="!article.IsZan">
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
                draftForm: state => state.articles.draftForm,
            })
        },
        mounted () {
            if(this.$router.currentRoute.path.split("/")[1] == "visit"){
                this.$message.warning("没有权限查看哦")
                this.$router.go(-1)
                return
            }
            axios.get(this.api + "user/getdraft",{
                params:{
                    uid: this.token.uid,
                    visit_uid:this.token.uid,
                }
            }).then(res =>{
                this.mydraft = res.data.draftlist
                if (this.mydraft != null)
                    this.mydraft.forEach(val => {
                        this.delHint.push(false)
                    })
                // if(this.mydraft != null)
                //     this.mydraft.forEach(val => {
                //         if (val.ZanList == null)
                //             val.ZanList = []
                //         if (val.BookList == null)
                //             val.BookList = []
                //         if (val.CommentList == null)
                //             val.CommentList = []
                //     })
            })
        },
        data() {
            return {
                mydraft: [],
                url: this.api + 'article/getcover?cover=',
                current: '',
                delHint: [],
            }
        },
        methods: {
            alter(val){
                // console.log("jump start>>>>", val)
                let form = {
                    title: val.title,
                    topic: val.topic,
                    content: '',
                    cover: val.cover,
                    isNewArticle: val.tid,
                }
                axios.get(this.api + 'article/getcontent',{
                    params:{
                        tid: val.tid
                    }
                }).then(res => {
                    form.content = res.data.article.content
                })
                this.$store.commit('setDraftForm', form)
                this.$router.push('/article/modify')
                // console.log("jump done>>>>", val)
            },
            delDraft(article,index){
                axios.get(this.api + 'user/delmyarticle',{
                    params:{
                        tid: article.Article.tid
                    }
                }).then(res  => {
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
            tDetail(val){
                this.$router.push('/details/' + val)
            },
            zan(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('zan',{article:article,token:this.token})
                this.mydraft[index].ZanCount++
                this.mydraft[index].IsZan = true
            },
            cancelZan(article,index){
                this.$store.commit('cancelZan',{article:article,token:this.token})
                this.mydraft[index].ZanCount--
                this.mydraft[index].IsZan = false
            },
            book(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('book',{article:article,token:this.token})
                this.mydraft[index].BookCount++
                this.mydraft[index].IsBook = true
            },
            cancelBook(article,index){
                this.$store.commit('cancelBook',{article:article,token:this.token})
                this.mydraft[index].BookCount--
                this.mydraft[index].IsBook = false
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