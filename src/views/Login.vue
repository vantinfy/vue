<template>
    <div id="bg">
        <div id="box">
            <el-row>
                <el-col>
                    <h3 style="text-align:center; margin-top:32px 0">acg-chat</h3>
                </el-col>
            </el-row>
            
            <el-row  type="flex" justify="space-around" style="">
                <el-col :span="7">
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane label="登录" name="login">
                            <el-input
                                placeholder="请输入用户名"
                                v-model="input_user"
                                style="margin-top: 10px">
                                <i slot="prefix" class="el-input__icon el-icon-user"></i>
                            </el-input>
                            <el-input placeholder="请输入密码" v-model="input_pwd" show-password
                                style="margin: 16px 0 24px 0">
                                <i slot="prefix" class="el-input__icon el-icon-key"></i>
                            </el-input>
                            <el-button @click="correct" style="width:100%; margin-bottom: 20px">登录</el-button>
                        </el-tab-pane>

                        <el-tab-pane label="注册" name="register">
                            <el-input
                                placeholder="请输入用户名"
                                v-model="input_user"
                                style="margin-top: 10px">
                                <i slot="prefix" class="el-input__icon el-icon-user"></i>
                            </el-input>
                            <el-input placeholder="请输入密码" v-model="input_pwd" show-password
                                style="margin: 16px 0 24px 0">
                                <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                            </el-input>
                            <!-- <el-input placeholder="确认密码" v-model="input_pwd_again" show-password
                                style="margin: 0 0 24px 0">
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input> -->
                            <el-button @click="isExist" style="width:100%; margin-bottom: 20px">注册</el-button>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        computed: mapState({
            usr: state => state.users.usr,
        }),
        data() {
            return {
                input_user:null,
                input_pwd:null,
                // input_pwd_again:'',
                activeName: 'login'
            };
        },
        methods: {
            correct(){
                if (this.input_user == ""){
                    this.$message.warning("请输入用户名")
                    return
                }
                // if (this.input_user){}不能包含空格
                if (this.input_pwd == ""){
                    this.$message.warning("请输入密码")
                    return
                }
                this.$store.commit('correct',{name:this.input_user, pwd:this.input_pwd})
            },
            isExist(){
                if (this.input_user == ""){
                    this.$message.warning("请输入注册用户名")
                    return
                }
                if (this.input_pwd == ""){
                    this.$message.warning("请输入注册密码")
                    return
                }
                this.$store.commit('isExist',{name:this.input_user, pwd:this.input_pwd})//利用对象传多个参数
            },
        },
    }
</script>

<style scoped>
    #box{
        /* 垂直居中 */
        position: relative;
        top:50%;
        transform:translateY(-50%);
        opacity: 0.8;
    }
    #bg{
        background-color:#E9EEF3;
        height:100vh;
    }
</style>