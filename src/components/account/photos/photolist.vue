<template>
  <div id="teml">
      <!-- 分类 -->
      <div id="cate">
          <ul v-bind="{style:'width:'+ulWidth+'px'}">
              <li @click="getImgs(0)">全部</li>
              <li v-for="item in cates" :key="item.id" @click="getImgs(item.id)">{{item.title}}</li>
          </ul>
      </div>
  
      <!--2.0 图片列表-->
      <div id="imglist">
          <ul>
              <li v-for="item in list">
              <router-link v-bind="{to:'/photos/photoinfo/' + item.id}">
                  <img v-lazy="item.img_url">
                  <div id="desc">
                      <h5 v-text="item.title"></h5>
                      <p v-text="item.zhaiyao"></p>
                  </div>
                  </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
  import common from '../../../skits/common.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        cates: [],
        ulWidth: 320,
        list: []
      }
    },
    created() {
      this.getCates()
      var all = 0
      this.getImgs(all)
    },
    methods: {
      getImgs: function(page) {
        page = page || 0
        var url = common.apidomain + '/api/getimages/' + page
        this.$http.get(url).then(function(res) {
          // console.log(res.body)
          var body = res.body
          if (body.status != 0) {
            Toast(body.message)
          }
          this.list = body.message
        })
      },
      getCates: function() {
        var url = common.apidomain + '/api/getimgcategory'
        this.$http.get(url).then(function(res) {
          // console.log(res.body)
          if (res.body.status != 0) {
            Toast(res.body.message)
          }
          this.cates = res.body.message
          var count = res.body.message.length + 1
          // console.log(count)
          this.ulWidth = 72 * count
          // console.log(this.ulWidth)
        })
      }
    }
  }
</script>

<style scoped>
  #cate {
    width: 375px;
    max-width: 375px;
    padding: 5px;
    margin: 0;
    overflow-x: auto;

  }
  #cate ul {
    padding: 0;
    margin: 0;
  }
  #cate li {
    list-style: none;
    display: inline-block;
    padding-left: 8px;
    color: skyblue;
    font-size: 16px;
  }
  
  /*实现图片列表样式*/
 
  #imglist ul {
    padding-left: 0px;
  }
  #imglist li {
    list-style: none;
    position: relative;
  }
  #imglist img {
    width: 100%;
    height: 300px;
  }
  
  #desc {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 2px;
    left: 0px;
  }
  
  #desc h5 {
    color: #ffffff;
    font-weight: bold;
  }
  #desc p {
    color: #fff;
  }
  
  image[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
</style>