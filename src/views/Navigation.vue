<template>
    <div>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-button type="text" class="btn" @click="index">主站</el-button>
                    <el-button type="text" class="btn" @click="create">发布</el-button>

                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-button type="text" class="btn" style="margin:0 10px">消息</el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">                            
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_sys()">系统通知</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_cment()">评论</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" @click="msg_follow()">关注</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="text" class="btn" @click="book()">收藏</el-button>
                    <el-button type="text" v-show="token.level > 0" class="btn" @click="manage()">管理</el-button>
                </el-col>
            
                <!-- 搜索框以及抽屉(在header外) -->
                <el-col :span="8">
                    <el-button @click="drawer = true" icon="el-icon-my-search" circle></el-button>
                </el-col> 

                <el-col :span="8">
                    <el-dropdown placment="bottom-start">
                        <span class="el-dropdown-link">
                            <el-button v-show="!isLogin" icon="el-icon-user" circle></el-button>
                            <el-button type="text">
                                <el-avatar :size="40" fit="cover" :src="headUrl" v-show="isLogin">
                                </el-avatar>
                            </el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div style="text-align:center;margin:10px 0;color:black" v-show="isLogin">
                                {{token.user_name}}
                            </div>                         
                            <el-dropdown-item  v-show="!isLogin">
                                <el-button type="text" @click="login()" style="text-align:right">登录/注册</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item  v-show="isLogin">
                                <el-button type="text" @click="userspace()">个人中心</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item divided v-show="isLogin">
                                <el-button type="text" @click="exit()">退出登录</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                
            </el-row>
        </el-header>

        <el-drawer
            :visible.sync="drawer"
            :direction="direction"
            size="40%"
            style="text-align:center">
            <span style="margin:0;">想要找点什么呢？</span>
            <el-row>
                <el-col>
                    <el-input
                        placeholder="搜索"
                        clearable
                        size="medium"
                        v-model="input_search"
                        @keyup.enter.native="search(input_search)"
                        style="width:30%;margin-top:10px">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </el-drawer>
        <el-dialog title="发布帖子" :visible.sync="newArticle">
            <quill-editor v-model="publish" options="">
            </quill-editor>
            <!-- rules用于表单信息的校验(form-item的prop为需要检验的字段名) -->
            <!-- <el-form :model="formRef" :rules="rules" ref="formRef" id="formData">
                <el-form-item label="封面" :label-width="formLabelWidth" style="margin-bottom:16px" prop="fileList">
                    <el-upload
                        accept="image/jpeg,image/png,image/gif"
                        :auto-upload="false"
                        action="/empty"
                        list-type="picture-card"
                        :limit="1"
                        :file-list="fileList"
                        name="上传图片文件"
                        :on-change="uploadChange"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :before-upload="beforeCoverUpload"
                        :on-success="handleSuccess">
                        <div style="font-size:13px">
                            图片大小不超过15M
                        </div>
                    </el-upload> -->
                    <!-- <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->
                    
                    <!-- <div id="myPhoto" v-show="personalPhoto">
                        <div class="viewPhoto">
                            <img src="" alt="" id="portrait" style="width: 80px;height: 80px" />
                        </div>
                        <div class="listBox">
                            <dl>
                                <dt>请上传图片</dt>
                                <dd>
                                    <input type="file" id="saveImage" name="myphoto" @change="great()">
                                </dd>
                            </dl>
                        </div>
                        <div class="save">
                            <input type="button" value="保存图片" @click="imageSubmit">
                        </div>
                    </div> -->

                <!-- </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth" style="margin-bottom:16px" prop="title">
                    <el-input v-model="formRef.title" placeholder="标题" maxlength="30" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" style="margin-bottom:6px" prop="text">
                    <el-input v-model="formRef.text" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="内容" maxlength="3000" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="话题" :label-width="formLabelWidth" style="margin-bottom:6px" prop="radio">
                    <el-radio-group v-model="formRef.radio">
                    <el-radio label="Animation">Animation</el-radio>
                    <el-radio label="Comic">Comic</el-radio>
                    <el-radio label="Game">Game</el-radio>
                </el-radio-group>
                </el-form-item>
            </el-form> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="newArticle = false">取 消</el-button>
                <el-button type="primary" @click="submit('formRef')">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        computed: mapState({
            usr: state => state.users.usr,
            token: state => state.users.token,
            activeName: state => state.spacelist.activeName,
        }),
        mounted(){
            // axios.get('http://localhost:8090/user/getlogin',{
            //     params:{
            //             token: this.$store.token,
            //         }
            // }).then(res => {
            //         console.log(res)
            //         if(res.data.isLogin){
            //             this.isLogin = true
            //         }else{
            //             this.isLogin = false
            //         }
            //     })
            // console.log((new Date().getTime() + 120 * 60 * 1000))
            // if(parseInt(this.token.split("-")[2])+ 120 * 60 * 1000<(new Date().getTime() + 60 * 60 * 1000)||this.token=='')
            if(this.token == '')
                this.isLogin = false//登录信息失效
            else{
                this.isLogin = true
                if (this.token.avatar != null)
                    this.headUrl = 'http://localhost:8090/user/getavatar?username=' + this.token.avatar
            }
            // this.great()
        },
        data(){
            let patter = /^(\n|\s)+$/; // 正则表达式
            let NotEmpty = (rule, value, callback) => {
                if (patter.test(value)) {
                    return callback(new Error('内容不能为全空'))
                } else {
                    callback()
                }
            };
            return{
                drawer: false,
                direction: 'ttb',
                input_search:'',
                isLogin: false,
                headUrl: null,
                newArticle: false,
                fileList: [],
                publish: '',
                formRef:{
                    title: '',
                    text: '',
                    radio: '',
                },
                formLabelWidth: '60px',
                // personalPhoto: true,
                dialogImageUrl: '',
                dialogVisible: false,
                rules:{
                    fileList:[
                        {required: true, message: '请上传帖子封面', trigger: 'change'}
                    ],
                    title:[
                        {required: true, message: '请输入帖子标题', trigger: 'blur'},
                        { validator: NotEmpty}
                    ],
                    text:[
                        {required: true, message: '请输入帖子内容', trigger: 'blur'},
                        { validator: NotEmpty}
                    ],
                    radio:[
                        {required: true, message: '请选择帖子所属话题', trigger: 'change'}
                    ],
                },
                codeFile: '',
                codeFileList: '',
            }
        },
        methods:{
            index(){
                if(this.$route.path != '/'){    // 注意route与router不同
                    this.$router.push('/')
                    // window.location.reload()
                }else{
                    this.$router.go(0)// 刷新页面
                }
            },
            create(){
                if (this.isLogin){
                    this.newArticle = true
                }else{
                    this.$message.warning(`请先登录再操作`);
                }
            },
            msg_sys(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'system_notice'})
            },
            msg_cment(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'comment_notice'})
            },
            msg_follow(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myMessage',{token:this.token, type:'subscribe_notice'})
            },
            book(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                this.$store.commit('myBook', {visit: false, token: this.token})
            },
            manage(){
                this.$router.push('/management/user_manage')
            },
            login(){
                this.$router.push('/login')
            },
            userspace(){
                if(!this.isLogin){
                    this.$message.warning(`请先登录再操作`);
                    return
                }
                // this.$store.dispatch('getMySpace', this.token)
                this.$store.commit('myPost', {visit: false, token: this.token})
            },
            // handleSelect(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            exit(){
                this.isLogin = false
                this.$store.commit('clearToken')
                // router.push('/')
            },
            search(val){
                // console.log(val)
                // this.$router.push('/search/keyword=' + val)
                this.drawer = false
                this.$store.commit('search', {mode: "article", keyword: val})
            },
            // great(){
            //     document.getElementById('saveImage').onchange = function () {
            //         console.log("image change")
            //         var imgFile = this.files[0];
            //         var fr = new FileReader();
            //         fr.onload = function () {
            //             document.getElementById('portrait').src = fr.result;
            //         };
            //         fr.readAsDataURL(imgFile);
            //     }
            // },
            // imageSubmit(){
            //     let x = document.getElementById('saveImage').files[0];
            //     console.log(x);
            //     let params = new FormData() ; //创建一个form对象
            //     params.append('file',x,x.name); //append 向form表单添加数据
            //     //添加请求头 通过form添加的图片和文件的格式必须是multipart/form-data
            //     let config = {
            //         headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     this.$axios.post("/user/image",params,config)
            //         .then(function(res){
            //             console.log(res);
            //             this.imageSave = res.data.image;
            //             sessionStorage.setItem('headImg',this.imageSave); //将图片保存，并能够在其他地方加载显示
            //             router.go(0); //刷新页面，头像改变
            //         }.bind(this))
            //         .catch(function (error) {
            //             console.log(error);
            //         })
            // },
            uploadChange(file, fileList){
                this.codeFile = file;
                this.codeFileList = fileList;
                if(fileList.length == 1){
                    let {fileList, ...data} = this.rules;
                    this.rules = data;
                    this.$refs.formRef.clearValidate('fileList');
                }
                // this.$refs.formRef.validateField('fileList')
            },
            handleRemove(file, fileList) {
                if(fileList.length == 0){
                    this.codeFile = null
                    this.rules.fileList = [{ required: true, message: '请上传帖子封面', trigger: 'change'}];
                }
                // this.formRef.fileList.splice()
                // 文件删除后也要触发验证,validateField是触发部分验证的方法,参数是prop设置的值
                this.$refs.formRef.validateField('fileList')
                console.log(file, fileList);
            },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            handleExceed(files, fileList) {
                this.$message.warning(`最多选择 1 个文件`);
            },
            beforeCoverUpload(){
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isLt15M = file.size / 1024 / 1024 < 15;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传封面图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt15M) {
                    this.$message.error('上传封面图片大小不能超过 15MB!');
                }
                return isJPG && isPNG && isGIF && isLt15M;
                // return false
            },
            submit(val){
                if (new Date(this.token.state.replace(/-/g, '/')).getTime() > new Date().getTime()){
                    alert("您因为违规行为已被临时封禁，具体恢复时间请到个人空间查看\n如对封禁有异议亦可在个人空间申诉")
                    this.newArticle = false
                    return
                }
                // console.log("submit---val:::::",val) //val = formRef
                this.$refs[val].validate((valid) => {
                    if(valid){
                        // let formdata = document.getElementById('formData')
                        let params = new FormData() ; //创建一个form对象——注意console.log(formdata)是空的，只能通过它自带的方法get、getAll、key查看
                        params.append('file', this.codeFile.raw)
                        params.append("title", this.formRef.title)
                        params.append("context", this.formRef.text)
                        params.append("publisher", this.token.user_name)
                        params.append("publisherId", this.token.uid)
                        params.append("topic", this.formRef.radio)
                        let config = {
                            headers:{'Content-Type':'multipart/form-data'}
                        };
                        // axios默认的post使用application/json格式编码（需要上传文件/图片时得用multipart/form-data编码)
                        axios.post("http://localhost:8090/article/newArticle", params, config)
                            .then(res => {
                                if(res.data.successPublish){
                                    this.$message.success(res.data.msg)
                                    this.newArticle = false
                                    // console.log("response:====>", res);
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                                // console.log("response.data:======>",res.data)
                                // this.imageSave = res.data.image;
                                // sessionStorage.setItem('headImg', this.imageSave); //将图片保存，并能够在其他地方加载显示
                                // that.$router.go(0); //刷新页面
                            })
                            .catch(function (error) {
                                console.log("can't find:---->", error);
                            })
                            // alert('submit!');
                    }else {
                        console.log('表单数据不完整');
                        return false;
                    }
                })
            },
            handleSuccess (res, file, fileList) {
                // 这里可以写文件上传成功后的处理,但是一定要记得给fileList赋值
                // this.fileList = 'fileList'
                // 文件上传后不会触发form表单的验证,要手动添加验证
                this.$refs.formRef.validateField('fileList')
            },
        }
    }
</script>

<style scoped>
 .el-header{
    background-color: lightsteelblue;
    color: #333;
    text-align: center;
    /* height:800px; */
    line-height: 60px;
    /* display: block; */
    z-index: 3;
    position: fixed;
    left:0;
    top:0;
    right:0;
  }
  .btn{
      color: white;
      font-size: 16px;
  }
  /* .el-dialog.el-dialog__body{
      padding:20px
  } */
  /* .myUpload .img .el-upload-list__item-thumbnail{
        width:100px!important;
        height:100px!important;
        object-fit: contain!important;
  } */
  /* .hide .el-upload--picture-card {
        display: none;
    } */
</style>