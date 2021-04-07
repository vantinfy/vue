<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span v-show="!visitmode">我的关注列表</span>
                <span v-show="visitmode">Ta的关注列表</span>
            </div>
            <el-card v-for="(user, index) in followlist" :key="index" shadow="nerver" style="margin-bottom:10px">
                <el-row type="flex" align="middle">
                    <el-col :span="3">
                        <el-avatar :size="60" style="" :src="headUrl + user.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="follow" @click="visit(user.user_name)">
                            {{user.user_name}}
                        </el-button>
                        <div class="content" style="font-size:14px">
                            {{user.sign}}
                        </div>
                    </el-col>
                    <el-col :span="14"></el-col>
                    <el-col :span="4">
                        <el-button round>
                            已关注
                        </el-button>
                    </el-col>
                </el-row>
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
        computed:mapState({
            token: state => state.users.token,
            visitUser: state => state.users.visitUser,
            visitMode: state => state.users.visitMode,
        }),
        data(){
            return{
                headUrl:"http://localhost:8090/user/getavatar?username=",
                followlist: [],
                current: '',
                visitmode: false,
            }
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
        mounted(){
            if(this.$router.currentRoute.params.uid == this.token.uid){
                this.current = this.token.user_name
                this.visitmode = false
            }
            else{
                this.current = this.visitUser.user_name
                this.visitmode = true
            }
            axios.get("http://localhost:8090/user/getmyfollow",{
                params:{
                    username: this.current
                }
            }).then(res =>{
                this.followlist = res.data.followlist
                if (this.followlist != null)
                    this.followlist.reverse()
            })
        },
        methods:{
            visit(val){
                this.$store.dispatch('visit', val)
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
        }
    }
</script>

<style scoped>
.box-card{
    margin-bottom: 40px
}
.follow{
    color:black;
    font-size: 18px;
    font-weight: bolder;
}
.follow:hover{
    color:#409EFF;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 40px 0 20px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>