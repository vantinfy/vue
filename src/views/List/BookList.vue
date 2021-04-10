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
                        <el-avatar :size="30" style="" :src="headUrl + book.Avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="book" @click="visit(book.UserName)">
                            {{book.UserName}}
                        </el-button>
                    </el-col>
                    <el-col :span="12"></el-col>
                    <el-col :span="6">
                        <span style="font-size:12px;color:grey;">收藏于{{book.BookTime.split(" ")[0]}}</span>
                    </el-col>
                </el-row>
                <div>
                    <el-button type="text" class="title content" @click="tDetail(book.Article.tid)">
                        {{book.Article.title}}
                    </el-button>
                </div>
                <div class="content" style="margin-bottom:4px" v-html="book.Article.content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')"></div>
                <el-image 
                    style="width: 30%;"
                    :src="url + book.Article.cover"
                    :preview-src-list="[url + book.Article.cover]">
                </el-image>
                <el-divider></el-divider>
                <el-row type="flex" align="middle" justify="space-around">
                    <el-col :span="14">
                        <el-button size="mini" round>
                            {{book.Article.topic}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan" @click="cancelZan(book,index)" v-if="book.IsZan">
                            {{book.ZanCount}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:18px;" icon="el-icon-zan0" @click="zan(book,index)" v-if="!book.IsZan">
                            {{book.ZanCount}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-on" @click="cancelBook(book,index)" v-if="book.IsBook">
                            {{book.BookCount}}
                        </el-button>
                        <el-button type="text" style="width:100%;font-size:20px" icon="el-icon-star-off" @click="Book(book,index)" v-if="!book.IsBook">
                            {{book.BookCount}}
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" style="width:100%;font-size:18px" icon="el-icon-chat-dot-round"  @click="tDetail(book.Article.tid)">
                            {{book.CommentCount}}
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
                this.current = this.visitUser
            }
            else{
                this.visitmode = false
                this.current = this.token
            }
            this.updateCurrent(this.current)
            // axios.get(this.api + "user/getmybook",{
            //     params:{
            //         uid: this.current.uid,
            //         visit_uid:this.token.uid,
            //     }
            // }).then(res =>{
            //     // console.log(res.data)
            //     this.mybook = res.data.booklist
            //     // if(this.mybook != null)
            //     //     this.mybook.forEach(val => {
            //     //         if (val.ZanList == null)
            //     //             val.ZanList = []
            //     //         if (val.BookList == null)
            //     //             val.BookList = []
            //     //         if (val.CommentList == null)
            //     //             val.CommentList = []
            //     //     })
            // })
        },
        data() {
            return {
                mybook: [],
                owner: [],
                headUrl: this.api + 'user/getavatar?username=',
                url: this.api + 'article/getcover?cover=',
                // srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                visitmode: false,
                current: '',
                visitmode: false,
            }
        },
        methods:{
            visit(val){
                axios.get(this.api + "user/visitspace", {
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
                axios.get(this.api + "user/getmybook",{
                    params:{
                        uid: this.current.uid,
                        visit_uid: this.token.uid,
                    }
                }).then(res =>{
                    this.mybook = res.data.booklist
                })
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
                this.mybook[index].ZanList.push("...")
                this.mybook[index].IsZan = true
            },
            cancelZan(article,index){
                this.$store.commit('cancelZan',{article:article,token:this.token})
                this.mybook[index].ZanList.pop()
                this.mybook[index].IsZan = false
            },
            Book(article,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('book',{article:article,token:this.token})
                this.mybook[index].BookList.push("...")
                this.mybook[index].IsBook = true
            },
            cancelBook(article,index){
                this.$store.commit('cancelBook',{article:article,token:this.token})
                this.mybook[index].BookList.pop()
                this.mybook[index].IsBook = false
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