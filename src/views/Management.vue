<template>
    <div style="background-color: #E9EEF3;height:100%">
        <el-menu
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height:100%;width:220px;position:fixed;top:0;left:0;z-index:3">
        <!-- <el-scrollbar style="height:100%"> -->
            <el-menu-item index="1">
                <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>主页</span>
                </template>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span >数据管理</span>
                </template>
                <!-- <el-menu-item-group> -->
                <el-menu-item index="2-1">用户管理</el-menu-item>
                <el-menu-item index="2-2">帖子管理</el-menu-item>
                <!-- </el-menu-item-group> -->
                <!-- <el-menu-item index="2-3">话题管理</el-menu-item> -->
                <!-- <el-menu-item index="3-4">消息管理</el-menu-item> -->
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-my-analyse"></i>
                    <span >统计分析</span>
                </template>
                <!-- <el-menu-item-group> -->
                <el-menu-item index="3-1">用户发布统计</el-menu-item>
                <el-menu-item index="3-2">帖子数据统计</el-menu-item>
                <!-- </el-menu-item-group> -->
                <!-- <el-menu-item index="3-3">流量分析</el-menu-item> -->
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span >反馈</span>
                </template>
                <el-menu-item index="4-1">用户反馈</el-menu-item>
                <el-menu-item index="4-2">帖子举报</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span >配置</span>
                </template>
                <!-- <el-menu-item-group>
                <el-menu-item index="2-1">日志</el-menu-item> -->
                <el-submenu index="5-1">
                    <template slot="title">日志</template>
                    <el-menu-item index="5-1-1">登录日志</el-menu-item>
                    <el-menu-item index="5-1-2">注册日志</el-menu-item>
                    <el-menu-item index="5-1-3">操作日志</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item index="5-2">接口管理</el-menu-item> -->
            </el-submenu>
        <!-- </el-scrollbar> -->
        </el-menu>
        
        <el-row type="flex" justify="space-around" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
            <el-col :span="3" >
                <!-- <h5>默认颜色</h5> -->
            </el-col>

            <el-col :span="20" style="height:100%">
                <!-- <div style="position:fixed;top:0;left:230px;right:100px;margin:16px 0;z-index:99;width:100%;background-color:#B0C4DE80;padding:10px 0">
                    <el-page-header @back="goBack" content="管理中心">
                    </el-page-header>
                    
                </div> -->
                <el-page-header @back="goBack" content="管理中心" style="margin:16px 8px">
                    </el-page-header>
                <el-tabs v-show="pane[0]" type="border-card" style="margin:20px 0 32px 0" v-model="tabPane[0].manage" @tab-click="handleClick">
                    <el-tab-pane name="userManage">
                        <span slot="label"><i class="el-icon-user"></i> 用户管理</span>
                        <!-- 搜索关键字还未完善 -->
                        <!-- :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" -->
                        <el-table
                            :data="users"
                            ref="multipleTable"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="userSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column v-for="(value, index, i) in userLabels" :key="i"
                                :label="value" :prop="index" :show-overflow-tooltip="true" :width="userLabelsWidth[i]">
                            </el-table-column>
                            <el-table-column
                                align="right">
                                <template slot="header" slot-scope="">
                                    <!-- 共xx条数据 -->
                                    <!-- <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/> -->
                                </template>
                                <template slot-scope="scope">
                                    <!-- <el-button
                                    size="mini"
                                    @click="Silent(scope.$index, scope.row)">禁言</el-button> -->
                                    <el-button
                                    size="mini"
                                    type="info"
                                    plain
                                    @click="forbidObj(scope.row)">设置禁言</el-button>
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    @click="visit(scope.row.name)"
                                    plain>访问 >></el-button>
                                    <!-- <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-divider></el-divider>
                        <span>共{{users.length}}条数据</span>
                        <el-button @click="relieve" type="primary" style="float:right;margin-right:20px">批量解除禁言</el-button>
                        <!-- <el-button @click="toggleSelection()" type="warning" style="float:right;margin-right:30px">批量禁言</el-button> -->
                        <!-- <el-button @click="toggleSelection()" style="float:right">编辑</el-button> -->
                    </el-tab-pane>
                    
                    <el-dialog
                        title="设置禁言"
                        :visible.sync="silentView"
                        width="30%"
                        style="text-align:center">
                        <div style="margin-bottom:14px">截止到这个时间Ta都不能发帖和评论↓↓↓</div>
                        <el-date-picker v-model="forbid.time" type="datetime" placeholder="选择日期时间" @change="forbidTime"></el-date-picker>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="silentView = false">取 消</el-button>
                            <el-button type="primary" @click="silent">确 定</el-button>
                        </span>
                    </el-dialog>

                    <el-tab-pane name="articleManage">
                        <span slot="label"><i class="el-icon-my-manage"></i> 帖子管理</span>
                        <el-table :data="articles"
                            ref="multipleTable"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="articleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column v-for="(value, index) in articleLabels" :key="index"
                                :prop="index" :label="value" :show-overflow-tooltip="true">
                            </el-table-column>
                            <el-table-column
                                align="right">
                                <template slot="header" slot-scope="">
                                </template>
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    plain
                                    @click="tDetail(scope.row.Tid)">详情 >></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-divider></el-divider>
                        <span>共{{articles.length}}条数据</span>
                        <el-popover
                            placement="top"
                            width="160"
                            v-model="deleteHint">
                            <p>将删除选中帖子，此操作不可逆，确定吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="deleteHint = false">手滑了</el-button>
                                <el-button type="danger" size="mini" @click="deleteArticles">确定</el-button>
                            </div>
                            <el-button type="danger" style="float:right;margin-right:20px" slot="reference">批量删除</el-button>
                        </el-popover>
                        <!-- <el-button @click="toggleSelection()" type="warning" style="float:right;margin-right:30px">批量禁言</el-button> -->
                    </el-tab-pane>
                    
                    <!-- <el-tab-pane name="topicManage">
                        <span slot="label"><i class="el-icon-connection"></i> 评论管理</span>
                        话题管理内容--
                        新增管理员
                    </el-tab-pane> -->
                    <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
                </el-tabs>

                <el-tabs v-show="pane[1]" type="border-card" style="margin:20px 0 32px 0;" v-model="tabPane[0].analyse" @tab-click="handleClick">
                    <el-tab-pane name="userPost">
                        <span slot="label"><i class="el-icon-user"></i> 用户发布统计</span>
                        <!-- <div class="container"> -->
                            <div id="userchart">
                                userChart
                            </div>
                        <!-- </div> -->
                    </el-tab-pane>
                    <el-tab-pane name="articleCount">
                        <span slot="label"><i class="el-icon-s-data"></i> 帖子数据统计</span>
                        <div id="articlechart">
                            articleChart
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane>
                        <span slot="label"><i class="el-icon-user"></i> 流量分析</span>
                    </el-tab-pane> -->
                </el-tabs>

                <el-tabs v-show="pane[2]" type="border-card" style="margin:20px 0 32px 0" v-model="tabPane[0].feedback" @tab-click="handleClick">
                    <el-tab-pane name="userFeedback">
                        <span slot="label"><i class="el-icon-user"></i> 用户反馈</span>
                    </el-tab-pane>
                    <el-tab-pane name="articleReport">
                        <span slot="label"><i class="el-icon-document"></i> 帖子举报</span>
                    </el-tab-pane>
                </el-tabs>

                <el-tabs v-show="pane[3]" type="border-card" style="margin:20px 0 32px 0" v-model="tabPane[0].config" @tab-click="handleClick">
                    <el-tab-pane name="config1">
                        <span slot="label"><i class="el-icon-user"></i> 登录日志</span>
                    </el-tab-pane>
                    <el-tab-pane name="config2">
                        <span slot="label"><i class="el-icon-user"></i> 注册日志</span>
                    </el-tab-pane>
                    <el-tab-pane name="config3">
                        <span slot="label"><i class="el-icon-user"></i> 操作日志</span>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
// 在组件引入基本模板，使用import echarts是undefined，init报错无法绘制
let echarts = require('echarts');
// 引入折线图等组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/radar");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import {mapState} from 'vuex'
    export default {
        inject: ['reload'],
        computed: {
            ...mapState( {
                token: state => state.users.token,
                // forbid: state => state.articles.forbid,
                menuActive: state => state.manage.menuActive,
                tabPane: state => state.manage.tabPane,
            })
        },
        mounted(){
            if (this.token == '' || this.token.level < 1){
                this.$message.error("权限不够无法访问")
                setTimeout(() => {
                    this.$router.go(-1)
                }, 300)
                return
            }
            this.handleSelect(this.menuActive)
            // console.log(new Date("2077-2-2 12:12:00".replace(/-/g, '/')).getTime())
            axios.get(this.api + 'admin/getAllUser',{
            }).then(res => {
                console.log(res.data.allusers)
                this.loading = false
                this.users = res.data.allusers
                for (let i = 0; i < this.users.length; i++){
                    if(this.users[i].uid == 100001){
                        let date = new Date(this.users[i].create_time.replace(/-/g, '/'))
                        this.firstDay = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay()
                    }
                    // console.log(typeof(this.users[i].state))// 结果是（时间）字符串
                    // 时间字符串转时间戳——也可以单纯时间比较，只需将时间的.getTime()去掉即可
                    // 不过因为时间格式有多种所以还是用时间戳比较方便——并比较判断是否禁言
                    if (new Date(this.users[i].state.replace(/-/g, '/')).getTime() <= new Date().getTime())
                        this.users[i].bool = '正常'
                    else
                        this.users[i].bool = '禁言中'
                    if (this.users[i].level == 0)
                        this.users[i].authority = "用户"
                    else if (this.users[i].level == 1)
                        this.users[i].authority = "管理员"
                    else if (this.users[i].level == 2)
                        this.users[i].authority = "站长"
                    this.users[i].post = 0 // 用户发帖统计
                }
            })
            axios.get(this.api + 'admin/getAllArticle',{
            }).then(res => {
                this.articles = res.data.allarticles
                this.articles.forEach(val => {
                    val.Content = val.Content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'').replace(/&nbsp;/g,'')// 富文本标签去除
                })
                if (this.articles != null)
                    this.articles.forEach((val, index) => {
                        val.Content = val.Content.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g,'').replace(/&&&img&&&/g,'')// 富文本标签去除
                        // if (this.articles[index].book != '')
                        //     this.articles[index].bookCnt = this.articles[index].book.split('-').length
                        // else
                        //     this.articles[index].bookCnt = 0
                        // if (this.articles[index].zan != '')
                        //     this.articles[index].zanCnt = this.articles[index].zan.split('-').length
                        // else
                        //     this.articles[index].zanCnt = 0
                        // if (this.articles[index].comment != '')
                        //     this.articles[index].commentCnt = this.articles[index].comment.split('-').length
                        // else
                        //     this.articles[index].commentCnt = 0
                        // this.articles[index].user_name = res.data.ownerlist[index].UserName
                        this.users.forEach((_, i) => {
                            if (this.users[i].uid == this.articles[index].Uid)
                                this.users[i].post ++
                        })
                    })
                this.articles.forEach((key, index) => {
                    this.articleOptions.xAxis.data.push('Tid:' + key.Tid)
                    this.articleOptions.series[0].data.push(key.ZanCount)
                    this.articleOptions.series[1].data.push(key.CommentCount)
                    this.articleOptions.series[2].data.push(key.BookCount)
                })
                this.users.forEach((key, index) => {
                    this.userOptions.series[0].data.push({
                        value: this.users[index].post,
                        name: key.name
                    })
                })
            })
            this.drawUser()
            window.addEventListener('resize', this.resizeChart())
        },
        destroyed() {
            window.removeEventListener('resize', this.resizeChart())
        },
        watch: {
            userOptions: {
                handler(newValue, oldValue) {
                    this.updateOption(newValue, 'user')
                },
                // immediate: true,  //刷新加载 立马触发一次handler
                deep: true  // 可以深度检测到 obj 对象的属性值的变化
            },
            articleOptions:{
                handler(newV, oldV) {
                    this.updateOption(newV, 'article')
                },
                deep: true
            }
        },
        data(){
            return{
                manage: 'userManage',
                analyse: 'postAnalyse',
                feedback: 'userFeedback', // 反馈
                config: '',
                users: [],
                userSelect: [],
                silentView: false,
                forbid: {
                    time: '', // 禁言截止时间
                    user: '', //禁言对象
                },
                deleteHint: false,
                articleSelect: {
                    tids: [],
                    covers: []
                },
                articles: [],
                search: '',
                pane:[true, false, false, false],
                // pane: [false, true, true, true],
                articleLabels: {
                    Title: '帖子标题',
                    UserName: '发布者',
                    Uid: '发布者id',
                    Content: '内容',
                    Tid: '帖子id',
                    CreateTime: '创建时间',
                    Topic: '所属话题',
                },
                userLabels: {
                    name: '用户名',
                    authority: '权限',
                    sex: '性别',
                    sign: '签名',
                    create_time: '注册时间',
                    uid: 'UID',
                    bool: '发言状态',
                },
                userLabelsWidth: ['120', '100', '100', '', '', '100', '100'],
                firstDay: '',
                /*
                    用户发布帖子——饼图
                    帖子点赞评论收藏——折线图
                    用户注册——柱状图？
                    帖子发布时间？
                */
                userChart: null,
                articleChart: null,
                userOptions: {
                    title: {
                        text: '用户发布帖子统计',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item', // 可选参数：[item|axis|none]，item：数据项图形触发，主要在散点图、饼图等无类目轴的图表中使用
                    },
                    legend: {
                        type: 'scroll',
                        top: '5%',
                        right: 'center', // 水平居中
                        orient: 'horizontal'    // legend 横向布局。
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '10%',
                        bottom: '10%',
                    },
                    series: [{
                        name: "用户名",
                        type: "pie",
                        left: 'center',
                        bottom: 'center',
                        radius: ['100%', '140%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [],
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                    },
                    ],
                },
                articleOptions: {
                    title: {
                        text: '各帖子数据统计',
                        left: 'center',
                        // textAlign: 'center',
                        // subtext: 'ceshi',
                        // subtextStyle: {
                        //     color: '#fff',
                        //     align: 'center'
                        // }
                    },
                   tooltip: {
                       trigger: 'axis',
                       axisPointer:{ // axis，坐标轴指示器，坐标轴触发有效
                           type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                   legend: {
                       type: 'scroll',
                       top: '5%',
                       left: 'center',
                       orient: 'horizontal'
                   },
                   xAxis: {
                       type: 'category',
                       data: [],
                   },
                   grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                   },
                   yAxis: {},
                   series: [
                       {
                           name: '点赞',
                           type: 'bar',
                           data: [],
                       },
                       {
                           name: '评论',
                           type: 'bar',
                           data: [],
                       },
                       {
                           name: '收藏',
                           type: 'bar',
                           data: [],
                       },
                    ]
               },
               loading: true
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1) // 返回上一个路由
            },
            handleSelect(key){
                let path = '/management/'
                switch(key){
                    case "1": this.$router.push('/'); break;
                    case "2-1": this.pane = [true, false, false, false];
                        this.$store.commit('setTabPane', {key: 'manage', value:'userManage'})
                        this.$router.push(path+"user_manage"); break
                    case "2-2": this.pane = [true, false, false, false];
                        this.$store.commit('setTabPane', {key: 'manage', value:'articleManage'})
                        this.$router.push(path+"article_manage"); break
                    case "2-3": this.pane = [true, false, false, false];
                        this.$store.commit('setTabPane', {key: 'manage', value:'topicManage'})
                        this.$router.push(path+"topic_manage"); break
                    case "3-1": this.pane = [false, true, false, false];
                        this.$store.commit('setTabPane', {key: 'analyse', value:'userPost'})
                        this.$router.push(path+"user_count"); break
                    case "3-2": this.pane = [false, true, false, false];
                        this.$store.commit('setTabPane', {key: 'analyse', value:'articleCount'})
                        this.$router.push(path+"article_count"); break
                    // case "3-3": this.pane = [false, true, false, false];
                    //     this.$router.push(path+"traffic_count"); break
                    case "4-1": this.pane = [false, false, true, false];
                        this.$store.commit('setTabPane', {key: 'feedback', value:'userFeedback'})
                        this.$router.push(path+"user_feedback"); break
                    case "4-2": this.pane = [false, false, true, false];
                        this.$store.commit('setTabPane', {key: 'feedback', value:'articleReport'})
                        this.$router.push(path+"article_report"); break
                    case "5-1-1": this.pane = [false, false, false, true];
                        this.$store.commit('setTabPane', {key: 'config', value:'config1'})
                        this.$router.push(path+"login_log"); break
                    case "5-1-2": this.pane = [false, false, false, true];
                        this.$store.commit('setTabPane', {key: 'config', value:'config2'})
                        this.$router.push(path+"register_log"); break
                    case "5-1-3": this.pane = [false, false, false, true];
                        this.$store.commit('setTabPane', {key: 'config', value:'config3'})
                        this.$router.push(path+"operate_log"); break
                }
                // console.log(key,keypath)
            },
            handleClick(tab) {
                if(tab.name == 'userManage'){
                    this.$store.commit('setMenuActive', '2-1')
                }else if(tab.name == 'articleManage'){
                    this.$store.commit('setMenuActive', '2-2')
                }else if(tab.name == 'topicManage'){
                    this.$store.commit('setMenuActive', '2-3')
                }else if(tab.name == 'userPost'){
                    this.$store.commit('setMenuActive', '3-1')
                }else if(tab.name == 'articleCount'){
                    this.$store.commit('setMenuActive', '3-2')
                }else if(tab.name == 'userFeedback'){
                    this.$store.commit('setMenuActive', '4-1')
                }else if(tab.name == 'articleReport'){
                    this.$store.commit('setMenuActive', '4-2')
                }else if(tab.name == 'config1'){
                    this.$store.commit('setMenuActive', '5-1-1')
                }else if(tab.name == 'config2'){
                    this.$store.commit('setMenuActive', '5-1-2')
                }else if(tab.name == 'config3'){
                    this.$store.commit('setMenuActive', '5-1-3')
                }
            },
            userSelectionChange(val){
                this.userSelect.splice(0) // 清空，也可以通过this.userSelect.length=0或者this.userSelect=[]的方式达到一样效果
                val.forEach(key => {
                    this.userSelect.push(key.uid)
                })
                // this.userSelect = val
            },
            articleSelectionChange(val){
                this.articleSelect = {tids:[], covers:[]}
                val.forEach(key => {
                    this.articleSelect.tids.push(key.Tid)
                    this.articleSelect.covers.push(key.Cover)
                })
                // this.articleSelect = val
            },
            forbidTime(val){ // 设置禁言时间
                this.forbid.time = this.formatDate(val)
            },
            forbidObj(val){ // 设置禁言对象
                this.forbid.user = val
                this.silentView = true
            },
            silent() {
                if (this.token.level < this.forbid.user.level){
                    this.$message.error("您的操作权限不够")
                }else{
                    let params = new FormData()
                    params.append("time", this.forbid.time)
                    params.append("uid", this.forbid.user.uid) // 要禁言用户的uid
                    params.append("operator", this.token.user_name)
                    params.append("operatorId", this.token.uid) // 操作者uid
                    let config = {
                        headers:{'Content-Type':'multipart/form-data'}
                    }
                    axios.post(this.api + 'admin/forbid',params,config).then(res => {
                        if (res.data.isForbidden){
                            this.$notify({
                                title: res.data.msg,
                                // message: '这是一条成功的提示消息',
                                type: 'success',
                                offset: 100
                            })
                            this.reload()
                        }else{
                            // this.$message.error(res.data.msg)
                            this.$notify({
                                title: res.data.msg,
                                // message: '这是一条成功的提示消息',
                                type: 'error',
                                offset: 100
                            })
                        }
                    })
                    this.silentView = false
                }
            },
            formatDate(val){
                if(val == null)
                    return
                let y = val.getFullYear()
                let m = val.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = val.getDate()
                d = d < 10 ? '0' + d : d
                let h = val.getHours()
                h = h < 10 ? '0' + h : h
                let min = val.getMinutes()
                min = min < 10 ? '0' + min : min
                let s = val.getSeconds()
                s = s < 10 ? '0' + s : s
                return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
            },
            relieve(){ // 解除禁言
                if(this.userSelect == ''){
                    this.$message.warning("请至少选中一项")
                    return
                }
                let params = new FormData()
                params.append('uids', this.userSelect) // 要解除禁言的用户的id
                params.append("user_name", this.forbid.user.user_name)
                params.append("operator", this.token.user_name)
                params.append("operatorId", this.token.uid)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                axios.post(this.api + 'admin/relieve',params,config).then(res => {
                    if(res.data.isRelieve){
                        this.$notify({
                                title: res.data.msg,
                                type: 'success',
                                offset: 100
                            })
                        this.reload()
                    }else{
                        this.$notify({
                                title: res.data.msg,
                                // message: '这是一条成功的提示消息',
                                type: 'error',
                                offset: 100
                            })
                    }
                })
                // this.reload()
            },
            deleteArticles(){
                if(this.articleSelect.tids == ''){
                    this.deleteHint = false
                    this.$message.warning("请至少选中一项")
                    return
                }
                let params = new FormData()
                params.append('tids', this.articleSelect.tids)
                params.append('covers', this.articleSelect.covers)
                params.append("operator", this.token.user_name)
                params.append("operatorId", this.token.uid)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                axios.post(this.api + 'admin/deleteArticles',params,config).then(res => {
                    if(res.data.isDelete){
                        this.$notify({
                            title: res.data.msg,
                            type: 'success',
                            offset: 100
                        })
                        this.reload()
                    }else{
                        this.$notify({
                            title: res.data.msg,
                            type: 'error',
                            offset: 100
                        })
                    }
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            drawUser(){
                // 下面几行Object解决el-tab中图标虽然能绘制但是控制台报Can't get DOM width or height的问题
                // 见https://www.jianshu.com/p/15d03c4413b4
                // 但是这样容器宽高固定之后反而让图表不能随着窗口自适应大小...
                Object.defineProperty(document.getElementById('userchart'),'clientWidth',{get:function(){return 1200;}})
                Object.defineProperty(document.getElementById('userchart'),'clientHeight',{get:function(){return 600;}})
                Object.defineProperty(document.getElementById('articlechart'),'clientWidth',{get:function(){return 1200;}})
                Object.defineProperty(document.getElementById('articlechart'),'clientHeight',{get:function(){return 600;}})
                this.userChart = echarts.init(document.getElementById('userchart'))
                this.userChart.setOption(this.userOptions)
                this.articleChart = echarts.init(document.getElementById('articlechart'))
                this.articleChart.setOption(this.articleOptions)
            },
            updateOption(value, str){
                if (str == 'user'){
                    // echarts.dispose(document.getElementById('userchart'))
                    // echarts.init(document.getElementById('userchart')).setOption(value)
                    this.userChart.setOption(value)
                    this.userChart.resize()
                }
                else if(str == 'article'){
                    // echarts.dispose(document.getElementById('articlechart'))
                    // echarts.init(document.getElementById('articlechart')).setOption(value)
                    this.articleChart.setOption(value)
                    this.articleChart.resize()
                }
            },
            resizeChart(){
                // 在窗口大小变化时，更新chart大小
                this.userChart ? this.userChart.resize() : ''
                this.articleChart ? this.articleChart.resize() : ''
            },
            visit(val){
                if (val == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', val)
            },
            tDetail(val){
                this.$router.push('/details/' + val)
            }
        }
    }
</script>

<style scoped>
/* html{
    height: 100%;
} */
.el-divider--horizontal{
    /* 分割线样式修改 */
     margin: 20px 0 12px 0;
     /*上 右 下 左 */
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
 #userchart{
     width: 100%;
     height: 600px;
     background-color:lightgrey
 }
 #articlechart{
     width: 100%;
     height: 600px;
     background-color:lightgrey
 }
</style>