<template>
    <div>
        <navigation></navigation>
        <el-row style="margin-top:60px;background-color:#E9EEF3;text-align:center;" type="flex" justify="space-around">
            <el-col :span="3"></el-col>
            <el-col :span="18">
                <el-card style="margin:30px 0;" shadow="never">
                    <h3>非常抱歉，页面找不到了orz...</h3>
                    <el-button type="primary" @click="goBack" size="medium">
                        返回上一页
                    </el-button>
                    <el-divider>
                        <span style="color:grey">
                            随便看看
                        </span>
                    </el-divider>
                    <el-image
                        fit="contain"
                        style="height:240px;width:100%;margin:10px 0"
                        :src="url + article.cover" 
                        :preview-src-list="[url + article.cover]">
                        <div slot="error" style="background-color:lightgrey;line-height:240px">
                            <!-- 图片加载失败时候的提示 -->
                            出错啦，刷新试试吧
                        </div>
                    </el-image>
                    <el-button type="" size="medium" @click="change" icon="el-icon-refresh">
                        换一篇
                    </el-button>
                    <el-button type="primary" size="medium" @click="tDetail(article.tid)">
                        去看看 >>
                    </el-button>
                </el-card>
            </el-col>
            <el-col :span="3">
            </el-col>
        </el-row>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Navigation from './Navigation'
import MyFooter from './MyFooter'
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        inject: ['reload'],
        components: {
            Navigation,
            MyFooter,
        },
        computed: {
            ...mapState({
                token: state => state.users.token,
            }),
        },
        watch:{
            article:{
                handler(newV, oldV){
                    // console.log(newV, oldV)
                    this.article.cover = newV.cover
                },
                deep: true
            }
        },
        mounted(){
            axios.get('http://localhost:8090/randArticle').then(res => {
                this.article = res.data.randArticle
            })
        },
        data() {
            return {
                url: 'http://localhost:8090/article/getcover?cover=',
                article: {
                    cover: '',
                },
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            change() {
                this.reload()
            },
            tDetail(val){
                this.$router.push('/article/' + val)
            },
        },
    }
</script>

<style scoped>
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 18px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>