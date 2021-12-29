<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper" >
      <div class="swiper-slide" v-for="(img,index) in  imgList" :key="img.id">
        <img @click="curItem(imgList,img)" :class="{active:img.isDefault==='1'}" :src="img.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: "ImageList",
  props: {
    imgList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    imgList: {
      handler() {
        this.$nextTick(() => {
          let s = new Swiper(this.$refs.cur, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //显示几个图片设置
            slidesPerView: 3,
            //每一次切换图片个数
            slidesPerGroup: 1
          })
          console.log(this.$refs.cur)
        })

      }
    }
  },
  methods: {
    curItem(imgList, curimg) {
      imgList.forEach(img => {
        img.isDefault = '0' //清空所有的高亮样式
      })
      curimg.isDefault = '1'//赋值当前样式高亮样式
      //将选中的图片对象 传给 兄弟组件（zoom）
      this.$bus.$emit('getImg', curimg)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>