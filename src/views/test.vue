<template>
  <el-container>
      <navigation></navigation>
      <!-- 自己封装的顶部导航栏组件 -->
      <el-main>
          <el-switch></el-switch><!-- 开关按钮，用于切换周榜和月榜 -->
          <el-carousel>
              <!-- 轮播图组件 -->
              <el-carousel-item v-for="(article, index) in newest" :key="index">
                  <el-button @click="tDetail(article.Article.tid)" >
                    <!-- 轮播中的展示图，click绑定了点击时执行的方法 -->
                  <el-image></el-image>
              </el-carousel-item>
          </el-carousel>
          <el-card>
              <!-- 网站总榜展示前三 -->
              <el-row>
                  <el-col v-for="(article, index)in top3" :key="index" :span="8">
                      <el-card>
                          <el-image></el-image>
                          <!-- 封面 -->
                          <el-button></el-button>
                          <el-button></el-button>
                          <!-- 两个按钮分别跳转到详情发布者空间 -->
                      </el-card>
                  </el-col>
              </el-row>
          </el-card>
          <el-card>
              <span>Animation</span>
              <!-- 动漫分区，其他分区类似就不展示了 -->
              <el-row>
                  <el-col v-for="(article,index)in animationList" :key="index" :span="6">
                      <el-card>
                          <el-image></el-image>
                          <el-button></el-button>
                          <el-button></el-button>
                        </el-card>
                  </el-col>
              </el-row>
          </el-card>
          <el-backtop></el-backtop><!-- 回到顶部按钮 -->
      </el-main>
      <my-footer></my-footer><!-- 自己封装的页面底部组件 -->
  </el-container>
  <!-- index end -->
</template>

<template>
    <el-tabs>
        <!-- 标签组件 -->
        <el-tab-pane label="登录">
            <!-- 登录标签页，注册同理 -->
            <el-input></el-input>
            <el-input></el-input>
            <!-- 两个文本输入框分别用于账号和密码 -->
            <el-button></el-button>
            <!-- button提交表单 -->
        </el-tab-pane>
    </el-tabs>
</template>

<template>
    <navigation></navigation>
    <!-- 自封装的顶部导航组件 -->
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
            <el-avatar></el-avatar>
            <!-- 用户头像 -->
            <div>{{token.name}}</div>
            <span>{{token.uid}}</span>
            <div>
                <el-button>{{follow_count}}</el-button>关注
                <!-- 关注数量，粉丝、获赞数同理 -->
            </div>
            <el-dialog>
                <el-form>
                    <!-- 修改个人信息时需要填写的表单，默认隐藏 -->
                </el-form>
            </el-dialog>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
    <el-row>
        <el-col :span="7">
            <el-card>
                <el-button>
                    我的发帖
                    <!-- 发帖记录，收藏评论记录草稿关注粉丝等项同理都用卡片和按钮封装 -->
                </el-button>
            </el-card>
        </el-col>
        <el-col :span="17">
            <post-list></post-list>
            <!-- 自封装的发帖列表组件 -->
            <draft-list></draft-list>
            <!-- 自封装的草稿列表组件 -->
            <comment-list></comment-list>
            <!-- 自封装的评论列表组件 -->
            <book-list></book-list>
            <!-- 自封装的收藏列表组件 -->
            <follow-list></follow-list>
            <!-- 自封装的关注列表组件 -->
            <fans-list></fans-list>
            <!-- 自封装的粉丝列表组件 -->
            <message-list></message-list>
            <!-- 自封装的消息列表组件 -->
        </el-col>
    </el-row>
    <el-backtop></el-backtop>
    <!-- 回到顶部按钮 -->
    <my-footer></my-footer>
    <!-- 自封装的页面底部 -->
</template>

<template>
    <navigation ref="nav"></navigation>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="15">
            <el-card>
                <el-row>
                    <el-col>
                        <el-image></el-image>
                        <!-- 话题图片 -->
                    </el-col>
                    <el-col></el-col>
                    <el-col>
                        <el-button>发布帖子</el-button>
                        <!-- button监听方法publish -->
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
    <el-card>
        <el-card v-for>
            <el-row>
                <el-col>
                    <el-avatar></el-avatar>
                    <!-- 发布者头像 -->
                </el-col>
                <el-col>{{article.UserName}}</el-col>
                <!-- 发布者名字 -->
                <el-col>{{article.Article.create_time}}</el-col>
                <!-- 帖子创建时间 -->
            </el-row>
            <div>{{article.Article.title}}</div>
            <!-- 帖子标题和内容 -->
            <div>{{article.Article.content}}</div>
            <div>
                <el-image></el-image>
                <!-- 帖子封面 -->
            </div>
            <el-row>
                <el-col>{{article.Article.topic}}</el-col>
                <el-col>
                    <el-button>
                        点赞图标+{{article.ZanCount}}
                        <!-- 点赞数量，收藏和评论同理 -->
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
    </el-card>
    <my-footer></my-footer>
</template>

<template>
    <el-row>
        <el-col>
            <el-card>
                <el-button>
                    点赞图标
                    <!-- 下面的收藏评论同理 -->
                </el-button>
            </el-card>
            <el-card>
                <el-button>
                    设置图标
                    <!-- 当访问者为帖子发布者时这个元素才可见 -->
                </el-button>
            </el-card>
        </el-col>
        <el-col>
            <el-card>
                <div>{{article.title}}</div>
                <div v-html="article.content"></div>
                <div>
                    举报图标
                    <!-- 访问者为发布者时元素不可见 -->
                </div>
                <div>
                    <el-button>点赞图标</el-button>
                    <el-button>收藏图标</el-button>
                </div>
            </el-card>
            <el-card>
                <editor></editor>
                <!-- 富文本输入框，相比帖子发布页的输入框要删减了一些功能 -->
                <el-button>评论</el-button>
                <!-- 提交评论 -->
            </el-card>
            <el-card>
                <el-card v-for commentlist>
                    <el-row>
                        <el-col>
                            <el-avatar></el-avatar>
                            <!-- 评论者头像 -->
                        </el-col>
                        <el-col>{{comment.user_name}}</el-col>
                        <!-- 评论者名字 -->
                        <el-col>{{comment.create_time}}</el-col>
                        <!-- 评论时间 -->
                        <el-col><el-button></el-button></el-col>
                        <!-- 对评论的操作，发布者和管理员可以删除/举报，评论者可以自删 -->
                    </el-row>
                    <div v-html="comment.content"></div>
                </el-card>
            </el-card>
        </el-col>
    </el-row>
    <my-footer></my-footer>
</template>

<template>
    <div>
        <navigation></navigation>
        <el-row>
            <el-col></el-col>
            <el-col>
                <el-card>
                    <div>发布帖子</div>
                    <el-form>
                        <el-form-item label="标题：">
                            <el-input></el-input>
                            <!-- 表单的标题输入框部分 -->
                        </el-form-item>
                        <el-form-item>
                            <!-- 表单内容 -->
                            <editor></editor>
                            <!-- 富文本输入框，配置封装在单独的vue文件 -->
                        </el-form-item>
                        <el-form-item>
                            <el-radio-group></el-radio-group>
                            <!-- 单选按钮组 -->
                        </el-form-item>
                        <el-form-item>
                            <el-button></el-button>
                            <!-- 上传封面按钮 -->
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-switch></el-switch>
                        <!-- 开关按钮，用于展示帖子的预览效果 -->
                    </div>
                </el-card>
                <el-dialog>
                    <div v-html="editor.txt.html"></div>
                    <!-- 弹出式对话框，配合v-html获取富文本内容并展示
                    默认不可见，点击开关按钮后可见 -->
                </el-dialog>
                <el-row>
                    <el-col><el-button>存为草稿</el-button></el-col>
                    <el-col><el-button>发布</el-button></el-col>
                </el-row>
            </el-col>
            <el-col></el-col>
        </el-row>
        <my-footer></my-footer>
    </div>
</template>

<template>
    <div>
        <navigation></navigation>
        <el-row>
            <el-col :span="3"></el-col>
            <el-col :span="18">
                <el-card>
                    <h3>非常抱歉，页面找不到了orz...</h3>
                    <!-- 页面找不到时的提示 -->
                    <el-button>
                        返回上一页
                    </el-button>
                    <el-divider>
                        <!-- 分割线 -->
                        <span>
                            随便看看
                        </span>
                    </el-divider>
                    <el-image></el-image>
                    <!-- 向后端请求的随机一篇帖子的封面图 -->
                    <el-button>
                        换一篇
                    </el-button>
                    <el-button>
                        <!-- 浏览随机展示的帖子 -->
                        去看看 >>
                    </el-button>
                </el-card>
            </el-col>
            <el-col :span="3"></el-col>
        </el-row>
        <my-footer></my-footer>
    </div>
</template>

<template>
    <div>
        <el-menu></el-menu>
        <!-- 左侧固定导航栏 -->
        <el-row>
            <el-col :span="3"></el-col>
            <el-col :span="21">
                <el-page-header content="管理中心"></el-page-header>
                <!-- 页头 -->
                <el-tabs>
                    <el-tabs-pane>
                        <!-- 用户管理标签页 -->
                        <el-table>
                            <!-- 用户信息表格 -->
                            <el-table-column v-for></el-table-column>
                        </el-table>
                        <el-divider></el-divider>
                        <span>共{{users.length}}条数据</span>
                        <el-dialog>
                            <el-time-picker></el-time-picker>
                            <!-- 时间选择器，可以精确指定用户禁言状态结束时间 -->
                            <div>
                                <button>取消</button>
                                <button>确定</button>
                            </div>
                        </el-dialog>
                    </el-tabs-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>

<el-tabs-pane>
    <el-table>
        <el-table-column v-for></el-table-column>
        <span>共{{articles.length}}条数据</span>
        <!-- 删除帖子时弹出提醒 -->
        <el-popover
            placement="top"
            v-model="deleteHint">
            <p>将删除选中帖子，此操作不可逆，确定吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button type="text" @click="deleteHint = false">手滑了</el-button>
                <el-button type="danger"@click="deleteArticles">确定</el-button>
            </div>
            <el-button>批量删除</el-button>
        </el-popover>
    </el-table>
</el-tabs-pane>

<el-tabs>
    <el-tabs-pane>
        <span slot="label">用户发布统计</span>
        <div id="userchart"></div>
    </el-tabs-pane>
    <el-tabs-pane>
        <span slot="label">帖子数据统计</span>
        <div id="articlechart"></div>
    </el-tabs-pane>
</el-tabs>
</template>

<template>
    <navigation></navigation>
    <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="13">
            <div>
                <el-input></el-input>
                <el-button>搜索</el-button>
                <!-- 搜索输入框和搜索按钮 -->
            </div>
            <el-card>
                <el-tabs>
                    <el-tabs-pane>
                        <!-- 搜索帖子 -->
                        <el-card v-for>
                            <el-row>
                                <el-col>
                                    <el-avatar></el-avatar>
                                    <!-- 帖子发布者头像 -->
                                </el-col>
                                <el-col>{{article.UserName}}</el-col>
                                <el-col>
                                    {{article.Article.create_time}}
                                </el-col>
                            </el-row>
                            <!-- 帖子标题和内容，超过一行折叠 -->
                            <div>{{article.title}}</div>
                            <div>{{article.contnent}}</div>
                            <el-image></el-image>
                            <!-- 帖子封面 -->
                            <div>
                                <!-- 话题、点赞收藏评论 -->
                                <el-button></el-button>
                            </div>
                        </el-card>
                    </el-tabs-pane>
                    <el-tabs-pane>
                        <!-- 搜索用户 -->
                        <el-card v-for>
                            <el-row>
                                <el-col>
                                    <el-avatar></el-avatar>
                                    <!-- 用户头像 -->
                                </el-col>
                                <el-col>
                                    <div>{{user.user_name}}</div>
                                    <div>{{user.sign}}</div>
                                </el-col>
                                <el-col>{{user.create_time}}</el-col>
                                <el-col>
                                    <el-button>关注/已关注</el-button>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-tabs-pane>
                </el-tabs>
            </el-card>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>
