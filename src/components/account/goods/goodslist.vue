<template >
  <div id="teml">
  	<div class="mui-content" style="background-color:#fff">
  		<ul class="mui-table-view mui-grid-view">
  			<li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list" :key="item.id">
  				<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
  					<img class="mui-media-object" v-bind:src="item.img_url">
  					<div class="mui-media-body">{{item.title}}</div>
  					<div class="desc">
  						<p>
  							<span>￥{{item.market_price}}</span>
  							<s>￥{{item.sell_price}}</s>
  						</p>
  						<p>
  							<h6 class="left">热卖中</h6>
  							<h6 class="right">剩余{{item.stock_quantity}}件</h6>
  						</p>
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
        page: 1,
        list: []
      }
    },
    created() {
      this.getlist()
    },
    methods: {
      getlist: function() {
        var url = common.apidomain + '/api/getgoods?pageindex=' + this.page
        this.$http.get(url).then(function(res) {
          // console.log(res.body)
          if (res.body.status != 0) {
            Toast(res.body.message)
          }
          this.list = res.body.message
          // console.log(this.$refs.aaa)
		//   console.log(this.list)
		//   console.log(this.list[0].title)
		//   var arr = [];
		//   for(var i=0;i<this.list.length;i++){
		// 	arr.push( this.list[i].title);
		//   }
		  
		   
        })
      }
    }
  }
</script>

<style scoped>
  .mui-content li {
    border: 1px solid rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 4px #000;
    -moz-box-shadow: 0 0 4px #000;
    box-shadow: 0 0 4px #000;
    margin-left: 4px;
    padding-left: 0px;
  }
  
  .mui-content .mui-media-body {
    color: #0094ff;
  }
  
  .mui-content .desc {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 5px;
    text-align: left;
  }
  .mui-content .desc span {
    color: red;
    margin-right: 15px;
  }
  .mui-content a {
    padding-left: 0px;
    margin-left: 0px;
  }
  
  .mui-content .desc .right {
    position: absolute;
    right: 10px;
    bottom: 0px;
  }
  
  .mui-content .desc .left {
    position: absolute;
    left: 10px;
    bottom: 0px;
  }
</style>