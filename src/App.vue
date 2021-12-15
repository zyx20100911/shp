<template>
  <div id="app">
    <Header></Header>
   <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "./components/Footer/Footer";

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getCategoryList') //优化三级联动只请求一次，放在仓库让组件调用
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
