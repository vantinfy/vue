<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span v-show="!visitmode">我的收藏列表</span>
                <span v-show="visitmode">Ta的收藏列表</span>
            </div>
            <el-card v-for="(book, index) in mybook" :key="index" shadow="nerver" style="margin-bottom:10px">
                <el-row type="flex" align="middle">
                    <el-col :span="2">
                        <el-avatar :size="30" style="" :src="headUrl + owner[index].avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="book" @click="visit(owner[index].user_name)">
                            {{owner[index].user_name}}
                        </el-button>
                    </el-col>
                    <el-col :span="14"></el-col>
                    <el-col :span="4">
                        <span style="font-size:12px;color:grey;">{{book.create_time.split(" ")[0]}}</span>
                    </el-col>
                </el-row>
                <div>
                    <el-button type="text" class="title content">
                        {{book.title}}
                    </el-button>
                </div>
                <div class="content" style="margin-bottom:4px" v-html="book.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')"></div>
                <el-image 
                    style="width: 30%;"
                    :src="url + book.cover"
                    :preview-src-list="[url + book.cover]">
                </el-image>
                <el-divider></el-divider>
                <el-row type="flex" align="middle" justify="space-around">
                    <el-col :span="14">
                        <el-button size="mini" round>
                            {{book.topic}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%" icon="el-icon-zan0">
                            {{bookCntList[index]}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%" icon="el-icon-star-off">
                            {{bookCntList[index]}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%" icon="el-icon-chat-dot-round">
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
            })
        },
        watch: {
            visitUser:{
                handler(newValue, oldValue) {
                    this.updateCurrent(newValue)
                },
                // immediate: true,  //刷新加载 立马触发一次handler
                deep: true  // 可以深度检测到 obj 对象的属性值的变化
            }
        },
        mounted () {
            if(this.$router.currentRoute.path.split("/")[1] == "visit"){
                this.visitmode = true
                this.current = this.visitUser.user_name
            }
            else{
                this.visitmode = false
                this.current = this.token.user_name
            }
            axios.get("http://localhost:8090/user/getmybook",{
                params:{
                    username: this.current
                }
            }).then(res =>{
                this.mybook = res.data.booklist
                this.owner = res.data.owner
                if (this.mybook != null)
                    for (let i = 0; i < this.mybook.length; i++){
                        if(this.mybook[i].comment != ""){
                            this.commentCntList[i] = this.mybook[i].comment.split("-").length
                        }else{
                            this.commentCntList[i] = 0
                        }
                        if(this.mybook[i].zan != ""){
                            this.zanCntList[i] = this.mybook[i].zan.split("-").length
                        }else{
                            this.zanCntList[i] = 0
                        }
                        
                        if(this.mybook[i].book != ""){
                            this.bookCntList[i] = this.mybook[i].book.split("-").length
                        }else{
                            this.bookCntList[i] = 0
                        }
                    }
            })
        },
        data() {
            return {
                mybook: [],
                owner: [],
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                url: 'http://localhost:8090/article/getcover?cover=',
                // srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                visitmode: false,
                current: '',
                visitmode: false,
                commentCntList: [],
                zanCntList: [],
                bookCntList: [],
            }
        },
        methods:{
            visit(val){
                axios.get("http://localhost:8090/user/visitspace", {
                    params:{
                        username: val
                    }
                }).then(res => {
                    this.$store.commit('updateVisitUser', res.data.visit_user)
                })
                this.$store.commit('myPost', {visit: true, token: this.visitUser})
            },
            updateCurrent(val) {
                this.current = val
                axios.get("http://localhost:8090/user/getmypost",{
                    params:{
                        uid: this.current.uid
                    }
                }).then(res =>{
                    this.mypost = res.data.postlist
                })
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
.book{
    color:black;
    font-size:14px;
    font-weight:bolder
}
.book:hover{
    color:#409EFF
}
.title{
    color:black;
    /* margin:5px 0; */
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