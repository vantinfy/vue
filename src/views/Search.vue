<template>
    <div class="search_bg">
        <navigation></navigation>
        <el-row style="margin-top:60px" type="flex" justify="space-around">
            <el-col :span="4"></el-col>
            <el-col :span="13" style="margin:30px 0;">
                <el-row type="flex" justify="space-around">
                    <el-col :span="2"></el-col>
                    <el-col :span="20">
                        <el-input placeholder="请输入内容" v-model="keyword" style="margin-bottom:30px" @keyup.enter.native="search(keyword)">
                            <el-button slot="append" icon="el-icon-search" type="primary" @click="search(keyword)">
                                搜索
                            </el-button>
                        </el-input>
                        <el-card shadow="nerver" style="padding:10px 10px 0 10px">
                            <!-- <div style="background-color:#fff;padding:20px"> -->
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <!-- <el-tab-pane label="综合" name="seek_all">
                                    <el-card style="margin-top:20px" shadow="nerver">
                                        综合搜索结果1
                                    </el-card>
                                    <el-card style="margin-top:20px" shadow="nerver">
                                        综合搜索结果2
                                    </el-card>
                                </el-tab-pane> -->
                                <el-tab-pane label="帖子" name="seek_article">
                                    <el-card v-for="(article, index) in articlelist" :key="index" shadow="nerver" style="margin-top:20px">
                                        <el-row type="flex" align="middle">
                                            <el-col :span="2">
                                                <el-avatar :size="34" style="" :src="headUrl+articleInfo[index].Avatar"></el-avatar>
                                            </el-col>
                                            <el-col :span="4">
                                                <el-button type="text" class="name" @click="visit(articleInfo[index].UserName)">
                                                    {{articleInfo[index].UserName}}
                                                </el-button>
                                            </el-col>
                                            <el-col :span="12"></el-col>
                                            <el-col :span="6">
                                                <span style="font-size:12px;color:grey;">
                                                    {{article.create_time}}
                                                </span>
                                            </el-col>
                                        </el-row>
                                        <!-- <div> -->
                                            <el-button type="text" class="title content" @click="tDetail(article.tid)">
                                                {{article.title}}
                                            </el-button>
                                        <!-- </div> -->
                                        <div class="content" style="margin:0 20px 6px 20px">
                                            {{article.content}}
                                        </div>
                                        <div>
                                            <el-image
                                                fit="contain"
                                                style="height:100px;width:100%"
                                                :src="url + article.cover" 
                                                :preview-src-list="[url + article.cover]">
                                            </el-image>
                                        </div>
                                        <el-divider></el-divider>
                                        <el-row type="flex" align="middle" justify="space-around">
                                            <el-col :span="14">
                                                <el-button size="mini" round @click="goTopic(article.topic)">
                                                    {{article.topic}}
                                                </el-button>
                                            </el-col>
                                            <el-col :span="3">
                                                <el-button type="text" style="width:100%" icon="el-icon-zan0">
                                                    {{zanCntList[index]}}
                                                </el-button>
                                            </el-col>
                                            <el-col :span="3">
                                                <el-button type="text" style="width:100%" icon="el-icon-star-off">
                                                    {{bookCntList[index]}}
                                                </el-button>
                                            </el-col>
                                            <el-col :span="3">
                                                <el-button type="text" style="width:100%" icon="el-icon-chat-dot-round" @click="tDetail(article.tid)">
                                                    {{commentCntList[index]}}
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="用户" name="seek_user">
                                    <el-card v-for="(user, index) in userlist" :key="index" shadow="nerver" style="margin-top:20px">
                                        <el-row type="flex" align="middle">
                                            <el-col :span="3">
                                                <el-avatar :size="60" style="" :src="headUrl+user.avatar"></el-avatar>
                                            </el-col>
                                            <el-col :span="14">
                                                <el-button type="text" class="name" @click="visit(user.user_name)">
                                                    {{user.user_name}}
                                                </el-button>
                                                <div class="content" style="font-size:14px">
                                                    {{user.sign}}
                                                </div>
                                            </el-col>
                                            <el-col :span="4"></el-col>
                                            <el-col :span="4">
                                                <el-button round @click="subscribe">
                                                    关注
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-tab-pane>
                            </el-tabs>
                            <!-- </div> -->
                            <el-divider class="only">
                                <span style="color:lightgrey">没有更多数据了</span>
                            </el-divider>
                        </el-card>
                    </el-col>
                    <el-col :span="2"></el-col>
                </el-row>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>
        <el-backtop :visibility-height="120" :right="120" :bottom="180">
            <i class="el-icon-s-promotion"></i>
        </el-backtop>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from './MyFooter.vue'
import Navigation from './Navigation'
import axios from 'axios'
import {mapState} from 'vuex'
    export default {
        computed:{
            keyword:{
                get(){
                    return this.$store.state.search.keyword
                },
                set(val){
                    this.$store.commit('setkey', val)
                }
            },
            ...mapState({
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
            })
        },
        components: {
            Navigation,
            MyFooter,
        },
        data() {
            return {
                // input: '',
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                url: 'http://localhost:8090/article/getcover?cover=',
                activeName: 'seek_article',
                articlelist: [],
                articleInfo: [],
                commentCntList: [],
                zanCntList: [],
                bookCntList: [],
                userlist: [],
                mode: "article", //搜索模式：帖子/用户
            }
        },
        mounted(){
            this.search()
        },
        methods: {
            search(val){
                this.$store.commit('search', {mode: this.mode, keyword: this.keyword})
                axios.get("http://localhost:8090/search", {
                    params: {
                        keyword: this.keyword,
                        mode: this.mode
                    }
                }).then(res => {
                    // console.log(res.data)
                    this.articlelist = res.data.articlelist
                    if (this.articlelist != null)
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
                    this.articleInfo = res.data.articleInfo
                    this.userlist = res.data.userlist
                })
            },
            handleClick(tab) {
                // console.log(this.$route.path.split("=")[1])
                if (tab.name == "seek_article"){
                    this.mode = "article"
                }else if (tab.name == "seek_user"){
                    this.mode = "user"
                }
                this.search()
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
            goTopic(val) {
                this.$router.push('/topic/' + val)
            },
            zan(val){},
            subscribe(e){
                console.log(e)
                // let target = e.target;
                // // 根据button组件内容 里面包括一个span标签，如果设置icon，则还包括一个i标签，其他情况请自行观察。
                // // 所以，在我们点击到button组件上的文字也就是span标签上时，直接执行e.target.blur()不会生效，所以要加一层判断。
                // if(target.nodeName == 'SPAN' || target.nodeName == 'I'){
                //     target = e.target.parentNode;
                // }
                // target.blur()
            },
            unsubscribe(val){}
        },
    }
</script>

<style scoped>
/* :focus{
    去除获得焦点时的方框，在scoped下无法生效
    outline: 0;
} */
.search_bg{
    background-color: #E9EEF3;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
.only.el-divider--horizontal{
    margin: 40px 0 20px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
}
.name{
    color: #333;
    font-size: 15px;
    font-weight: bold;
}
.name:hover{
    color: #409EFF;
}
.title{
    color: black;
    font-size: 16px;
    font-weight: bolder;
    padding: 4px 20px;
}
.title:hover{
    color: #409EFF;
}
</style>