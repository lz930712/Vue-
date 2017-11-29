<template>
  <div id="teml">
      <div id="desc">
          <!--图片详情- 标题部分-->
          <div class="title">
              <h4>{{info.title}} </h4>
              <p>
  
                  {{info.add_time | datafmt('YYYY-MM-DD HH:mm:ss')}} {{info.click}}次浏览
              </p>
              <p class="line"></p>
          </div>
          <!-- 引入九宫格 -->
          <!--缩略图-->
          <div class="mui-content">
              <ul class="mui-table-view mui-grid-view mui-grid-9">
                  <li v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                      <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
                  </li>
              </ul>
          </div>
  
          <!--图片详情- 摘要部分-->
          <p v-html="info.content"></p>
      </div>
      <commont v-bind:id="id"></commont>
  
  
  
  </div>
</template>

<script>
  import commont from '../subcom/commont.vue'
  import common from '../../../skits/common.js'
  import { Toast } from 'mint-ui'
  export default {
    components: {
      commont
    },
    data() {
      return {
        id: 0,
        info: {},
        list: []
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getInfo()
      this.getImgs()
    },
    methods: {
      // 获取图片
      getImgs: function() {
        var url = common.apidomain + '/api/getthumimages/' + this.id
        this.$http.get(url).then(function(res) {
          // console.log(res.body)
          var body = res.body
          if (body.status != 0) {
            Toast(body.message)
            return
          }
          // 在数据中添加宽和高属性
          body.message.forEach(function(item) {
            //当前所有图片不管有多大都设置为宽高为400，就会导致图片失真了，所以应该按照图片的实际尺寸来设置
            var img = document.createElement('img')
            img.src = item.src
            item.h = img.height
            item.w = img.width
            // console.log(item)
          })
          this.list = body.message
        })
      },
      // 获取详情信息
      getInfo: function() {
        var url = common.apidomain + '/api/getimageInfo/' + this.id
        this.$http.get(url).then(function(res) {
          // console.log(res.body)
          var body = res.body
          if (body.status != 0) {
            Toast(body.message)
            return
          }
          this.info = body.message[0]
        })
      }
    }
  }
</script>

<style scoped>
  /*图片详情样式*/
  #desc {
    padding: 10px;
  }
  #desc .title h4 {
    color: #0094ff;
  }
  
  #desc .title p {
    color: rgba(0, 0, 0, 0.4);
    margin-top: 10px;
  }
  
  #desc .title .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
  /* 九宫格清除样式 */
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border-top: 0;
  }
  .mui-grid-view.mui-grid-9 .mui-media {
    border: 0;
  }
  .mui-content img {
    width: 100px;
    height: 100px;
  }
</style>