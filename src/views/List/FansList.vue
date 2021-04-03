<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span v-show="!visitmode">我的粉丝</span>
                <span v-show="visitmode">Ta的粉丝</span>
            </div>
            <el-card v-for="(fan, index) in fanslist" :key="index" shadow="nerver" style="margin-bottom:10px">
                <el-row type="flex" align="middle">
                    <el-col :span="3">
                        <el-avatar :size="60" style="" :src="headUrl + fan.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="fans" @click="visit(fan.user_name)">
                            {{fan.user_name}}
                        </el-button>
                        <div class="content" style="font-size:14px">
                            {{fan.sign}}
                        </div>
                    </el-col>
                    <el-col :span="14"></el-col>
                    <el-col :span="4">
                        <el-button round>
                            关注
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
        }),
        data(){
            return{
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                fanslist: [],
                currrent: '',
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
            if(this.$router.currentRoute.path.split("/")[1] == "visit"){
                this.current = this.visitUser
                this.visitmode = true
            }
            else{
                this.currrent = this.token
                this.visitmode = false
            }
            axios.get("http://localhost:8090/user/getfans",{
                params:{
                    username: this.currrent.user_name
                }
            }).then(res => {
                this.fanslist = res.data.fanslist
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
.fans{
    color:black;
    font-size: 18px;
    font-weight: bolder
}
.fans:hover{
    color:#409EFF;
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 40px 0 20px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>