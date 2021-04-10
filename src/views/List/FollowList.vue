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
                        <el-avatar :size="60" style="" :src="headUrl + user.User.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="text" class="follow" @click="visit(user.User.user_name)">
                            {{user.User.user_name}}
                        </el-button>
                        <div class="content" style="font-size:14px">
                            {{user.User.sign}}
                        </div>
                    </el-col>
                    <el-col :span="14"></el-col>
                    <el-col :span="4">
                        <el-button round @click="subscribe(user,index)" v-if="!user.IsFollowed">
                            关注
                        </el-button>
                        <el-button round type="primary" @click="unsubscribe(user,index)" v-if="user.IsFollowed">
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
            followlist: state=>state.users.followlist,
            fanslist: state=>state.users.fanslist,
            follow_fans_cnt:state=>state.users.follow_fans_cnt,
        }),
        data(){
            return{
                headUrl: this.api + "user/getavatar?username=",
                // followlist: [],
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
                this.current = this.token
                this.visitmode = false
            }
            else{
                this.current = this.visitUser
                this.visitmode = true
            }
            this.updateCurrent(this.current)
            // axios.get(this.api + "user/getfollow",{
            //     params:{
            //         uid: this.current.uid,
            //         visit_uid: this.token.uid,
            //         mode: 'follow'
            //     }
            // }).then(res =>{
            //     // this.followlist = res.data.followlist
            //     if(res.data.followlist != null){
            //         this.$store.commit('setFollowCnt',res.data.followlist.length)
            //         this.$store.commit('setFollowlist',res.data.followlist)
            //     }else{
            //         this.$store.commit('setFollowCnt', 0)
            //         this.$store.commit('setFollowlist',[])
            //     }
            // })
        },
        methods:{
            subscribe(user,index){
                if(this.token == ''){
                    this.$message.warning("需要登录才能操作哦")
                    return
                }
                this.$store.commit('subscribe',{token:this.token,user:user})
                this.followlist[index].IsFollowed = true
                if (this.current.uid == this.token.uid) // 用户在自己个人空间的话点了关注某人之后关注数量+1
                    this.follow_fans_cnt.follow_cnt++
                // if(this.token.uid == this.current.uid){ // 因为是子组件，父组件中有关注数量的信息，所以点击关注后要增加一个——用户个人空间的情况，访问的时候就不加
                //     this.followlist.push(this.followlist[index])
                //     this.$store.commit('setFollowCnt',this.followlist)
                // }
            },
            unsubscribe(user,index){
                this.$store.commit('unsubscribe',{token:this.token,user:user})
                this.followlist[index].IsFollowed = false
                if (this.current.uid == this.token.uid)
                    this.follow_fans_cnt.follow_cnt--
                // if (this.token.uid == this.current.uid){
                //     this.followlist.pop()
                //     this.$store.commit('setFollowCnt',this.followlist)
                // }
            },
            visit(val){
                this.$store.dispatch('visit', val)
            },
            updateCurrent(val) {
                this.current = val
                axios.get(this.api + "user/getfollow",{
                    params:{
                        uid: this.current.uid,
                        visit_uid: this.token.uid,
                        mode: 'follow'
                    }
                }).then(res =>{
                    if(res.data.followlist != null){
                        this.$store.commit('setFollowCnt',res.data.followlist.length)
                        this.$store.commit('setFollowlist',res.data.followlist)
                    }else{
                        this.$store.commit('setFollowCnt', 0)
                        this.$store.commit('setFollowlist',[])
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