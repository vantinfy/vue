<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<style>
body{
    margin:0;
}
</style>

<script>
import Index from './views/Index'
//  import Login from './views/Login'
export default {
  // compons记得加{},不然控制台报
  // Invalid component name: "_compiled". Component names should conform to valid custom element name in html5 specification.
  // 等好几个错误
  components: {Index},
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
      reload: this.reload                                              
    }
  },
  data(){
    return{
      isRouterAlive: true // 控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
            this.isRouterAlive = true;         //再打开
        })
    }
  },
  created () {
    // store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值。
    // 因此将state里的数据保存一份到本地存储(localStorage、sessionStorage、cookie）中
    // ①localStorage是永久存储在本地，除非主动删除，可行性不高
    // ②sessionStorage是存储到当前页面关闭为止
    // ③cookie则根据你设置的有效时间来存储，但缺点是不能储存大数据且不易读取
    // 所以最终选择sessionStorage方法
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>