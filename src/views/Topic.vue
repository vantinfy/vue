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
                    <!-- <div class="infinite-list"  v-infinite-scroll="load" style="overflow:auto">
                        <el-card v-for="i in count" >
                            {{'card ' + i }}
                        </el-card>
                    </div> -->
                    <el-card v-for="(article, index) in articlelist" :key="index" style="margin-bottom:10px" shadow="never">
                        <!-- 考虑分页算了 -->
                        <el-row :gutter="20" type="flex" align="middle">
                            <el-avatar :size="40" style="" :src="headUrl + articleInfo[index].Avatar"></el-avatar>
                            <el-col :span="18" >
                                <el-button type="text" class="btn" @click="visit(articleInfo[index].UserName)">
                                    {{articleInfo[index].UserName}}
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <span style="color:grey;font-size:13px">
                                    {{article.create_time}}
                                </span>
                            </el-col>
                        </el-row>

                        <div >
                            <el-button type="text" class="title" @click="tDetail(article.tid)">
                                {{article.title}}
                            </el-button>
                        </div>

                        <div class="content" style="font-size: 14px; margin: 0 20px 6px 10px;" v-html="article.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')">
                        </div>
                        <!-- <div style="text-align:center;margin-top:10px;"> -->
                            <el-button @click="tDetail(article.tid)" type="text">
                                <el-image
                                    fit="contain"
                                    style="height:100px;width:100%"
                                    :src="url + article.cover">
                                </el-image>
                            </el-button>
                        <!-- </div> -->

                        <!-- <el-divider></el-divider> -->
                        <div style="">
                            <el-row type="flex" align="middle" justify="space-around">
                                <el-col :span="14">
                                    <el-button size="mini" round @click="goTopic(article.topic)">
                                        {{article.topic}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan0" @click="zan">
                                        {{zanCntList[index]}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-star-off" @click="book">
                                        {{bookCntList[index]}}
                                    </el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-chat-dot-round" @click="tDetail(article.tid)">
                                        {{commentCntList[index]}}
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
                    topic: this.$router.currentRoute.path.split("/")[2]
                }
            }).then(res => {
                if(res.data.articlelist == null){
                    this.$router.push('/notFound')
                    return
                }
                this.articlelist = res.data.articlelist
                this.articlelist.reverse() // 逆序，因为需要最新发布的排在最前，下同
                // 试过在后端接口就逆序好再响应，但是拿到的数据总是只有一部分逆序，所以干脆全都在这里逆序好了
                this.articleInfo = res.data.articleInfo
                this.articleInfo.reverse()
                for (let i = 0; i < this.articlelist.length; i++){
                    if(this.articlelist[i].comment != ""){
                        this.commentCntList[i] = this.articlelist[i].comment.split("-").length
                    }else{
                        this.commentCntList[i] = 0
                    }
                    if(this.articlelist[i].zan != ""){
                        this.zanCntList[i] = this.articlelist[i].zan.split("-").length
                    }else{
                        this.zanCntList[i] = 0
                    }
                    if(this.articlelist[i].book != ""){
                        this.bookCntList[i] = this.articlelist[i].book.split("-").length
                    }else{
                        this.bookCntList[i] = 0
                    }
                }
            })
        },
        data(){
            return{
                topicUrl: '',
                url: 'http://localhost:8090/article/getcover?cover=',
                articlelist: [],
                articleInfo: [],
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                count: 0,
                commentCntList: [],
                zanCntList: [],
                bookCntList: [],
            }
        },
        methods:{
            load () {
                this.count += 2
            },
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
                this.$router.push('/article/' + val)
            },
            zan(){
                console.log("点赞")
            },
            book(){
                console.log("收藏")
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