<template >
<!-- 轮播图组件 -->
		<div id="teml">
		<mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in list">
        <img v-bind:src="item.img">
        </mt-swipe-item>
</mt-swipe>
<!-- 九宫格 -->
<div class="mui-content">

		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news/newsList">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photos/photolist">
		                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
		</div>
	</div>
</template>

<script>
// 引入弹框样式
import { Toast } from 'mint-ui';
// 引入公共的url地址
import  common from'../skits/common.js'
	export default{
		data(){
            return{
            list:[]
            } 
        },
        // 生命周期 实现刷新
        created:function(){
            this.getImgs();
        }
        ,
        methods:{
            getImgs:function(){
              var   url = common.apidomain+"/api/getlunbo";
                this.$http.get(url).then(function(res){
                var  data =res.body;
                if(data.status!=0){
                         Toast(data.message);
                    return ;
                }
                this.list=data.message;
                })
            }
        }

	}
</script>

<style scoped>
 .mint-swipe{
        height: 300px;
        width:100%;
    }
	
    .mint-swipe-item img{
        width:100%;
        height:100%;
        display:block;
    }
.mui-grid-view.mui-grid-9{
    background-color:#fff;
    border-top:0;
}
.mui-grid-view.mui-grid-9 .mui-media{
    border:0;
}
.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}

	.mui-icon-home:before{
		background-image: url(../../statics/imgs/1.png);
	}

	.mui-icon-email:before{
		background-image: url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background-image: url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before{
		background-image: url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background-image: url(../../statics/imgs/5.png);
	}
	.mui-icon-phone:before{
		background-image: url(../../statics/imgs/6.png);
	}
</style>