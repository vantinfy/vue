<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="box-shadow:none" class="box-card">
            <el-tab-pane label="系统通知" name="system_notice">
                <!-- <el-badge :value="12" class="item">
                    <el-button size="small">评论</el-button>
                </el-badge> -->
                <el-card shadow="nerver" style="margin-bottom:10px">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name">
                                name
                            </el-button>
                            <div>
                                <el-button type="text" class="text" size="small">
                                    text
                                </el-button>  
                            </div>
                        </el-col>
                        <el-col :span="12"></el-col>
                        <el-col :span="4" style="font-size:14px;color:grey">2021-3-1</el-col>
                    </el-row>
                </el-card>

                <el-card shadow="nerver" style="margin-bottom:10px">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name">
                                name
                            </el-button>
                            <div>
                                <el-button type="text" class="text" size="small">
                                    text
                                </el-button>  
                            </div>
                        </el-col>
                        <el-col :span="12"></el-col>
                        <el-col :span="4" style="font-size:14px;color:grey">2021-3-1</el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>

            <el-tab-pane label="评论" name="comment_notice">
                <el-card shadow="nerver" style="margin-bottom:10px">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="text" class="name">
                                name
                            </el-button>
                            <div>
                                <el-button type="text" class="text" size="small">
                                    text
                                </el-button>  
                            </div>
                        </el-col>
                        <el-col :span="12"></el-col>
                        <el-col :span="4" style="font-size:14px;color:grey">2021-3-1</el-col>
                    </el-row>
                </el-card>
                <el-divider>
                    <span style="color:lightgrey">没有更多数据了</span>
                </el-divider>
            </el-tab-pane>
            
            <el-tab-pane label="关注" name="subscribe_notice">
                <el-card shadow="nerver" style="margin-bottom:10px">
                    <el-row type="flex" align="middle">
                        <el-col :span="3">
                            <el-avatar :size="60" style="" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" class="name">
                                name
                            </el-button>
                            <span style="margin-left:10px;font-size:14px;color:grey">关注了你</span>
                        </el-col>
                        <el-col :span="9" style="font-size:14px;color:grey">2021-3-2</el-col>
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
import {mapState} from 'vuex'
    export default {
        // computed: mapState({
        //     activeName: state => state.spacelist.activeName,
        // }),
        computed:{
            ...mapState({
                    token: state => state.users.token,
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
        data() {
            return {
                // activeName: 'system_notice',
            }
        },
        methods: {
            handleClick(tab) {
                // console.log(tab.name);
                this.$store.commit('myMessage', {token:this.token, type:tab.name})
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