<template>
  <div>
    <navigation></navigation>
    <div style="margin-top:60px;background-color: #E9EEF3;" @click.stop>
      <!-- 这里的@click.stop可加可不加 -->
      <!-- https://blog.csdn.net/w390058785/article/details/83380166 -->
      <el-row type="flex">
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <el-card shadow="never" style="margin:40px 0;padding:0">
            <div style="font-weight:bolder">发布帖子</div>
            <el-divider></el-divider>
            <el-form
              label-width="10%"
              style="padding: 0 24px 20px 24px"
              :rules="rules"
              ref="draftForm"
              :model="draftForm"
            >
              <el-form-item label="标题：" style="margin:0 0 30px 0" prop="title">
                <el-input
                  v-model="draftForm.title"
                  placeholder="标题（必填）"
                  maxlength="30"
                  show-word-limit
                  style="margin-right:60px"
                ></el-input>
              </el-form-item>
              <el-form-item label="内容：" style="margin:16px 0" prop="content">
                <editor v-model="draftForm.content" :isClear="isClear"></editor>
                <!-- <iframe src="http://localhost:8090/article/getcontent" frameborder="0" style="height:300px;width:100%;background-color:pink">
                    {{newArticle}}你好
                </iframe>-->
              </el-form-item>
              <el-form-item label="话题：" style="margin-bottom:6px" prop="topic">
                <el-radio-group v-model="draftForm.topic">
                  <el-radio label="Animation">Animation</el-radio>
                  <el-radio label="Comic">Comic</el-radio>
                  <el-radio label="Game">Game</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="封面：" style="margin-bottom:16px" prop="cover">
                <el-upload
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  :auto-upload="false"
                  action="/"
                  list-type="picture"
                  :limit="1"
                  name="上传图片文件"
                  style="color:blue"
                  :on-change="uploadChange"
                  :on-exceed="handleExceed"
                  :on-remove="handleRemove"
                >
                  <div style="font-size:13px">封面图片大小不超过15M（必选）</div>
                </el-upload>
              </el-form-item>
            </el-form>

            <div style="text-align:right">
                <el-tooltip content="预览" placement="top">
                    <el-switch
                        v-model="preview"
                        inactive-color="#909399"
                        style="margin-bottom:10px"
                    ></el-switch>
                </el-tooltip>
            </div>
            <el-image
              :src="url"
              v-show="!imgNull"
              style="height:200px;margin:10px 0 20px 0;width:100%"
              fit="contain"
            ></el-image>

            <div>
                <el-dialog :visible.sync="preview">
                    <div style="font-size:18px;text-align:center">
                        {{draftForm.title}}
                    </div>
                    <el-divider></el-divider>
                    <el-image
                        :src="url"
                        v-show="!imgNull&&preview"
                        style="height:200px;margin-top:10px;width:100%"
                        fit="contain"
                    ></el-image>
                    <el-divider></el-divider>
                    <div v-html="newArticle" v-show="preview" style="height:auto;margin-bottom:20px" class="commentFutext"></div>
                </el-dialog>
            </div>
            <!-- <div v-html="newArticle" v-show="preview" style="height:auto;max-height:400px;overflow: scroll;background-color:lightgrey;margin-bottom:20px"></div> -->
            <!-- <div style="height:auto;background-color:lightgrey">
                {{newArticle}}
            </div>-->
            <div style="text-align:center">
              <el-button
                style="height:50px; width:140px;font-size:18px;margin-right:40px"
                type
                @click="publish('draftForm', 1)"
              >存为草稿</el-button>
              <el-button
                style="height:50px; width:140px;font-size:18px;margin-left:40px"
                type="primary"
                @click="publish('draftForm', 0)"
              >发布</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>

    <el-dialog :visible.sync="dialogVisible" style="text-align:center" width="36%">
      <div style="font-size:18px;margin:20px 0 10px 0">内容还未保存</div>
      <div style="font-size:18px">确定要离开当前页面？</div>
      <div slot="footer" style="text-align:center">
        <el-button @click="dialogVisible = false" style="margin-right:40px">取 消</el-button>
        <el-button type="primary" @click="confirmLeave(true)" style="margin-left:40px">离 开</el-button>
      </div>
    </el-dialog>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Navigation from "./Navigation";
import MyFooter from "./MyFooter";
import { mapState } from "vuex";
import Editor from "./Editor";
import axios from "axios";

export default {
  components: {
    Navigation,
    MyFooter,
    Editor,
  },
  computed: {
    ...mapState({
      token: (state) => state.users.token,
      draftForm: (state) => state.articles.draftForm,
    }),
  },
  watch: {
    draftForm: {
      handler(val, old) {
        this.newArticle = val.content;
        this.$store.commit("setDraftForm", val);
      },
      deep: true,
    },
  },
  mounted() {
    if (this.token == ''){
      this.$message.warning("要先登录才能发布评论哦")
      this.$router.go(-1)
    }
    this.originForm = Object.assign(this.originForm, this.draftForm); // 直接用=赋值this.originForm，是应用类型，需要用复制（深拷贝）的方法
    if (this.draftForm.cover != "") {
      this.url = this.url + this.draftForm.cover;
      this.imgNull = false;
    }
    if (this.token != "") {
      if (
        new Date(this.token.state.replace(/-/g, "/")).getTime() >
        new Date().getTime()
      ) {
        alert(
          "您因为违规行为已被临时封禁，具体恢复时间请到个人空间查看\n如对封禁有异议亦可在个人空间申诉"
        );
        return;
      }
    } else this.$message.warning("请先登录再操作");
  },
  data() {
    let titlePatter = /^(\n|\s)+$/; // 正则表达式
    let contnetPatter = /^\s+$/;
    let TitleNotEmpty = (rule, value, callback) => {
      if (titlePatter.test(value)) {
        return callback(new Error("内容不能为全空"));
      } else callback();
    };
    let ContentNotEmpty = (rule, value, callback) => {
      if (
        contnetPatter.test(
          value
            .replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g, "")
            .replace(/&nbsp;/g, " ")
        )
      ) {
        return callback(new Error("内容不能全为空"));
      } else callback();
    };
    return {
      url: "http://localhost:8090/article/getcover?cover=",
      imgNull: true, // 对尚未上传封面的帖子，不预览封面
      coverChange: false, // 记录用户修改帖子的时候有没有更换封面
      isClear: false, // 清除富文本编辑器内容
      preview: false, // 开启预览功能
      newArticle: "这是预览",
      originForm: {
        // 将页面创建时的draftForm存放在这里，用于离开页面（路由跳转）时提示用户保存
        title: "",
        topic: "",
        cover: "",
        content: "",
        isNewArticle: "",
      },
      toPath: "", // 用户要去的下一个路由
      coverFileList: "",
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: "请输入帖子标题", trigger: "blur" },
          { validator: TitleNotEmpty },
        ],
        content: [
          {
            required: true,
            message: "请输入帖子内容",
            trigger: ["blur", "change"],
          },
          { validator: ContentNotEmpty },
        ],
        topic: [
          { required: true, message: "请选择帖子所属话题", trigger: "change" },
        ],
        cover: [{ required: true, message: "请上传帖子封面" }],
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.originForm.content == this.draftForm.content) {
      next();
    } else {
      // 内容发生了更改
      this.dialogVisible = true;
      this.toPath = to.path; // 把要去的路由存起来
    }
  },
  methods: {
    confirmLeave() {
      // 仍然离开此页面
      this.originForm = Object.assign(this.originForm, this.draftForm);
      this.$router.push(this.toPath);
    },
    uploadChange(file, fileList) {
      this.draftForm.cover = file;
      // console.log(this.cover)
      this.coverFileList = fileList;
      this.coverChange = true;
      this.imgNull = false;
      this.url = file.url;
      if (fileList.length == 1) {
        let { cover, ...data } = this.rules;
        this.rules = data;
        this.$refs.draftForm.clearValidate("cover");
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多选择 1 个文件`);
    },
    handleRemove(file, fileList) {
      // console.log(this.cover)
      if (fileList.length == 0) {
        this.draftForm.cover = null;
        this.imgNull = true;
        this.rules.cover = [
          { required: true, message: "请上传帖子封面", trigger: "change" },
        ];
      }
      // 文件删除后也要触发验证,validateField是触发部分验证的方法,参数是prop设置的值
      this.$refs.draftForm.validateField("cover");
      // console.log(file, fileList);
    },
    publish(val, isDraft) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          let params = new FormData();
          params.append("content", this.draftForm.content);
          params.append("uid", this.token.uid);
          params.append("title", this.draftForm.title);
          params.append("topic", this.draftForm.topic);
          params.append("file", this.draftForm.cover.raw);
          params.append("draft", isDraft); // 保存草稿或直接发布
          params.append("coverChange", this.coverChange);
          params.append("isNewArticle", this.draftForm.isNewArticle);
          let config = {
            headers: { "Content-Type": "multipart/form-data" },
          };
          axios
            .post("http://localhost:8090/article/upContent", params, config)
            .then((res) => {
              this.newArticle = res.data.content;
              if (res.data.successPublish) {
                this.$message.success(res.data.msg);
                this.originForm = Object.assign(
                  this.originForm,
                  this.draftForm
                ); // 表示已经保存，可以跳转到别的路由——因为配置了router.beforeEach拦截着
                this.$store.commit("myPost", {
                  visit: false,
                  token: this.token,
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          console.log("submit");
        } else {
          console.log("表单数据不完整");
          return false;
        }
      });
    },
  },
};
</script>


<style type="text/css">
/* 添加“scoped”属性以将CSS仅限于此组件 */
#counter {
  border: 1px solid #ccc;
  border-top: 0;
  /* padding: 0.5rem 1rem; */
  padding: 2px 10px;
  text-align: right;
  /* margin-bottom: 10px */
}
.el-divider--horizontal {
  margin: 16px 0 20px 0;
  background: 0 0;
  border-top: 1px solid #e8eaec;
}
#e .w-e-text-container{
    height: 400px !important;
}
</style>