<template >
	<div id="teml">
	<div class="title">
    <h4 v-text="info.title"></h4>	
	<p >{{info.add_time|datafmt('YYYY-MM-DD HH:mm:ss')}} {{info.click}}次浏览</p>
	</div>
	<div class="contents" v-html="info.content"></div>
	<commont :id="id"></commont>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import  common from'../../../skits/common.js';
// 引入评论加载
import commont from '../subcom/commont.vue'
	export default{
		// 绑定子组件
		components:{
		commont
		},
	data(){
		return{
			id:0,
			info:{}
		}
		},
		// 获取路由的id
		created:function(){
			this.id = this.$route.params.id;
			this.getInfo();
		},
		methods:{
			getInfo(){
			var url = common.apidomain+"/api/getnew/"+ this.id;
			this.$http.get(url).then(function(res){
				var news = res.body;
				// console.log(news)
				if(news.status!=0){
					 Toast(news.message);
                    return;
				}
				this.info =news.message[0];
			})
		}
	}
	}
</script>

<style scoped>
.title h4{
	color:skyblue;
}
.title p{
	color:rgba(0,0,0,.5)
}
.title,.contents{
	padding:5px;
}
</style>