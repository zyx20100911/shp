<template>
  <div>
    <TypeNav/>
    <listContainer/>
    <todayRecommend/>
    <rank/>
    <like/>
    <floor v-for="floor in floorList" :key="floor.id" :list="floor"/>

    <brand/>
  </div>
</template>

<script>
import  listContainer from "./Home/listContainer";
import todayRecommend from "./Home/todayRecommend";
import rank from "./Home/rank";
import like from "./Home/like";
import floor from "./Home/floor";
import brand from "./Home/brand";
import {mapState} from 'vuex'

export default {
  name: "home",
  components: {
    listContainer,
    todayRecommend,
    rank,
    like,
    floor,
    brand
  },
  mounted() {
    this.$store.dispatch('getFloor')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
}
</script>

<style scoped>

</style>