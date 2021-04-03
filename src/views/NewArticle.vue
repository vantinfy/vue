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
                        <div style="font-weight:bolder">
                            发布帖子
                        </div>
                        <el-divider></el-divider>
                        <el-form label-width="10%" style="padding: 0 24px 20px 24px" :rules="rules" ref="draftForm" :model="draftForm">
                            <el-form-item label="标题："  style="margin:0 0 30px 0" prop="title">
                                <el-input v-model="draftForm.title" placeholder="标题（必填）" maxlength="30" show-word-limit style="margin-right:60px"></el-input>
                            </el-form-item>
                            <el-form-item label="内容："  style="margin:16px 0" prop="content">
                                <editor v-model="draftForm.content" :isClear="isClear" ></editor>
                                <!-- <iframe src="http://localhost:8090/article/getcontent" frameborder="0" style="height:300px;width:100%;background-color:pink">
                                    {{newArticle}}你好
                                </iframe> -->
                                <!-- <div v-html="newArticle" style="height:auto;background-color:lightgrey"></div> -->
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
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    :auto-upload="false"
                                    action="/"
                                    list-type="picture"
                                    :limit="1"
                                    name="上传图片文件"
                                    style="color:blue"
                                    :on-change="uploadChange"
                                    :on-exceed="handleExceed"
                                    :on-remove="handleRemove">
                                    <div style="font-size:13px">
                                        封面图片大小不超过15M（必选）
                                    </div>
                                </el-upload>
                                <el-image :src="url" v-show="!imgNull" style="height:200px;margin-top:10px;width:100%" fit="contain"></el-image>
                            </el-form-item>
                        </el-form>
                        <!-- <div>
                            <div id="toolbar">
                                <span class="ql-formats">
                                    <button class="ql-bold"></button>
                                    <button class="ql-italic"></button>
                                    <button class="ql-underline"></button>
                                    <button class="ql-strike"></button>
                                </span>
                                <span class="ql-formats">
                                    <button class="ql-color"></button>
                                    <button class="ql-blockquote"></button>
                                    <button class="ql-code-block"></button>
                                </span>
                                <span class="ql-formats">
                                    <button class="ql-header" value="1"></button>
                                    <button class="ql-header" value="2"></button>
                                    <button class="ql-list" value="bullet"></button>
                                    <button class="ql-align"></button>
                                </span>
                                <span class="ql-formats">
                                    <button class="ql-link"></button>
                                    <button class="ql-image"></button>
                                    <button @click="toogleDialogEmoji" id="emoji">😃</button>
                                </span>
                                <span class="ql-formats">
                                    <button class="ql-clean"></button>
                                </span>
                            </div>
                            <div v-if="!dialogHidden">
                                <VEmojiPicker labelSearch="Search" @select="onSelectEmoji" style="z-index:99;overflow-y:auto;overflow-x:hidden"/>
                            </div>
                            <div id="editor" style=""></div>
                            <div id="counter">Characters: {{ counter }}</div>
                            {{myEditor}}
                        </div> -->
                        <div style="text-align:center">
                            <el-button style="height:50px; width:140px;font-size:18px;margin-right:40px" type="" @click="publish('draftForm', 1)">存为草稿</el-button>
                            <el-button style="height:50px; width:140px;font-size:18px;margin-left:40px" type="primary" @click="publish('draftForm', 0)">发布</el-button>
                        </div>
                        <!-- <quill-editor v-model="newArticle" :options="editorOption">
                        </quill-editor> -->
                    </el-card>
                </el-col>
                <el-col :span="4"></el-col>
            </el-row>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import Navigation from './Navigation'
import MyFooter from './MyFooter'
import {mapState} from 'vuex'
import Editor from './Editor'
import Quill from "quill";
import axios from 'axios';
// import { Quill, quillEditor } from 'vue-quill-editor'
// import quillEmoji from 'quill-emoji'
// import 'quill-emoji/dist/quill-emoji.css'
// Quill.register('modules/quillEmoji', quillEmoji)

/**
 * 富文本vue-quill-editor 组件
 * name wangkai
 *-------------------设置文档----------------
 *---------- 1、toolbar工具栏-模块名----------
 *  background  --------------  背景颜色
 *  bold  --------------------  加粗
 *  color --------------------  颜色
 *  font  --------------------  字体
 *  code  --------------------  内联代码
 *  italic  ------------------  斜体
 *  link  --------------------  链接
 *  size  --------------------  大小
 *  strike  ------------------  删除线
 *  script  ------------------  上标/下标
 *  underline  ---------------  下划线
 *  blockquote  --------------  引用
 *  header  ------------------  标题
 *  indent  ------------------  缩进
 *  list  --------------------  列表
 *  align  -------------------  文本对齐
 *  direction  ---------------  文本方向
 *  code-block  --------------  代码块
 *  formula  -----------------  公式
 *  image  -------------------  图片
 *  video  -------------------  视频
 *  clean  -------------------  清除字体样式
 */
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
    [{'header': 1}, {'header': 2}],    // custom button values
    // [{'list': 'ordered'}, {'list': 'bullet'}],
    // [{'indent': '-1'}, {'indent': '+1'}],   // outdent/indent
    // [{'direction': 'rtl'}],       // text direction
    // [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
    // [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, ],   // dropdown with defaults from theme
    // [{'color': []}, {'background': []}],   // dropdown with defaults from theme
    // [{'font': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean'], // 清除所有格式回到纯文本状态
]
    export default {
        components: {
            Navigation,
            MyFooter,
            Editor,
            // quillEditor
        },
        computed: {
            ...mapState({
                token: state => state.users.token,
                draftForm: state => state.articles.draftForm,
            }),
            emojisNative() {
                return packEmoji;
            },
        },
        watch:{
            draftForm:{
                handler(val, old){
                    // if(this.data.length - 1 == 3){
                    //     this.editor.$textElem.attr('contenteditable', false)
                    //     console.log("out")
                    // }
                    // console.log(val)
                    this.newArticle = val.content
                    this.$store.commit('setDraftForm', val)
                    // console.log(val)
                },
                deep: true
            }
        },
        mounted () {
            // this.$store.dispatch('getDraft', this.form)
            if(this.draftForm.cover != ''){
                this.url = this.url + this.draftForm.cover
                this.imgNull = false
            }
            if (this.token != ''){
                if (new Date(this.token.state.replace(/-/g, '/')).getTime() > new Date().getTime()){
                    alert("您因为违规行为已被临时封禁，具体恢复时间请到个人空间查看\n如对封禁有异议亦可在个人空间申诉")
                    return
                }
            }else
                this.$message.warning("请先登录再操作")
            // 实现表情列表出现后点击列表外的地方隐藏
            // document.body.addEventListener('click',()=>{
            //     this.dialogHidden = true;
            // }, true)
            let options = {
                modules: {
                    toolbar: "#toolbar"
                },
                placeholder: "输入内容\n\nTips:可以在Word中编辑排版后将内容复制粘贴到此处哦(￣▽￣)ノ",
                theme: "snow"
            };
            // this.editor = new Quill(document.getElementById('editor'), options)
        },
        data() {
            let titlePatter = /^(\n|\s)+$/; // 正则表达式
            let contnetPatter = /^\s+$/
            let TitleNotEmpty = (rule, value, callback) => {
                if (titlePatter.test(value)) {
                    return callback(new Error('内容不能为全空'))
                } else
                    callback()
            }
            let ContentNotEmpty = (rule, value, callback) => {
                if (contnetPatter.test(value.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g, '').replace(/&nbsp;/g,' '))){
                    return callback(new Error('内容不能全为空'))
                }else
                    callback()
            }
            return {
                url: 'http://localhost:8090/article/getcover?cover=',
                imgNull: true,
                coverChange: false,// 记录用户修改帖子的时候有没有更换封面
                isClear: false, // 清除富文本编辑器内容
                myEditor: '',
                newArticle: '你好哈哈哈哈哈',
                form: {
                    title: '',
                    topic: '',
                    cover: '',
                    content: '',
                },
                coverFileList: '',
                editor: null,
                dialogHidden: true,
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                editorOption: {
                    theme: 'snow', // or 'bubble'
                    placeholder: 'Text here...',
                    modules: {
                        toolbar: {
                            'emoji-toolbar': true,
                            'emoji-shortname': true,
                            container: ['link', 'image', 'emoji'],
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            },
                        }
                    }
                },
                rules: {
                    title:[
                        {required: true, message: '请输入帖子标题', trigger: 'blur'},
                        { validator: TitleNotEmpty}
                    ],
                    content:[
                        {required: true, message: '请输入帖子内容', trigger: ['blur', 'change']},
                        { validator: ContentNotEmpty}
                    ],
                    topic:[
                        {required: true, message: '请选择帖子所属话题', trigger: 'change'}
                    ],
                    cover:[
                        {required: true, message: '请上传帖子封面'}
                    ],
                },
            }
        },
        methods: {
            toogleDialogEmoji() {
                this.dialogHidden = !this.dialogHidden;
            },
            onSelectEmoji(dataEmoji) {
                // console.log(dataEmoji)
                // 获取编辑器光标位置
                let length = this.editor.selection.savedRange.index;
                this.editor.insertText(length, dataEmoji.data);
                this.toogleDialogEmoji();
                console.log(this.editor.getContents())
            },
            onEditorFocus(val,editor){ // 富文本获得焦点时的事件 @focus="onEditorFocus($event)
                console.log(val); // 富文本获得焦点时的内容
                editor.enable(false); // 在获取焦点的时候禁用
            },
            uploadChange(file, fileList){
                this.draftForm.cover = file;
                // console.log(this.cover)
                this.coverFileList = fileList;
                this.coverChange = true
                this.imgNull = false
                this.url = file.url
                if(fileList.length == 1){
                    let {cover, ...data} = this.rules;
                    this.rules = data;
                    this.$refs.draftForm.clearValidate('cover');
                }
                // this.$refs.form.validateField('fileList')
            },
            handleExceed(files, fileList) {
                this.$message.warning(`最多选择 1 个文件`);
            },
            handleRemove(file, fileList) {
                // console.log(this.cover)
                if(fileList.length == 0){
                    this.draftForm.cover = null
                    this.imgNull = true
                    this.rules.cover = [{ required: true, message: '请上传帖子封面', trigger: 'change'}];
                }
                // this.form.fileList.splice()
                // 文件删除后也要触发验证,validateField是触发部分验证的方法,参数是prop设置的值
                this.$refs.draftForm.validateField('cover')
                // console.log(file, fileList);
            },
            publish(val,isDraft){
                // console.log(this.form.content)
                this.$refs[val].validate((valid) => {
                    if(valid){
                        let params = new FormData()
                        params.append('content', this.draftForm.content)
                        params.append('uid', this.token.uid)
                        params.append('title', this.draftForm.title)
                        params.append('topic', this.draftForm.topic)
                        params.append('file', this.draftForm.cover.raw)
                        params.append('draft', isDraft) // 保存草稿或直接发布
                        params.append('coverChange', this.coverChange)
                        params.append('isNewArticle', this.draftForm.isNewArticle)
                        let config = {
                            headers:{'Content-Type':'multipart/form-data'}
                        }
                        // console.log(this.editor.getText())
                        axios.post('http://localhost:8090/article/upContent',params,config).then(res => {
                            // console.log(res)
                            this.newArticle = res.data.content
                            if(res.data.successPublish){
                                this.$message.success(res.data.msg)
                            }else{
                                this.$message.error(res.data.msg)
                            }
                            // this.editor.setText(this.newArticle)
                            // this.editor.setText(res.data.content)
                            // console.log(this.editor.getText())
                        })
                        console.log("submit")
                    }else {
                        console.log('表单数据不完整');
                        return false;
                    }
                })
            },
        },
    }
</script>


<style scoped>
/* 添加“scoped”属性以将CSS仅限于此组件 */
#counter {
  border: 1px solid #ccc;
  border-top: 0;
  /* padding: 0.5rem 1rem; */
  padding: 2px 10px;
  text-align: right;
  /* margin-bottom: 10px */
}
.el-divider--horizontal{
     margin: 16px 0 20px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 }
</style>