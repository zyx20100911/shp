<template>
<div>
  <TypeNav/>
  <listContainer/>
  <todayRecommend/>
  <rank/>
  <like/>
  <floor/>
  <floor/>
  <brand/>
</div>
</template>

<script>
import listContainer from "./Home/listContainer";
import todayRecommend from "./Home/todayRecommend";
import rank from "./Home/rank";
import like from "./Home/like";
import floor from "./Home/floor";
import brand from "./Home/brand";
export default {
  name: "home",
  components:{
    listContainer,
    todayRecommend,
    rank,
    like,
    floor,
    brand
  }
}
</script>

<style scoped>

</style>