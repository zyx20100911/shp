<template>
  <div class="type-nav">
    <div>
      <div class="container">

        <div @mouseleave="curItem(-1)">

          <h2 @mouseenter="curItem"  class="all">全部商品分类</h2>
          <Transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" @mouseenter="curItem(index)" v-for="(c1,index) in listData"
                   :class="{cur:curIndex=== index}" :key="c1.categoryId">
                <h3>
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                      c1.categoryName
                    }}</a>
                </h3>
                <div class="item-list clearfix" :style="{display:curIndex === index ?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      isShow: true,
    }
  },
  mounted() {

    this.isShowSort
  },
  computed: {
    isShowSort() {
      if (this.$route.name !== 'home') {
        return this.isShow = false
      } else {
        return this.isShow = true
      }
    },
    ...mapState({
      listData: state => state.home.listData
    })
  },
  methods: {
    //节流函数使用
    curItem: throttle(function (index) {
      this.curIndex = index
      if(this.$route.name!=='home') {
        if(index === -1){
          this.isShow=false
        }else {
          this.isShow=true
        }
      }
    }, 50),

    goSearch(event) {
      let e = event.target
      let {categoryname, category1id, category2id, category3id} = e.dataset//获取自定义属性的值
      if (categoryname) {//存在自定义属性的情况下执行下面代码
        let location = {name: "search"} //整理请求参数
        let query = {categoryName: categoryname}//临时变量
        if (category1id) {//根据自定义属性定位三级联动的层级
          query.category1id = category1id
        } else if (category2id) {
          query.category2id = category2id
        } else if (category3id) {
          query.category3id = category3id
        }
        location.query = query//将保存有层级定位的临时变量，动态追加到请求参数里

        if(Object.keys(this.$route.params).length!== 0){
          location.params = this.$route.params
        }
        this.$router.push(location)//进行路由跳转，带参数到搜索界面
      }

    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 473px;
      position: absolute;
      background: #fafafa;
      z-index: 999;


      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter{
      height:0px;
    }
    .sort-enter-active{
      transition:all linear 0.5s ;
      overflow: hidden;
    }
    .sort-enter-to{
      height:473px;
      opacity:1
    }
  }
}

.cur {
  background-color: lightskyblue;
}
</style>