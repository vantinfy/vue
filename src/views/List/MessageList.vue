<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="box-shadow:none" class="box-card">
            <el-tab-pane name="system_notice">
                <span slot="label">系统通知 <el-badge :value="systemNoticeCnt" :max="99" style="font-size:10px" v-if="systemNoticeCnt"></el-badge></span>
                <!-- <div> -->
                    <el-row align="middle" type="flex">
                        <el-col :span="16">
                            <el-radio-group v-model="radio" style="margin:0 0 10px 0" @change="change">
                                <el-radio-button :label="9">查看全部</el-radio-button>
                                <el-radio-button :label="6">只看未读</el-radio-button>
                                <el-radio-button :label="3">只看已读</el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8" style="text-align:right">
                            <el-button type="" @click="readAll('system_notice')" v-if="systemNoticeCnt" style="margin:0 0 10px 0">
                                全部标为已读
                                <i class="el-icon-check"></i>
                            </el-button>
                        </el-col>
                    </el-row>
                <!-- </div> -->
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in sys_list" :key="index">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" :src="headUrl + notice.sender_id"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name" @click="visit(notice.sender, notice.mid, 'sys', index)">
                                {{notice.sender}}
                            </el-button>
                            <div>
                                <el-popover
                                    placement="top"
                                    trigger="click"
                                    :content="notice.content">
                                    <el-button type="text" class="text" size="small" @click="read(notice.mid, 'sys', index)" slot="reference">
                                        {{notice.title}}
                                    </el-button>
                                </el-popover>
                            </div>
                        </el-col>
                        <el-col :span="8"></el-col>
                        <el-col :span="8" style="font-size:14px;color:grey">
                            {{notice.send_time}}
                            <el-badge is-dot v-show="!notice.is_read"></el-badge>
                        </el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>

            <el-tab-pane name="comment_notice">
                <span slot="label">评论 <el-badge :value="commentNoticeCnt" :max="99" style="font-size:10px" v-if="commentNoticeCnt"></el-badge> </span>
                <el-row align="middle" type="flex">
                    <el-col :span="16">
                        <el-radio-group v-model="radio" style="margin:0 0 10px 0" @change="change">
                            <el-radio-button :label="9">查看全部</el-radio-button>
                            <el-radio-button :label="6">只看未读</el-radio-button>
                            <el-radio-button :label="3">只看已读</el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-button type="" @click="readAll('system_notice')" v-if="commentNoticeCnt" style="margin:0 0 10px 0">
                            全部标为已读
                            <i class="el-icon-check"></i>
                        </el-button>
                    </el-col>
                </el-row>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in com_list" :key="index">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" :src="headUrl + notice.sender_id"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name" @click="visit(notice.sender, notice.mid, 'com', index)">
                                {{notice.sender}}
                            </el-button>
                            <div>
                                <el-button type="text" class="text" size="small" @click="tDetail(notice.content.split('>>')[1], notice.mid, 'com', index)">
                                    {{notice.content}}
                                </el-button>  
                            </div>
                        </el-col>
                        <el-col :span="8"></el-col>
                        <el-col :span="8" style="font-size:14px;color:grey">
                            {{notice.send_time}}
                            <el-badge is-dot v-show="!notice.is_read">
                                <!-- <el-button type="text" style="color:black">···</el-button> -->
                            </el-badge>
                            <!-- <div>
                                <el-button size="small">去看看</el-button>
                            </div> -->
                        </el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>

            <el-tab-pane name="zan_book_notice">
                <span slot="label">点赞收藏 <el-badge :value="zanBookNoticeCnt" :max="99" style="font-size:10px" v-if="zanBookNoticeCnt"></el-badge> </span>
                <el-row align="middle" type="flex">
                    <el-col :span="16">
                        <el-radio-group v-model="radio" style="margin:0 0 10px 0" @change="change">
                            <el-radio-button :label="9">查看全部</el-radio-button>
                            <el-radio-button :label="6">只看未读</el-radio-button>
                            <el-radio-button :label="3">只看已读</el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-button type="" @click="readAll('system_notice')" v-if="zanBookNoticeCnt" style="margin:0 0 10px 0">
                            全部标为已读
                            <i class="el-icon-check"></i>
                        </el-button>
                    </el-col>
                </el-row>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in zbk_list" :key="index">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" :src="headUrl + notice.sender_id"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name" @click="visit(notice.sender, notice.mid, 'zbk', index)">
                                {{notice.sender}}
                            </el-button>
                            <div>
                                <el-button type="text" class="text" size="small" @click="tDetail(notice.content.split('>>')[1], notice.mid, 'com', index)">
                                    {{notice.content}}
                                </el-button>  
                            </div>
                        </el-col>
                        <el-col :span="8"></el-col>
                        <el-col :span="8" style="font-size:14px;color:grey">
                            {{notice.send_time}}
                            <el-badge is-dot v-show="!notice.is_read">
                            </el-badge>
                        </el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>
            
            <el-tab-pane name="subscribe_notice">
                <span slot="label">新关注 <el-badge :value="subscribeNoticeCnt" :max="99" style="font-size:10px" v-if="subscribeNoticeCnt"></el-badge> </span>
                <el-row align="middle" type="flex">
                    <el-col :span="16">
                        <el-radio-group v-model="radio" style="margin:0 0 10px 0" @change="change">
                            <el-radio-button :label="9">查看全部</el-radio-button>
                            <el-radio-button :label="6">只看未读</el-radio-button>
                            <el-radio-button :label="3">只看已读</el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-button type="" @click="readAll('system_notice')" v-if="subscribeNoticeCnt" style="margin:0 0 10px 0">
                            全部标为已读
                            <i class="el-icon-check"></i>
                        </el-button>
                    </el-col>
                </el-row>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in subs_list" :key="index">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" :src="headUrl + notice.SubscribeNotice.sender_id"></el-avatar>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" class="name" @click="visit(notice.SubscribeNotice.sender, notice.SubscribeNotice.mid, 'subs', index)">
                                {{notice.SubscribeNotice.sender}}
                            </el-button>
                            <span style="margin-left:10px;font-size:14px;color:grey">关注了你</span>
                        </el-col>
                        <el-col :span="9" style="font-size:14px;color:grey">
                            {{notice.SubscribeNotice.send_time}}
                            <el-badge is-dot v-show="!notice.SubscribeNotice.is_read"></el-badge>
                        </el-col>
                        <el-col :span="4">
                            <el-button round @click="subscribe(notice,index)" v-if="!notice.IsFollowed">
                                关注
                            </el-button>
                            <el-button round type="primary" @click="unsubscribe(notice,index)" v-if="notice.IsFollowed">
                                已关注
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
    export default {
        inject:['reload'],
        computed:{
            ...mapState({
                    token: state => state.users.token,
                    systemNoticeCnt: state => state.notice.systemNoticeCnt,
                    commentNoticeCnt: state => state.notice.commentNoticeCnt,
                    zanBookNotice:state=>state.notice.zanBookNotice,
                    subscribeNoticeCnt: state => state.notice.subscribeNoticeCnt,
                    systemNotice: state => state.notice.systemNotice,
                    commentNotice: state => state.notice.commentNotice,
                    zanBookNoticeCnt:state=>state.notice.zanBookNoticeCnt,
                    subscribeNotice: state => state.notice.subscribeNotice,
                    follow_fans_cnt:state=>state.users.follow_fans_cnt,
                    followlist: state=>state.users.followlist,
                    fanslist: state=>state.users.fanslist,
            }),
            activeName:{
                get(){
                    return this.$store.state.spacelist.activeName
                },
                set(val){
                    this.$store.commit('setActiveName', val)
                }
            }
        },
        mounted(){
            this.sys_list = this.systemNotice
            this.subs_list = this.subscribeNotice
            this.com_list = this.commentNotice
            this.zbk_list = this.zanBookNotice
            this.systemNotice.forEach(val => {
                if(val.is_read == 0)
                    this.sys_list_0.push(val)
                else
                    this.sys_list_1.push(val)
            })
            this.subscribeNotice.forEach(val => {
                if(val.SubscribeNotice.is_read == 0)
                    this.subs_list_0.push(val)
                else
                    this.subs_list_1.push(val)
            })
            this.commentNotice.forEach(val => {
                if(val.is_read == 0)
                    this.com_list_0.push(val)
                else
                    this.com_list_1.push(val)
            })
            this.zanBookNotice.forEach(val => {
                if(val.is_read == 0)
                    this.zbk_list_0.push(val)
                else
                    this.zbk_list_1.push(val)
            })
        },
        data() {
            return {
                headUrl: this.api + 'user/getavatar?uid=',
                radio: 9,
                sys_list:[],
                sys_list_0:[],
                sys_list_1:[],
                subs_list:[],
                subs_list_0:[],
                subs_list_1:[],
                com_list:[],
                com_list_0:[],
                com_list_1:[],
                zbk_list:[],
                zbk_list_0:[],
                zbk_list_1:[],
            }
        },
        methods: {
            handleClick(tab) {
                // console.log(tab.name);
                this.$store.commit('myMessage', {token:this.token, type:tab.name})
            },
            change(val){
                switch (val){
                    case 9: // 全部
                        this.sys_list = this.systemNotice
                        this.subs_list = this.subscribeNotice
                        this.com_list = this.commentNotice
                        this.zbk_list = this.zanBookNotice
                        break;
                    case 6: // 未读
                        this.sys_list = this.sys_list_0
                        this.subs_list = this.subs_list_0
                        this.com_list = this.com_list_0
                        this.zbk_list = this.zbk_list_0
                        break;
                    case 3: // 已读
                        this.sys_list = this.sys_list_1
                        this.subs_list = this.subs_list_1
                        this.com_list = this.com_list_1
                        this.zbk_list = this.zbk_list_1
                        break;
                }
            },
            readAll(value){
                axios.get(this.api + 'notice/readall',{
                    params:{
                        type : value,
                        uid: this.token.uid,
                        level: this.token.level,
                    }
                }).then(res => {
                    if(res.data.isRead){
                        this.$store.commit('setZero', value)
                        if(value == "system_notice")
                            this.systemNotice.forEach(val => {
                                val.is_read = 1
                            })
                        if(value == "comment_notice")
                            this.commentNotice.forEach(val => {
                                val.is_read = 1
                            })
                        if(value == "zan_book_notice")
                            this.zanBookNotice.forEach(val => {
                                val.is_read = 1
                            })
                        if(value == "subscribe_notice")
                            this.subscribeNotice.forEach(val => {
                                val.is_read = 1
                            })
                    }
                })
            },
            read(mid, type, index){ // mid
                axios.get(this.api + 'notice/read',{
                    params:{
                        mid: mid
                    }
                }).then(res => {
                    if(res.data.isRead){
                        this.$store.commit('decrease',{type: type, change:res.data.change})
                        if(type == "sys")
                            this.systemNotice[index].is_read = 1
                        else if(type == "com")
                            this.commentNotice[index].is_read = 1
                        else if(type == "zbk")
                            this.zanBookNotice[index].is_read = 1
                        else if(type == "subs")
                            this.subscribeNotice[index].is_read = 1
                    }
                })
            },
            tDetail(val, mid, type, index){
                this.$router.push('/details/' + val)
                this.read(mid, type, index)
            },
            visit(name, mid, type, index){
                if (name == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', name)
                this.read(mid, type, index)
            },
            subscribe(notice,index){
                axios.get(this.api + 'user/subscribe', {
                    params: {
                        follow_uid: this.token.uid,
                        follow_name: this.token.user_name,
                        be_follow_uid: notice.SubscribeNotice.sender_id,
                        be_follow_name: notice.SubscribeNotice.sender
                    }
                })
                this.subscribeNotice[index].IsFollowed = true
                this.followlist.push(this.subscribeNotice[index])
                this.follow_fans_cnt.follow_cnt++
                // this.$store.commit('setFollowCnt',this.follow_fans_cnt.follow_cnt++)
            },
            unsubscribe(notice,index){
                axios.get(this.api + 'user/unsubscribe', {
                    params: {
                        uid: this.token.uid,
                        target_uid: notice.SubscribeNotice.sender_id,
                    }
                })
                this.subscribeNotice[index].IsFollowed = false
                this.followlist.pop()
                this.follow_fans_cnt.follow_cnt--
            }
        }
    }
</script>

<style scoped>
.box-card{
    margin-bottom: 40px
}
.name{
    color:black;
    font-size:18px;
    font-weight:bolder
}
.name:hover{
    color:#409EFF
}
.text{
    font-size: 14px;
    color:black;
}
.text:hover{
    color:#409EFF
}
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 40px 0 20px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>