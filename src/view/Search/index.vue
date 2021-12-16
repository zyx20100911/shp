<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="$route.query.categoryName">{{ $route.query.categoryName }}
              <i @click="removeQuery">×</i>
            </li>
            <li class="with-x" v-if="$route.params.keyword">{{ $route.params.keyword }}
              <i @click="removeParams">×</i>
            </li>
            <li class="with-x" v-if="this.paramsData.trademark">{{ this.paramsData.trademark.split(':')[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(attr,index) in this.paramsData.props" :key="index">{{ attr.split(':')[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector :attrsList="attrsList" :trademarkList="trademarkList" @getTrademarks="getTrademarks"
                        @getProps="getProps"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{'active':isOne}" @click="changeOrder('1')">
                  <a>综合
                    <i class="iconfont" v-if="isOne" :class="{'icon-down':isDesc,'icon-up':isAsc}"></i>
                  </a>
                </li>
                <li :class="{'active':isTwo}" @click="changeOrder('2')">
                  <a>销量
                  <i class="iconfont" v-if="isTwo"  :class="{'icon-down':isDesc,'icon-up':isAsc}"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg"/></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                        good.title
                      }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapGetters} from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      paramsData: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",//默认综合降序 排序方式1: 综合,2: 价格 asc: 升序,desc: 降序
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ""
      },

    }


  },
  components: {
    SearchSelector
  },
  beforeMount() {
    //在调用接口前，把请求参数整理出来，从路由中获取请求参数
    Object.assign(this.paramsData, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getDate()
  },
  computed: {
    isOne() {
      return this.paramsData.order.split(':')[0]==='1'
    },
    isTwo() {
      return this.paramsData.order.split(':')[0]==='2'
    },
    isDesc() {
      return this.paramsData.order.split(':')[1].indexOf('desc') !== -1
    },
    isAsc() {
      return this.paramsData.order.split(':')[1].indexOf('asc') !== -1
    },
    ...mapGetters({
      goodsList: 'search/goodsList',
      attrsList: 'search/attrsList',
      trademarkList: 'search/trademarkList',
    })
  },
  methods: {
    getDate() {
      //先清空有可能不传值的数据，避免上一次数据残留污染本次请求
      this.clearcategoryId()
      //调用接口前整理请求参数
      Object.assign(this.paramsData, this.$route.query, this.$route.params)
      //调用仓库action中的getGoodsList异步请求，第二个是传的请求参数
      this.$store.dispatch('search/getGoodsList', this.paramsData)
    },
    //清空数据
    clearcategoryId() {
      this.paramsData.category1Id = undefined
      this.paramsData.category2Id = undefined
      this.paramsData.category3Id = undefined
    },
    //删除Query参数tag方法
    removeQuery() {
      this.$route.query.categoryName = undefined
      this.paramsData.categoryName = undefined
      this.clearcategoryId()
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
        // this.getDate() 路由每次变化都会监听调用方法这里可以不写（自我感觉）
      }
    },
    //删除Params参数tag方法
    removeParams() {
      this.$route.params.keyword = undefined
      this.paramsData.keyword = undefined
      this.$bus.$emit('removeParams', this.paramsData.keyword)
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query})
        //  this.getDate()
      }
    },
    //自定义事件，接收子组件中选中的品牌string
    getTrademarks(data) {
      this.paramsData.trademark = data
      this.getDate()
    },
    //删除品牌
    removeTrademark() {
      this.paramsData.trademark = undefined
      this.getDate()
    },
    //自定义事件，接收子组件的商品属性数组
    getProps(data) {
      this.paramsData.props = data
      this.getDate()
    },
    //删除商品属性
    removeAttr(index) {
      this.paramsData.props.splice(index, 1)
      this.getDate()
    },
    //切换排序选中
    changeOrder(flag) {
      let order = this.paramsData.order
      let orderArr = this.paramsData.order.split(':')
      let orderFlag = orderArr[0]
      let orderSort = orderArr[1]
      if(flag=== orderFlag){//按钮传入的值跟响应式数据保存的值相等说明点击的是同一个按钮，只需要切换升降序
        console.log(orderSort)
        orderSort==='asc'? orderSort = 'desc':orderSort = 'asc';
        console.log(orderSort)
      }else {
        orderSort = 'desc'
        orderFlag=flag
      }
      order = `${orderFlag}:${orderSort}`
      this.paramsData.order = order
    }
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        //路由发生变化的时候调用方法
        this.getDate()
      },
      deep: true,
      immediate: true
    }
  }


}

</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>