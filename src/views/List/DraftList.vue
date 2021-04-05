<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>我的草稿</span>
            </div>
            <el-card v-for="(article, index) in mydraft" :key="index" shadow="nerver" style="margin-bottom:10px">
                <div>
                    <i class="el-icon-time"></i>
                    <span style="margin-left:10px;font-size:14px;color:grey">
                        {{article.create_time}}
                    </span>
                </div>
                <div>
                    <el-button type="text" class="title content" @click="alter(article)">
                        {{article.title}}
                    </el-button>
                </div>
                <div class="content" style="margin-bottom:4px" v-html="article.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')">
                </div>
                <el-image 
                    style="width: 30%;"
                    :src="url + article.cover" 
                    :preview-src-list="[url + article.cover]">
                </el-image>
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
        computed: {
            ...mapState({
                token: state => state.users.token,
                visitUser: state => state.users.visitUser,
                draftForm: state => state.articles.draftForm,
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
            axios.get("http://localhost:8090/user/getdraft",{
                params:{
                    uid: this.current.uid
                }
            }).then(res =>{
                this.mydraft = res.data.draftlist
                if(this.mydraft != null)
                    for (let i = 0; i < this.mydraft.length; i++){
                        if(this.mydraft[i].comment != ""){
                            this.commentCntList[i] = this.mydraft[i].comment.split("-").length
                        }else{
                            this.commentCntList[i] = 0
                        }
                        if(this.mydraft[i].zan != ""){
                            this.zanCntList[i] = this.mydraft[i].zan.split("-").length
                        }else{
                            this.zanCntList[i] = 0
                        }
                        
                        if(this.mydraft[i].book != ""){
                            this.bookCntList[i] = this.mydraft[i].book.split("-").length
                        }else{
                            this.bookCntList[i] = 0
                        }
                    }
            })
        },
        data() {
            return {
                mydraft: [],
                url: 'http://localhost:8090/article/getcover?cover=',
                // srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                visitmode: false,
                current: '',
                commentCntList: [],
                zanCntList: [],
                bookCntList: [],
            }
        },
        methods: {
            updateCurrent(val) {
                this.current = val
                axios.get("http://localhost:8090/user/getdraft",{
                    params:{
                        uid: this.current.uid
                    }
                }).then(res => {
                    this.mydraft = res.data.postlist
                })
            },
            alter(val){
                // console.log("jump start>>>>", val)
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
                this.$router.push('/newArticle')
                // console.log("jump done>>>>", val)
            },
            goTopic(val){
                this.$router.push('/topic/' + val)
            },
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