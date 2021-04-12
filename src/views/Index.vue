<template>
  <el-container>
    <navigation></navigation>
    <!-- 封装的顶部导航栏组件 -->

    <el-main>
      <div style="text-align:center">
        <h5>
          <i class="el-icon-fire"></i>
          <i class="el-icon-fire"></i>
          {{toplist}}
          <el-tooltip content="切换榜单" placement="right">
              <!-- 开关按钮 -->
            <el-switch
              v-model="hot7or31"
              active-color="#7B68EE"
              inactive-color="#87CEEB"
              @change="switchList"
            ></el-switch>
          </el-tooltip>
        </h5>
      </div>
      <el-carousel
        height="400px"
        type="card"
        :interval="2000"
        style="margin:10px 4px;background-image:url('assets/wechat.png')"
        v-loading="loading"
        element-loading-text="拼命加载中"
      ><!-- 轮播图逐组件 -->
        <el-carousel-item v-for="(article, index) in newest" :key="index" style="text-align:center">
          <el-button
            type="text"
            style="padding:0;height:100%"
            @click="tDetail(article.Article.tid)"
          ><!-- 轮播中的展示图 -->
            <el-image
              fit="contain"
              style="width: 100%; height: 100%;"
              :src="url + article.Article.cover"
            ></el-image>
          </el-button>
        </el-carousel-item>
      </el-carousel>
      <el-row type="flex" justify="space-around" style="padding-left:32px;">
        <el-col :span="4"></el-col>

        <el-col :span="16" style="background:#fff;margin-bottom:40px">
          <div class="card_title">
            <h5>
              <i class="el-icon-my-ring"></i> 全站公告：测试运营
            </h5>
          </div>

          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <i class="el-icon-fire"></i>
              <span style="margin-left:2px; font-weight:bolder">总榜</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
            </div>
            <el-row :gutter="40">
              <el-col v-for="(t,index) in top3" :key="index" :span="8">
                <div style="text-align:center;margin-bottom:10px;font-weight:400">Top{{index+1}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col v-for="(article, index) in top3" :key="index" :span="8">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-image
                    fit="contain"
                    style="width: 100%; height: 160px;"
                    :src="url + article.Article.cover"
                    :preview-src-list="[url + article.Article.cover]"
                  ></el-image>
                  <div style="padding: 6px;">
                    <div style="text-align:center">
                      <el-button
                        type="text"
                        class="button content"
                        @click="tDetail(article.Article.tid)"
                      >{{article.Article.title}}</el-button>
                    </div>
                    <el-row style="margin-bottom:10px" type="flex" align="middle">
                      <el-col :span="11">
                        <div style="text-align:center;">
                          <!-- padding:6px 0 -->
                          综合得分: {{article.Score}}
                        </div>
                      </el-col>
                      <el-col :span="3"></el-col>
                      <el-col :span="2">
                        <div style="text-align:center">
                          <el-avatar
                            :size="30"
                            style="margin:4px 4px 0 0"
                            :src="headUrl + article.Avatar"
                          ></el-avatar>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div style="text-align:center">
                          <el-button
                            type="text"
                            class="name"
                            @click="visit(article.UserName)"
                          >{{article.UserName}}</el-button>
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
              <el-button
                type="text"
                icon="el-icon-right"
                @click="jumpTo('Animation')"
                class="more"
              >更多</el-button>
            </div>
            <el-row :gutter="20" style="margin-bottom:20px">
              <el-col v-for="(article,index) in animationList" :key="index" :span="6">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-button type="text" @click="tDetail(article.Article.tid)">
                    <el-image fit="contain" class="image" :src="url + article.Article.cover"></el-image>
                  </el-button>
                  <div style="padding: 4px;">
                    <div style="text-align:center">
                      <el-button
                        type="text"
                        class="button content"
                        @click="tDetail(article.Article.tid)"
                      >{{article.Article.title}}</el-button>
                    </div>
                    <el-row style="margin-bottom:6px">
                      <el-col :span="12">
                        <div
                          style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px"
                        >{{article.Article.create_time.split(' ')[0]}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div style="text-align:center">
                          <el-button
                            type="text"
                            class="name"
                            @click="visit(article.UserName)"
                          >{{article.UserName}}</el-button>
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
              <el-button type="text" icon="el-icon-right" @click="jumpTo('Comic')" class="more">更多</el-button>
            </div>
            <el-row :gutter="20" style="margin-bottom:20px">
              <el-col v-for="(article, index) in comicList" :key="index" :span="6">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-button type="text" @click="tDetail(article.Article.tid)">
                    <el-image fit="contain" class="image" :src="url + article.Article.cover"></el-image>
                  </el-button>
                  <div style="padding: 6px;">
                    <div style="text-align:center">
                      <el-button
                        type="text"
                        class="button"
                        @click="tDetail(article.Article.tid)"
                      >{{article.Article.title}}</el-button>
                    </div>
                    <el-row style="margin-bottom:10px">
                      <el-col :span="12">
                        <div
                          style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px"
                        >{{article.Article.create_time.split(' ')[0]}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div style="text-align:center">
                          <el-button
                            type="text"
                            class="name"
                            @click="visit(article.UserName)"
                          >{{article.UserName}}</el-button>
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
              <el-button type="text" icon="el-icon-right" @click="jumpTo('Game')" class="more">更多</el-button>
            </div>
            <el-row :gutter="20" style="margin-bottom:20px">
              <el-col v-for="(article, index) in gameList" :key="index" :span="6">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <el-button type="text" @click="tDetail(article.Article.tid)">
                    <el-image fit="contain" class="image" :src="url + article.Article.cover"></el-image>
                  </el-button>
                  <div style="padding: 6px;">
                    <div style="text-align:center">
                      <el-button
                        type="text"
                        class="button"
                        @click="tDetail(article.Article.tid)"
                      >{{article.Article.title}}</el-button>
                    </div>
                    <el-row style="margin-bottom:10px">
                      <el-col :span="12">
                        <div
                          style="text-align:center;padding:4px 0;font-weight:lighter;font-size:14px"
                        >{{article.Article.create_time.split(' ')[0]}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div style="text-align:center">
                          <el-button
                            type="text"
                            class="name"
                            @click="visit(article.UserName)"
                          >{{article.UserName}}</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <el-backtop :visibility-height="120" :right="100" :bottom="100">
        <i class="el-icon-s-promotion"></i>
      </el-backtop>
    </el-main>

    <el-footer>
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script>
import Navigation from "./Navigation";
import Login from "./Login";
import MyFooter from "./MyFooter";
import { mapState } from "vuex";
export default {
  components: {
    Login,
    Navigation,
    MyFooter,
  },
  computed: {
    ...mapState({
      token: (state) => state.users.token,
      // totalTop: state => state.articles.totalTop,
      // totalTopName: state => state.articles.totalTopName,
    }),
  },
  mounted() {
    this.$axios.get(this.api + "article/getTopArticle").then((res) => {
      this.loading = false;
      this.totalTop = res.data.totalTop;
      this.new7 = res.data.new7;
      this.new31 = res.data.new31;
      for (let i = 0; i < 3; i++) {
        // 总榜
        this.top3.push(this.totalTop[i]);
      }
      this.new7 = this.new7.slice(0, 5); // 周榜(切取0-5——不包括5——位置的元素，不足5个全取)
      this.new31 = this.new31.slice(0, 5); // 月榜
      this.newest = this.new7; // 设置轮播图展示的具体是周榜还是月榜
    });
    this.$axios.get(this.api + "article/getAllArticle").then((res) => {
      // 获取每个话题下的帖子
      this.animationList = res.data.animationList; // 后台已经完成排序和剪切，只发送最新的4篇，下同
      this.comicList = res.data.comicList;
      this.gameList = res.data.gameList;
    });
  },
  data() {
    return {
      headUrl: this.api + "user/getavatar?username=",
      url: this.api + "article/getcover?cover=",
      totalTop: [],
      new7: [],
      new31: [],
      top3: [],
      newest: [], // 存放最近7天或31天内的最热帖子
      hot7or31: true,
      toplist: "周榜",
      animationList: [],
      comicList: [],
      gameList: [],
      loading: true,
    };
  },
  methods: {
    switchList() {
      // 切换榜单
      if (this.hot7or31) {
        this.newest = this.new7;
        this.toplist = "周榜";
      } else {
        this.newest = this.new31;
        this.toplist = "月榜";
      }
    },
    jumpTo(val) {
      this.$router.push("./topic/" + val);
    },
    visit(val) {
      if (val == this.token.user_name)
        this.$store.commit("myPost", { visit: false, token: this.token });
      else this.$store.dispatch("visit", val);
    },
    tDetail(val) {
      this.$router.push("/details/" + val);
    },
    compare(key, desc) {
      // 封装一个数组排序方法
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
    formatDate(val) {
      // 格式化时间，参数时间类型
      if (val == null) return;
      let y = val.getFullYear();
      let m = val.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = val.getDate();
      d = d < 10 ? "0" + d : d;
      let h = val.getHours();
      h = h < 10 ? "0" + h : h;
      let min = val.getMinutes();
      min = min < 10 ? "0" + min : min;
      let s = val.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
    },
    unique(array) {
      // 数组元素去重
      var r = [];
      for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) if (array[i] == array[j]) j == ++i;
        r.push(array[i]);
      }
      return r;
    },
  },
};
</script>

<style scoped>
.el-footer {
  background: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  padding: 0;
  /* line-height: 16px; */
  margin-top: 60px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  padding-bottom: 20px;
}
.button {
  color: #333;
  font-weight: 600;
  padding: 8px 0;
}
.name {
  font-size: 16px;
  color: #333;
  padding: 0px 0 0 4px;
}
.more {
  color: #333;
  float: right;
  padding: 3px 10px;
}
.more:hover {
  padding: 3px 0px;
}
.card_title {
  height: 60px;
  line-height: 60px;
  background-color: #6699cc20;
  margin: 0 20px 20px 20px;
  /* vertical-align: middle; */
  color: black;
  padding-left: 10px;
  /* font-size: 20px; */
  /* font-weight: bold; */
  border-bottom: none;
  transition: all 0.35s;
}
.card_title:hover {
  padding-left: 20px;
  color: #409eff;
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