<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span v-show="!visitmode">我的评论</span>
                <span v-show="visitmode">Ta的评论</span>
            </div>
            <el-card v-for="(comment, index) in commentlist" :key="index" shadow="nerver" style="margin-bottom:10px">
                <el-row type="flex" align="middle">
                    <el-col :span="20">
                        <i class="el-icon-time"></i>
                        <span style="margin-left:10px;font-size:14px;color:grey">
                            {{comment.Comment.create_time}}
                        </span>
                    </el-col>
                    <el-col :span="4" style="text-align:right;">
                        <el-popover
                            placement="right"
                            width="160"
                            v-model="deleteHint[index]"
                            v-show="token.uid == current.uid">
                            <div style="text-align: center; margin: 0">
                                <el-button type="text" size="mini" @click="delMyComment(comment, index)" style="padding:0;color:red;font-size:16px">删除</el-button>
                            </div>
                            <el-button type="text" slot="reference" style="font-size:16px;font-weight:bolder;color:black;padding:0">···</el-button>
                        </el-popover>
                    </el-col>
                </el-row>
                <el-button type="text" style="width:100%;text-align:left;color:#333;padding:0" @click="tDetail(comment.Article.tid)">
                    <div class="content" style="font-size:16px;font-weight:bolder;margin:10px 0;padding:4px 0">
                        {{comment.Comment.content.replace(/&lt;(\S*?)[^>]*>.*?|&lt;.*? \/>/g,'')}}
                    </div>
                    <div class="content" style="margin: 0 0 0 10px">
                        <blockquote>{{comment.Article.content.replace(/&lt;(\S*?)[^>]*>.*?|&lt;.*? \/>/g,'').replace(/&&&img&&&/g,'')}}</blockquote>
                    </div>
                </el-button>
            </el-card>
            <el-divider>
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
                ...mapState({
                    token: state => state.users.token,
                    visitUser: state => state.users.visitUser,
                })
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
        data() {
            return {
                commentlist: [],
                deleteHint: [],
                visitmode: false,
                current: '',
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
            // axios.get(this.api + 'user/getmycomment',{
            //     params:{
            //         uid: this.current.uid
            //     }
            // }).then(res => {
            //     console.log(this.token.uid, res.data)
            //     this.commentlist = res.data.commentlist
            //     if(this.commentlist != null)
            //         this.commentlist.forEach(val => {
            //             this.deleteHint.push(false)
            //         })
            // })
        },
        methods: {
            tDetail(val){
                this.$router.push('/details/' + val)
            },
            delMyComment(comment, index) {
                axios.get(this.api + 'user/delmycomment',{
                    params:{
                        cid: comment.Comment.cid
                    }
                }).then(res => {
                    if(res.data.isdelete)
                        this.reload()
                    else
                        this.$notify({
                            title: '网络好像出了点问题，稍后再试试吧',
                            type: 'error',
                            offset: 100
                        })
                })
            },
            updateCurrent(val){
                this.current = val
                axios.get(this.api + 'user/getmycomment',{
                    params:{
                        uid: this.current.uid
                    }
                }).then(res => {
                    this.commentlist = res.data.commentlist
                    if(this.commentlist != null)
                        this.commentlist.forEach(val => {
                            this.deleteHint.push(false)
                        })
                })
            },
        },
    }
</script>

<style scoped>
.box-card{
    margin-bottom: 40px
}
.content blockquote{
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    line-height: 1.2;
    font-size: 100%;
    background-color: #f2f6f9;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 40px 0 20px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>