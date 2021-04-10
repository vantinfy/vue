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
                        <el-avatar :size="60" style="" :src="headUrl + fan.User.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="fans" @click="visit(fan.User.user_name)">
                            {{fan.User.user_name}}
                        </el-button>
                        <div class="content" style="font-size:14px">
                            {{fan.User.sign}}
                        </div>
                    </el-col>
                    <el-col :span="14"></el-col>
                    <el-col :span="4">
                        <el-button round @click="subscribe(fan,index)" v-if="!fan.IsFollowed">
                            关注
                        </el-button>
                        <el-button round type="primary" @click="unsubscribe(fan,index)" v-if="fan.IsFollowed">
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
            fanslist: state=>state.users.fanslist,
        }),
        data(){
            return{
                headUrl: this.api + 'user/getavatar?username=',
                // fanslist: [],
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
                this.current = this.token
                this.visitmode = false
            }
            // this.updateCurrent(this.currrent)
            axios.get(this.api + "user/getfollow",{
                params:{
                    uid: this.current.uid,
                    visit_uid: this.token.uid,
                    mode: 'fans'
                }
            }).then(res => {
                if(res.data.fanslist != null){
                    this.$store.commit('setFansCnt',res.data.fanslist.length)
                    this.$store.commit('setFanslist',res.data.fanslist)
                }else{
                    this.$store.commit('setFansCnt', 0)
                    this.$store.commit('setFanslist',[])
                }
            })
        },
        methods:{
            visit(val){
                this.$store.dispatch('visit', val)
            },
            updateCurrent(val) {
                this.current = val
                axios.get(this.api + "user/getfollow",{
                    params:{
                        uid: this.current.uid,
                        visit_uid: this.token.uid,
                        mode: 'fans'
                    }
                }).then(res => {
                    if(res.data.fanslist != null){
                        this.$store.commit('setFansCnt',res.data.fanslist.length)
                        this.$store.commit('setFanslist',res.data.fanslist)
                    }else{
                        this.$store.commit('setFansCnt', 0)
                        this.$store.commit('setFanslist',[])
                    }
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