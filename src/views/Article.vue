<template>
    <div>
        <navigation></navigation>

        <el-row :gutter="0" type="flex" justify="space-around" style="margin-top:60px;padding-top:30px;background-color:#E9EEF3">
            <el-col :span="3"></el-col>
            <el-col :span="2" style="text-align:center;" align="middle">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan0" @click="zan(article)" v-if="!iszan">
                            {{zanlist.length}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan" @click="cancelZan(article)" v-if="iszan">
                            {{zanlist.length}}
                        </el-button>
                    </el-card>
                    <el-divider></el-divider>
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:22px" icon="el-icon-star-off" @click="book(article)" v-if="!isbook">
                            {{booklist.length}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:22px" icon="el-icon-star-on" @click="cancelBook(article)" v-if="isbook">
                            {{booklist.length}}
                        </el-button>
                    </el-card>
                    <el-divider></el-divider>
                    <el-card shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-chat-dot-round">
                            {{commentlist.length}}
                        </el-button>
                    </el-card>
                    <div v-show="!visitmode">
                        <el-divider></el-divider>
                    </div>
                    <el-card v-show="!visitmode" shadow="never" class="card">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-setting" @click="alter(article)"></el-button>
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
                    <div style="text-align:center;margin-top:20px">
                        <el-image
                            fit=""
                            style="height:auto;width:auto;"
                            :src="url + article.cover"
                            :preview-src-list="[url + article.cover]">
                        </el-image>
                    </div>
                    <el-divider></el-divider>
                    <div class="details" v-html="article.content" style="height:auto;"></div>
                    <div style="text-align:right" v-if="this.token">
                        <el-button type="text" style="color:grey" icon="el-icon-report" @click="articleReportView = true">举报</el-button>
                    </div>

                    <el-divider></el-divider>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan0" @click="zan(article)" v-if="!iszan">
                                {{zanlist.length}}
                            </el-button>
                            <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-zan" @click="cancelZan(article)" v-if="iszan">
                                {{zanlist.length}}
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" style="width:100%;font-size:22px" icon="el-icon-star-off" @click="book(article)" v-if="!isbook">
                                {{booklist.length}}
                            </el-button>
                            <el-button type="text" style="width:100%;font-size:22px" icon="el-icon-star-on" @click="cancelBook(article)" v-if="isbook">
                                {{booklist.length}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card shadow="never" style="margin-top:20px;padding:10px">
                    <div style="color:lightgrey;margin-bottom:10px">友善评论是交流的起点哦(๑・ω-)～</div>
                    <el-input
                        type="textarea"
                        placeholder="登录后才能评论∑(￣□￣)"
                        v-show="!isLogin"
                        maxlength="300"
                        show-word-limit
                        :disabled="true"
                        :autosize="{ minRows: 6, maxRows: 6}"
                        >
                    </el-input>
                    <div>
                        <div id="articleE" v-show="isLogin"></div>
                    </div>
                    <!-- <div v-html="text" class="commentFutext"></div> -->
                    <!-- {{text}} -->
                    <el-button type="primary" style="margin-top:10px;float:right" @click="submitComment" v-show="isLogin">提交</el-button>
                </el-card>

                <el-card shadow="never" style="margin:20px 0 30px;padding:10px">
                    <div slot="header">
                        <span style="font-weight:bolder">全部评论</span>
                    </div>
                    <el-card v-for="(comment, index) in commentlist" :key="index" shadow="never" style="margin-bottom:10px">
                        <el-row>
                            <el-col :span="3">
                                <el-avatar :size="40" style="" :src="headUrl + comment.uid"></el-avatar>
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
                                        <el-popover
                                            placement="top"
                                            width="150"
                                            v-model="commentOperate[index]"
                                            v-if="token != ''">
                                            <div style="text-align:center" >
                                                <el-button type="text" style="padding:0" v-if="token.user_name == comment.user_name || token.level > 0" @click="deleteComment(comment)">
                                                    删除
                                                </el-button>
                                            </div>
                                            <div style="text-align:center" v-if="token != '' && token.user_name != comment.user_name" @click="reportComment = comment.cid, commentReportView = true">
                                                <el-button type="text" style="padding:0">
                                                    举报
                                                </el-button>
                                            </div>
                                            <el-button slot="reference" type="text" style="color:black">···</el-button>
                                        </el-popover>
                                    </el-col>
                                </el-row>
                                <!-- <el-divider></el-divider> -->
                                <div style="margin:10px 0;font-size:14px" v-html="comment.content" class="commentFutext">
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
                            <el-avatar :size="80" fit="cover" :src="'http://localhost:8090/user/getavatar?username='+owner.avatar"></el-avatar>
                        </el-col>
                        <el-col :span="14">
                            <!-- <div class="name"> -->
                                <el-button class="name" type="text" @click="visit(owner.user_name)">
                                    {{owner.user_name}}
                                </el-button>
                            <!-- </div> -->
                            <div class="sign" v-show="token.user_name != owner.user_name">
                                <el-button size="small">关注</el-button>
                                <el-button size="small" type="primary">取消关注</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card shadow="never" style="margin-bottom:20px" v-show="owner.sign!=''">
                    <div class="sign" style="margin:10px 0">
                        {{owner.sign}}
                    </div>
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

        <div>
            <el-dialog :visible.sync="articleReportView">
                <el-input
                    type="textarea"
                    placeholder="举报理由"
                    v-model="reason"
                    maxlength="300"
                    show-word-limit
                    :autosize="{ minRows: 6, maxRows: 6}"
                    >
                </el-input>
                <div slot="footer">
                    <el-button @click="articleReportView = false">取 消</el-button>
                    <el-button type="primary" @click="report('article')">提 交</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="commentReportView">
                <el-input
                    type="textarea"
                    placeholder="举报理由"
                    v-model="reason"
                    maxlength="300"
                    show-word-limit
                    :autosize="{ minRows: 6, maxRows: 6}"
                    >
                </el-input>
                <div slot="footer">
                    <el-button @click="commentReportView = false">取 消</el-button>
                    <el-button type="primary" @click="report('comment')">提 交</el-button>
                </div>
            </el-dialog>
        </div>

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
import E from "wangeditor"
    export default {
        inject:['reload'],
        components:{
            Navigation,
            E,
            MyFooter
        },
        computed: {
            ...mapState({
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
            })
        },
        watch:{
            editor:{
                handler(newV, old){
                    this.text = newV.txt.html()
                },
                deep:true
            },
        },
        mounted() {
            this.editor = new E('#articleE')
            this.editor.config.menus = [
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'link',  // 插入链接
                'quote',  // 引用
                'emoticon',  // 表情
            ]
            this.editor.config.showLinkImg = false
            this.editor.config.uploadImgShowBase64 = true
            this.editor.config.uploadImgMaxSize = 15 * 1024 * 1024
            this.editor.config.zIndex = 1
            this.editor.config.showFullScreen = false
            this.editor.create()
            if(this.token == ''){ // 没有登录的话禁用富文本编辑器——评论框
                this.isLogin = false
                this.editor.$textElem.attr('contenteditable', false)
            }
            else{
                this.isLogin = true
                this.editor.$textElem.attr('contenteditable', true)
            }
            axios.get("http://localhost:8090/article/getcontent",{
                params: {
                    tid: this.$router.currentRoute.path.split("/")[2],
                    visit_uid: this.token.uid
                }
            }).then(res => {
                // console.log(res.data)
                if (res.data.notFound == true){ // 输入不存在的帖子id重定向
                    this.$router.push('/notFound')
                    return
                }
                this.article = res.data.article
                this.commentlist = res.data.commentlist
                this.booklist = res.data.booklist
                this.zanlist = res.data.zanlist
                this.iszan = res.data.iszan
                this.isbook = res.data.isbook
                if(this.booklist == null)
                    this.booklist = []
                if(this.zanlist == null)
                    this.zanlist = []
                this.owner = res.data.owner
                if (this.token == '' || this.owner.user_name != this.token.user_name)
                    this.visitmode = true
                else
                    this.visitmode = false
                // 封禁用户的帖子不展示或重定向到另一个页面（只有原贴发布者可以查看）
                if(new Date(this.owner.state.replace(/-/g, '/')).getTime() > new Date().getTime() && this.token.user_name != this.owner.user_name ){
                    this.$router.push('/' + this.owner.uid + '/forbid')
                    return
                }
                if (this.commentlist != null){ // 有评论的话
                    this.commentlist.forEach((key, index) => {
                        key.order = index + 1
                        this.commentOperate.push(false)
                    })
                }else{
                    this.commentlist = []
                }
            })
            // this.url = 'http://localhost:8090/article/getcover?cover='
        },
        data() {
            return{
                url: 'http://localhost:8090/article/getcover?cover=',
                headUrl: 'http://localhost:8090/user/getavatar?uid=',
                reason: '',
                visitmode: '',
                article: {
                    cover: '',
                },
                owner: '',
                owner: {
                    avatar: '',
                },
                commentlist: [],
                zanlist: [],
                iszan:'',
                isbook:'',
                booklist: [],
                editor: '',
                text: '',
                isLogin: false, // 判断是否已经登录
                commentOperate: [], // 对用户评论操作——举报/删除
                commentReportView: false,
                reportComment: '', // 记录具体要举报的是哪一个用户的评论
                articleReportView: false,
                config: {
                    headers:{'Content-Type':'multipart/form-data'}
                }
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
            zan(article){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                axios.get('http://localhost:8090/article/zan', {
                    params: {
                        uid: this.token.uid,
                        tid: article.tid,
                        owner_uid: article.uid,
                        user_name: this.token.user_name
                    }
                })
                this.zanlist.push("...")
                this.iszan = true
            },
            cancelZan(article){
                axios.get('http://localhost:8090/article/cancelzan', {
                    params: {
                        uid: this.token.uid,
                        tid: article.tid,
                        owner_uid: article.uid,
                    }
                })
                this.zanlist.pop()
                this.iszan = false
            },
            book(article){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                axios.get('http://localhost:8090/article/book', {
                    params: {
                        uid: this.token.uid,
                        tid: article.tid,
                        owner_uid: article.uid,
                        user_name: this.token.user_name
                    }
                }).then(res => {
                    console.log(res)
                })
                this.booklist.push("...")
                this.isbook = true
            },
            cancelBook(article){
                axios.get('http://localhost:8090/article/cancelbook', {
                    params: {
                        uid: this.token.uid,
                        tid: article.tid,
                        owner_uid: article.uid,
                    }
                })
                this.booklist.pop()
                this.isbook = false
            },
            submitComment(){ // 提交评论
                if (new Date(this.token.state.replace(/-/g, '/')).getTime() > new Date().getTime()){
                    alert("您因为违规行为已被临时封禁，具体恢复时间请到个人空间查看\n如对封禁有异议亦可在个人空间申诉")
                    this.newArticle = false
                    return
                }
                if(this.editor.txt.text().replace(/&nbsp;/g, "") == ''){
                    this.$message.warning("评论内容不能全为空哦")
                    return
                }
                let params = new FormData()
                params.append("uid", this.token.uid)
                params.append("user_name",this.token.user_name)
                params.append("tid", this.article.tid)
                params.append("comment", this.editor.txt.html())
                params.append("target_uid", this.owner.uid)
                axios.post('http://localhost:8090/notice/submitcomment', params, this.config).then(res => {
                    if(res.data.successComment){
                        this.$message.success(res.data.msg)
                        this.reload()
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            deleteComment(comment){ // 删除评论
                let params = new FormData()
                params.append("cid", comment.cid)
                params.append("tid", comment.tid)
                params.append("uid", comment.uid)
                if(comment.user_name == this.token.user_name)
                    params.append("active", true) // 用户主动删除
                else{
                    params.append("active", false)
                    params.append("user_name", this.token.user_name)
                }
                axios.post('http://localhost:8090/notice/deletecomment', params, this.config).then(res => {
                    if(res.data.deleteComment){
                        this.$message.success(res.data.msg)
                        this.reload()
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            report(type){ // 举报帖子或评论
                if (this.reason.replace(/\s|\s/g,'') == ''){
                    this.$message.warning("理由不能为空")
                    return
                }
                let params = new FormData()
                params.append("user_name", this.token.user_name)
                params.append("uid", this.token.uid)
                params.append("type", type)
                if (type == 'article')
                    params.append("tid", this.article.tid)
                else
                    params.append("cid", this.reportComment)
                params.append("reason", this.reason)
                axios.post('http://localhost:8090/notice/report',params,this.config).then(res => {
                    if(res.data.isReported){
                        this.$message.success(res.data.msg)
                    }
                    else{
                        this.$message.error(res.data.msg)
                    }
                    this.articleReportView = false
                    this.commentReportView = false
                })
            },
            alter(val){ // 发布者可以修改帖子
                let form = {
                    title: val.title,
                    topic: val.topic,
                    content: '',
                    cover: val.cover,
                    isNewArticle: val.tid,
                }
                axios.get('http://localhost:8090/article/getcontent',{
                    params:{
                        tid: val.tid
                    }
                }).then(res => {
                    form.content = res.data.article.content
                })
                this.$store.commit('setDraftForm', form)
                this.$router.push('/article/modify')
            },
        },
    }
</script>

<style type="text/css">
.card{
    border:none;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 2px 0;
     background: 0 0;
     border-top: 1px solid #d6d8da;
 }
 .title{
     /* 上-左右-下 */
     margin: 10px 0 20px;
     padding-left: 20px;
     font-size: 20px;
     text-align: center;
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
#articleE .w-e-text-container{
    height: 200px !important;
}
</style>