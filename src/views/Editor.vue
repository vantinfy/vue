<template>
    <div>
        <div id="e"></div>
        <div id="counter">Characters: {{ counter }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import E from "wangeditor"
    export default {
        components: {
            E,
        },
        model: {
            prop: 'desc',
            event:'change'
        },
        props:{
            desc:{
                type: String,
                default: ""
            },
            // 业务中经常会有添加操作和编辑操作，添加操作时，需要清除上一操作留下的缓存
            isClear:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                counter: 0,
                editor: '',
                info_: ''
            }
        },
        watch: {
            editor: {
                handler(newV, oldV){
                    // console.log(newV.txt.text(), "--change>>", newV.txt.text().replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').length)
                    this.counter = newV.txt.text().replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').length
                    // if (this.counter == 10 ){
                    //     this.editor.$textElem.attr('contenteditable', false)
                    //     return
                    // }
                    // console.log(newV.txt.html())
                },
                deep:true
            },
            //判断用户是否清除编辑器缓存
            isClear(val){
                //   console.log(val)
                if (val){
                    this.editor.txt.clear()
                }
            },
            //接收父组件传递过来的值
            desc(value) {
                // console.log("desc", value)
                // 判断父组件传递过来的值跟当前编辑器内容是否一样
                if (value != this.editor.txt.html()) {
                    this.editor.txt.html(this.desc)
                }
            }
        },
        computed: {
            // counter() {
            //     return this.editor.tex.text()
            // }
            ...mapState({
                draftForm: state => state.articles.draftForm,
            })
        },
        mounted(){
            this.editor = new E('#e')
            this.editor.config.onchangeTimeout = 1000 // 单位 ms
            this.editor.config.menus = [
                // 'head',  // 标题
                'fontSize',  // 字号
                'bold',  // 粗体
                // 'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'indent', // 缩进
                // 'lineHeight', // 行高
                'foreColor',  // 文字颜色
                // 'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                // 待办事项 todo
                'justify',  // 对齐方式
                // 'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                // 'table',  // 表格
                // 'video',  // 插入视频
                // 'code',  // 插入代码
                'splitLine', // 分割线 splitLine
                'undo',  // 撤销
                'redo'  // 重复
            ]
            // 隐藏插入网络图片选项
            this.editor.config.showLinkImg = false
            // 本地图片选项以下二选一即可
            this.editor.config.uploadImgShowBase64 = true   // 使用 base64 保存图片，使用这种方式可以将图片插入到内容中
            // this.editor.config.uploadFileName = 'file'
            // editor.config.uploadImgServer = '/upload'  // 上传图片到服务器，要先配好目标接口
            // 图片大小限制为 15M
            this.editor.config.uploadImgMaxSize = 15 * 1024 * 1024
            // 配置编辑区域的z-index，默认1000
            this.editor.config.zIndex = 1
            // 全屏按钮开关
            this.editor.config.showFullScreen = true;
            this.editor.create()
            // 禁用编辑功能 false
            this.editor.$textElem.attr('contenteditable', true)

            this.editor.config.onchange = (html) => {
                this.info_ = html // 绑定当前组件地值
                this.$emit('change', this.info_) // 将内容同步到父组件中
            }
            // this.$store.commit('setDraftEditor', this.editor)
            this.editor.txt.html(this.draftForm.content)
            // console.log(editor.config.menus)
        },
        methods: {
            name() {
                //
            }
        },
    }
</script>

<style scoped>
#counter {
  border: 1px solid #ccc;
  border-top: 0;
  /* padding: 0.5rem 1rem; */
  padding: 2px 10px;
  text-align: right;
  /* margin-bottom: 10px */
}
</style>