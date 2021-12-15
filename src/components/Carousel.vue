<template>
  <div class="floorBanner">
    <div class="swiper-container" ref="floorSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
          <img :src="carousel.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ['list'],

  watch: {
    list: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floorSwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            autoplay: true,//可选选项，自动滑动
          })
        })
      },
      immediate: true,
      deep: true

    }
  }
}
</script>

<style scoped>

</style>