<template>
    <!-- <div> -->
        <el-container>
            <navigation></navigation>

            <el-main>
                <div style="text-align:center">
                    <h5><i class="el-icon-fire"></i><i class="el-icon-fire"></i>最近热门</h5>
                </div>
                <el-carousel height="400px" type="card" :interval="2000" style="margin:10px 4px;background-image:url('assets/wechat.png')">
                    <el-carousel-item v-for="(article, index) in newest" :key="index" style="text-align:center">
                        <el-button type="text" style="padding:0;height:100%" @click="tDetail(article.tid)">
                            <el-image
                                fit="contain"
                                style="width: 100%; height: 100%;"
                                :src="url + article.cover">
                            </el-image>
                        </el-button>
                    </el-carousel-item>
                </el-carousel>
                <!-- this is main -->
                <el-row  type="flex" justify="space-around" style="padding-left:32px;">
                    <el-col :span="4">
                    </el-col>

                    <el-col :span="16"
                    style="background:#fff;margin-bottom:40px">
                        <div class="card_title">
                            <h5><i class="el-icon-my-ring"></i> 全站公告：测试运营</h5>
                        </div>

                        <el-card shadow="never">
                            <div slot="header" class="clearfix">
                                <i class="el-icon-fire"></i>
                                <span style="margin-left:2px; font-weight:bolder">排行</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
                            </div>
                            <el-row :gutter="40">
                                <el-col v-for="(t,index) in top3" :key="index" :span="8">
                                    <div style="text-align:center;margin-bottom:10px;font-weight:400">
                                        Top{{index+1}}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col v-for="(article, index) in top3" :key="index" :span="8">
                                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                        <el-image
                                            fit="contain"
                                            style="width: 100%; height: 160px;"
                                            :src="url + article.cover"
                                            :preview-src-list="[url + article.cover]">
                                        </el-image>
                                        <div style="padding: 6px;">
                                            <div style="text-align:center">
                                                <el-button type="text" class="button content" @click="tDetail(article.tid)">
                                                    {{article.title}}
                                                </el-button>
                                            </div>
                                            <el-row style="margin-bottom:10px" type="flex" align="middle">
                                                <el-col :span="11">
                                                    <div style="text-align:center;">
                                                        <!-- padding:6px 0 -->
                                                        综合得分: {{article.Cnt}}
                                                    </div>
                                                </el-col>
                                                <el-col :span="3"></el-col>
                                                <el-col :span="2">
                                                    <div style="text-align:center">
                                                        <el-avatar :size="30" style="margin:4px 4px 0 0" :src="headUrl + top3Name[index].Avatar"></el-avatar>
                                                    </div>
                                                </el-col>
                                                <el-col :span="8">
                                                    <div style="text-align:center">
                                                        <el-button type="text" class="name" @click="visit(top3Name[index].UserName)">
                                                            {{top3Name[index].UserName}}
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-card shadow="never">
                            <div slot="header" class="clearfix">
                                <i class="el-icon-animation"></i>
                                <span style="margin-left:2px; font-weight:bolder">Animation</span>
                                <el-button type="text" icon="el-icon-right" @click="jumpTo('Animation')" class="more">
                                    更多
                                </el-button>
                            </div>
                            <el-row :gutter="20" style="margin-bottom:20px">
                                <el-col v-for="(article,index) in animationList" :key="index" :span="6">
                                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                        <el-image
                                            fit="contain"
                                            class="image"
                                            :src="url + article.cover">
                                        </el-image>
                                        <div style="padding: 4px;">
                                            <div style="text-align:center">
                                                <el-button type="text" class="button content" @click="tDetail(article.tid)">
                                                    {{article.title}}
                                                </el-button>
                                            </div>
                                            <el-row style="margin-bottom:6px">
                                                <el-col :span="12">
                                                    <div style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px">
                                                        {{article.create_time.split(' ')[0]}}
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div style="text-align:center">
                                                        <el-button type="text" class="name" @click="visit(animationOwner[index].UserName)">
                                                            {{animationOwner[index].UserName}}
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-card shadow="never">
                            <div slot="header" class="clearfix">
                                <i class="el-icon-comic"></i>
                                <span style="margin-left:2px; font-weight:bolder">Comic</span>
                                <el-button type="text" icon="el-icon-right" @click="jumpTo('Comic')" class="more">
                                    更多
                                </el-button>
                            </div>
                            <el-row :gutter="20" style="margin-bottom:20px">
                                <el-col v-for="(article, index) in comicList" :key="index" :span="6">
                                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                        <el-image
                                            fit="contain"
                                            class="image"
                                            :src="url + article.cover">
                                        </el-image>
                                        <div style="padding: 6px;">
                                            <div style="text-align:center">
                                                <el-button type="text" class="button" @click="tDetail(article.tid)">
                                                    {{article.title}}
                                                </el-button>
                                            </div>
                                            <el-row style="margin-bottom:10px">
                                                <el-col :span="12">
                                                    <div style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px">
                                                        {{article.create_time.split(' ')[0]}}
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div style="text-align:center">
                                                        <el-button type="text" class="name" @click="visit(comicOwner[index].UserName)">
                                                            {{comicOwner[index].UserName}}
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-card shadow="never">
                            <div slot="header" class="clearfix">
                                <i class="el-icon-game"></i>
                                <span style="margin-left:2px; font-weight:bolder">Game</span>
                                <el-button type="text" icon="el-icon-right" @click="jumpTo('Game')" class="more">
                                    更多
                                </el-button>
                            </div>
                            <el-row :gutter="20" style="margin-bottom:20px">
                                <el-col v-for="(article, index) in gameList" :key="index" :span="6">
                                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                        <el-image
                                            fit="contain"
                                            class="image"
                                            :src="url + article.cover">
                                        </el-image>
                                        <div style="padding: 6px;">
                                            <div style="text-align:center">
                                                <el-button type="text" class="button" @click="tDetail(article.tid)">
                                                    {{article.title}}
                                                </el-button>
                                            </div>
                                            <el-row style="margin-bottom:10px">
                                                <el-col :span="12">
                                                    <div style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px">
                                                        {{article.create_time.split(' ')[0]}}
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div style="text-align:center">
                                                        <el-button type="text" class="name" @click="visit(gameOwner[index].UserName)">
                                                            {{gameOwner[index].UserName}}
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>

                        </el-card>

                        <!-- <el-card class="box-card" shadow="never">
                            <div slot="header" class="clearfix">
                                <span>Others</span>
                            </div>
                            开发中...
                        </el-card> -->
                    </el-col>

                    <el-col :span="4">
                    </el-col>
                </el-row>

                <!-- <el-backtop :bottom="100">
                    <div
                    style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
                    >
                    UP
                    </div>
                </el-backtop> -->
                <el-backtop :visibility-height="120" :right="100" :bottom="100">
                    <i class="el-icon-s-promotion"></i>
                </el-backtop>
            </el-main>

            <el-footer>
                <my-footer></my-footer>
            </el-footer>
        </el-container>
    <!-- </div> -->
</template>

<script>
import Navigation from './Navigation'
import Login from './Login'
import MyFooter from './MyFooter'
import {mapState} from 'vuex'
    export default {
        components:{
            Login,
            Navigation,
            MyFooter
        },
        computed: {
            ...mapState({
                token: state => state.users.token,
                totalTop: state => state.articles.totalTop,
                totalTopName: state => state.articles.totalTopName,
            })
        },
        // watch:{
        //     totalTop:{
        //         handler(newV, oldV){
        //             this.$store.commit('setTotalTop', newV)
        //         }
        //     }
        // },
        mounted(){
            this.$store.dispatch('getTop')
            if(this.totalTop.length >= 3)
                for(let i = 0; i < 3; i++){ // 只能通过循环取了，直接用slice会改变state的值，改值未来可能还需要再别的地方（如排行榜页面）用到
                    this.top3.push(this.totalTop[i])
                    this.top3Name.push(this.totalTopName[i])
                }
            else{
                this.top3 = this.totalTop
                this.top3Name = this.totalTopName
            }
            this.totalTop.sort(this.compare('day', true)) // 按帖子发布至今天数升序排序
            // this.newest.push(this.totalTop[0])  // 0即最新的帖子
            // console.log(this.newest)
            let new7 = [] // 最近一周的帖子
            let new31 = [] // 最近一个月的帖子
            this.totalTop.forEach((val, index) => {
                if (val.day <= 31){
                    val.introduce = '最近一个月内热门'
                    new31.push(val)
                    if (val.day <= 7){ // 把小于7的判断放到31内，优化if处理，因为大于31的一定也大于7因此就没有必要再判断了
                        val.introduce = '最近一周热门'
                        new7.push(val)
                    }
                }
            })
            new7.sort(this.compare('Cnt', false)).splice(2, new7.length - 2)
            new7.forEach((val, index) => {
                val.introduce += '第' + (index + 1)
                if(index <= 1 )
                    this.newest.push(val)
            })
            new31.sort(this.compare('Cnt', false)).splice(2, new31.length - 2)
            new31.forEach((val, index) => {
                val.introduce += '第' + (index + 1)
                if(index <= 1 )
                    this.newest.push(val)
            })
            // this.newest[0].introduce = '最新发布'
            this.newest = this.unique(this.newest)
            this.$axios.get('http://localhost:8090/article/getAllArticle').then(res => {
                this.animationList = res.data.animationList
                this.comicList = res.data.comicList
                this.gameList = res.data.gameList
                this.animationOwner = res.data.animationOwner
                this.comicOwner = res.data.comicOwner
                this.gameOwner = res.data.gameOwner
                if(this.animationList.length >= 4) {// 剪切，只留下最新的4篇用于首页显示，下同
                    this.animationList.splice(0, this.animationList.length - 4) // 从下标为0开始，删除len-4个元素
                    this.animationOwner.splice(0, this.animationList.length - 4)
                }
                this.animationList.reverse()
                this.animationOwner.reverse()
                if(this.comicList.length >= 4){
                    this.comicList.splice(0, this.comicList.length - 4)
                    this.comicOwner.splice(0, this.comicList.length - 4)
                }
                this.comicList.reverse()
                this.comicOwner.reverse()
                if(this.gameList.length >= 4){
                    this.gameList.splice(0, this.gameList.length - 4)
                    this.gameOwner.splice(0, this.gameList.length - 4)
                }
                this.gameList.reverse()
                this.gameOwner.reverse()
                // console.log(this.gameOwner)
            })
        },
        data(){
            return {
                headUrl: 'http://localhost:8090/user/getavatar?username=',
                url: 'http://localhost:8090/article/getcover?cover=',
                top3: [],
                top3Name: [],
                newest: [], // 存放最新帖子、最近7天及31天内的最热帖子，如果有重复则会过滤
                animationList: [],
                comicList: [],
                gameList: [],
                animationOwner: [],
                comicOwner: [],
                gameOwner: [],
            }
        },
        methods:{
            jumpTo(val){
                this.$router.push('./topic/'+val)
            },
            visit(val){
                if (val == this.token.user_name)
                    this.$store.commit('myPost', {visit: false, token: this.token})
                else
                    this.$store.dispatch('visit', val)
            },
            tDetail(val){
                this.$router.push('/article/' + val)
            },
            compare(key, desc) { // 封装一个数组排序方法
                // key:  用于排序的数组的key值
                // desc： 布尔值，true是升序排序，false是降序排序
                return function (a, b) {
                    let value1 = a[key];
                    let value2 = b[key];
                    if (desc == true) {
                        // 升序排列
                        return value1 - value2;
                    } else {
                        // 降序排列
                        return value2 - value1;
                    }
                };
            },
            formatDate(val){ // 格式化时间，参数时间类型
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
            unique(array){ // 数组元素去重
                var r = [];
                for(var i = 0, l = array.length; i<l; i++){
                    for(var j = i + 1; j < l; j++)
                        if(array[i] == array[j]) j == ++i;
                            r.push(array[i]);
                }
                return r;
            }
        }
    }
</script>

<style scoped>
  .el-footer{
      background: #B3C0D1;
      color:#333;
      text-align: center;
      line-height: 60px;
      padding:0
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    padding:0;
    /* line-height: 16px; */
    margin-top:60px
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.box-card{
    padding-bottom: 20px;
}
.button{
    color:#333;
    font-weight: 600;
    padding: 8px 0;
}
.name{
    font-size: 16px;
    color: #333;
    padding: 0px 0 0 4px;
}
.more{
    color:#333;
    float: right;
    padding: 3px 10px;
}
.more:hover{
    padding: 3px 0px
}
.card_title{
        height: 60px;
        line-height: 60px;
        background-color: #6699cc20;
        margin: 0 20px 20px 20px;
        /* vertical-align: middle; */
        color:black;
        padding-left: 10px;
        /* font-size: 20px; */
        /* font-weight: bold; */
        border-bottom: none;
        transition: all 0.35s;
    }
    .card_title:hover{
        padding-left: 20px;
        color:#409EFF;
    }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  } */
  
  .el-carousel__item {
    background-color: #d3dce600; /*最后的00透明*/ 
  }
  .image {
    width: 100%;
    height: 120px;
    display: block;
  }
</style>