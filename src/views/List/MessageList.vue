<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="box-shadow:none" class="box-card">
            <el-tab-pane name="system_notice">
                <span slot="label">系统通知 <el-badge :value="systemNoticeCnt" :max="99" style="font-size:10px" v-if="systemNoticeCnt"></el-badge></span>
                <div style="text-align:right">
                    <el-button type="text" @click="readAll('system_notice')" v-if="systemNoticeCnt">
                        全部标为已读
                        <i class="el-icon-check"></i>
                    </el-button>
                </div>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in systemNotice" :key="index">
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
                <div style="text-align:right">
                    <el-button type="text" @click="readAll('comment_notice')" v-if="commentNoticeCnt">
                        全部标为已读
                        <i class="el-icon-check"></i>
                    </el-button>
                </div>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in commentNotice" :key="index">
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
                <div style="text-align:right">
                    <el-button type="text" @click="readAll('zan_book_notice')" v-if="zanBookNoticeCnt">
                        全部标为已读
                        <i class="el-icon-check"></i>
                    </el-button>
                </div>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in zanBookNotice" :key="index">
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
                <div style="text-align:right">
                    <el-button type="text" @click="readAll('subscribe_notice')" v-if="subscribeNoticeCnt">
                        全部标为已读
                        <i class="el-icon-check"></i>
                    </el-button>
                </div>
                <el-card shadow="nerver" style="margin-bottom:10px" v-for="(notice, index) in subscribeNotice" :key="index">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" :src="headUrl + notice.sender_id"></el-avatar>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" class="name" @click="visit(notice.sender, notice.mid, 'subs', index)">
                                {{notice.sender}}
                            </el-button>
                            <span style="margin-left:10px;font-size:14px;color:grey">关注了你</span>
                        </el-col>
                        <el-col :span="9" style="font-size:14px;color:grey">
                            {{notice.send_time}}
                            <el-badge is-dot v-show="!notice.is_read"></el-badge>
                        </el-col>
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
                    subscribeNotice: state => state.subscribeNotice,
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
        },
        data() {
            return {
                headUrl: 'http://localhost:8090/user/getavatar?uid=',
            }
        },
        methods: {
            handleClick(tab) {
                // console.log(tab.name);
                this.$store.commit('myMessage', {token:this.token, type:tab.name})
            },
            readAll(value){
                axios.get('http://localhost:8090/notice/readall',{
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
                axios.get('http://localhost:8090/notice/read',{
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