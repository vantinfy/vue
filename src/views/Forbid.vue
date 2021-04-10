<template>
    <div>
        <navigation></navigation>
        <el-row style="margin-top:60px;background-color:#E9EEF3;text-align:center;" type="flex" justify="space-around">
            <el-col :span="3"></el-col>
            <el-col :span="18">
                <el-card style="margin:30px 0;" shadow="never">
                    <h3>抱歉，发布该帖子的用户还在封禁中，内容不便展示...</h3>
                    <el-button type="primary" @click="goBack" size="medium">
                        返回
                    </el-button>
                    <el-divider>
                        <span style="color:lightgrey">
                            去别的用户空间看看吧
                        </span>
                    </el-divider>
                    <el-button type="text" style="padding:0" @click="visit(user.user_name)">
                        <div style="margin:20px 0 10px 0">
                            <el-avatar :size="120" style="" :src="headUrl + user.avatar"></el-avatar>
                        </div>    
                    </el-button>
                    
                    <div style="margin-bottom:10px">
                        {{user.user_name}}
                    </div>
                    <el-button type="" size="medium" @click="change" icon="el-icon-refresh">
                        换一个
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
        mounted(){
            axios.get(this.api + 'randUser',{
                params:{
                    uid: this.$router.currentRoute.path.split("/")[1]
                }
            }).then(res => {
                this.user = res.data.randUser
            })
        },
        data() {
            return {
                headUrl: this.api + 'user/getavatar?username=',
                user: '' // 用这个过滤掉被封禁的用户的帖子？或者这个页面展示别的用户好了
            }
        },
        methods: {
            goBack() {
                this.$router.go(-2) // 与404页面不同，这里要-2,返回上上页，不然就会无限重定向到本页
            },
            change() {
                this.reload()
            },
            visit(val){
                if (val == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', val)
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