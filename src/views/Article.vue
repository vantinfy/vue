<template>
    <div>
        <navigation></navigation>

        <el-row :gutter="0" type="flex" justify="space-around" style="margin-top:60px;padding-top:30px;background-color:#E9EEF3">
            <el-col :span="3"></el-col>
            <el-col :span="2" style="text-align:center;" align="middle">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan0">
                            {{zanCnt}}
                        </el-button>
                    </el-card>
                    <el-divider></el-divider>
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-off">
                            {{bookCnt}}
                        </el-button>
                    </el-card>
                    <el-divider></el-divider>
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-chat-dot-round">
                            {{commentCnt}}
                        </el-button>
                    </el-card>
                    <el-divider v-show="!visitmode"></el-divider>
                    <el-card v-show="!visitmode" shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-setting"></el-button>
                    </el-card>
                </el-card>
            </el-col>

            <el-col :span="10">
                <el-card shadow="never">
                    <div class="title">
                        {{article.title}}
                    </div>
                    <!-- <el-card shadow="never">data</el-card> -->
                    <el-divider>
                        {{article.create_time}}
                    </el-divider>
                    <!-- <div style="text-align:center;margin-top:20px"> -->
                        <el-image
                            fit="contain"
                            style="height:144px;width:100%;margin-top:20px"
                            :src="url + article.cover" 
                            :preview-src-list="[url + article.cover]">
                        </el-image>
                    <!-- </div> -->
                    <div class="details" v-html="article.content" style="height:auto;"></div>
                    <div style="text-align:right">
                        <el-button type="text" style="color:grey" icon="el-icon-report">举报</el-button>
                    </div>

                    <el-divider></el-divider>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan0">
                                {{zanCnt}}
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-off">
                                {{bookCnt}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card shadow="never" style="margin-top:20px;padding:10px">
                    <div style="color:lightgrey;margin-bottom:10px">友善评论是交流的起点哦(๑・ω-)～</div>
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="300"
                        show-word-limit
                        :autosize="{ minRows: 6, maxRows: 6}"
                        >
                    </el-input>
                    <el-button type="primary" style="margin-top:10px;float:right">提交</el-button>
                </el-card>

                <el-card shadow="never" style="margin:20px 0 30px;padding:10px">
                    <div slot="header">
                        <span style="font-weight:bolder">全部评论</span>
                    </div>
                    <el-card v-for="(comment, index) in commentlist" :key="index" shadow="never" style="margin-bottom:10px">
                        <el-row>
                            <el-col :span="3">
                                <el-avatar :size="40" style="" :src="headUrl + comment.avatar"></el-avatar>
                            </el-col>
                            <el-col :span="21">
                                <el-row>
                                    <el-col :span="13">
                                        <el-button class="commentName" type="text" @click="visit(comment.user_name)">
                                            {{comment.user_name}}
                                        </el-button>
                                    </el-col>
                                    <el-col :span="9">
                                        <span style="font-size:12px;color:grey">
                                            {{comment.create_time}}
                                        </span>
                                    </el-col>
                                    <el-col :span="2">
                                        <span style="font-size:12px;color:grey">
                                            #{{comment.order}}
                                        </span>
                                    </el-col>
                                </el-row>
                                <!-- <el-divider></el-divider> -->
                                <div style="margin:10px 0;font-size:14px">
                                    {{comment.content}}
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-card>
            </el-col>
            
            <el-col :span="5">
                <el-card shadow="never" style="margin-bottom:20px">
                    <el-row type="flex" align="middle">
                        <el-col :span="10">
                            <el-avatar :size="80" fit="cover" :src="headUrl+owner.avatar"></el-avatar>
                        </el-col>
                        <el-col :span="14">
                            <!-- <div class="name"> -->
                                <el-button class="name" type="text" @click="visit(owner.user_name)">
                                    {{owner.user_name}}
                                </el-button>
                            <!-- </div> -->
                            <div class="sign">
                                {{owner.sign}}
                            </div>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card shadow="never" style="">
                    <div slot="header">
                        <span style="font-weight:bolder">所属话题</span>
                    </div>
                    <el-button type="text" style="width:100%;font-size:16px" @click="goTopic(article.topic)">
                        {{article.topic}}
                    </el-button>
                </el-card>
            </el-col>
            <el-col :span="3"></el-col>
        </el-row>

        <el-backtop :visibility-height="120" :right="120" :bottom="120">
            <i class="el-icon-s-promotion"></i>
        </el-backtop>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Navigation from './Navigation'
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
            // console.log(this.token=="")
            axios.get("http://localhost:8090/article/getcontent",{
                params: {
                    tid: this.$router.currentRoute.path.split("/")[2]
                }
            }).then(res => {
                // console.log(res.data)
                this.article = res.data.article
                this.owner = res.data.owner
                // 封禁用户的帖子不展示或重定向到另一个页面
                // if(this.token.user_name == this.owner.user_name)
                if(new Date(this.owner.state.replace(/-/g, '/')).getTime() > new Date().getTime()){
                    this.$router.push('/' + this.owner.uid + '/forbid')
                    return
                }
                this.commentlist = res.data.commentlist
                if (this.article.comment != '')
                    this.commentCnt = this.article.comment.split("-").length
                if (this.article.zan != '')
                    this.zanCnt = this.article.zan.split("-").length
                if (this.article.book != '')
                    this.bookCnt = this.article.book.split("-").length
                if (this.commentlist != null) // 有评论的话
                    this.commentlist.forEach((key, index) => {
                        key.order = index + 1
                    })
            })
            if (this.token == '' || this.owner.user_name != this.token.user_name)
                this.visitmode = true
            else
                this.visitmode = false
            // this.url = 'http://localhost:8090/article/getcover?cover='
        },
        data() {
            return{
                url: 'http://localhost:8090/article/getcover?cover=',
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                textarea: '',
                visitmode: '',
                article: {
                    cover: '',
                },
                owner:'',
                owner: {
                    avatar: '',
                },
                commentlist: '',
                commentCnt: 0,
                zanCnt: 0,
                bookCnt: 0,
            }
        },
        methods: {
            goTopic(val) {
                this.$router.push('/topic/' + val)
            },
            visit(val){
                if (val == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', val)
            },
            submitComment(){ // 提交评论
                if (new Date(this.token.state.replace(/-/g, '/')).getTime() > new Date().getTime()){
                    alert("您因为违规行为已被临时封禁，具体恢复时间请到个人空间查看\n如对封禁有异议亦可在个人空间申诉")
                    this.newArticle = false
                    return
                }
                let params = new FormData()
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                axios.post('http://localhost:8090/comment/submitcomment', params, config).then(res => {
                    console.log(res)
                })
            }
        },
    }
</script>

<style scoped>
.card{
    border:none;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 2px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
 .title{
     /* 上-左右-下 */
     margin: 10px 0 20px;
     padding-left: 20px;
     font-size: 20px;
     font-weight: bolder;
 }
 .details{
     padding:0 16px;
     margin: 4px 0;
 }
.name{
    /* margin-bottom: 10px; */
    font-size: 20px;
    font-weight: bolder;
    color: black
}
.name:hover{
    color:#409EFF
}
.commentName{
    font-weight:bolder;
    padding:0;
    color:black
}
.commentName:hover{
    color: #409EFF
}
.sign{
    font-size: 14px;
}
</style>