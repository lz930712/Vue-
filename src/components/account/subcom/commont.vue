<template >
	<div id="teml">
    <div id="contents">
		<h3>提交评论</h3>
		<p class="p"></p>
		<textarea placeholder="请输入您想评论内容..."v-model="postcontents"></textarea>
		<mt-button type="primary" size="large" @click="postcommont">发表</mt-button>
	</div>
	<div id="list">
			<h3>评论列表</h3>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					<span>第{{index+1}}楼:</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time | datafmt('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell"v-text="item.content" ></li>
				</ul>
			</div>
			<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
		</div>
	</div>
</template>

<script>
// import { Button } from 'mint-ui';
	import common from '../../../skits/common.js'
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				postcontents:"",
				list:[],
				pageindex:1
			}
		},
		props:["id"],//接收父组件传来的id
		created(){
			this.getMoreContens(this.pageindex);
		},
		methods:{
			getMore(){
			this.pageindex++;
			
			this.getMoreContens(this.pageindex);

			},
			// 定义评论数据的提交
			postcommont(){
				// 判断输入的内容不能为空
				if(this.postcontents.trim().length<=0){
					Toast("输入的内容不能为空");
					return
				}
				var url = common.apidomain+'/api/postcomment/'+this.id
				this.$http.post(url,{content:this.postcontents},{emulateJSON:true}).then(function(res){
					Toast(res.body.message);
				this.list=[{
				"user_name":"匿名用户",
				"add_time":new Date(),
				"content":this.postcontents
			}].concat(this.list);
					this.postcontents="";
				})
			},
			// 定义获取评论数据的方法
			getMoreContens(pageindex){
				// 判断pageindex的输入值
				pageindex=pageindex||1;
			var url = common.apidomain+"/api/getcomments/"+this.id+"?pageindex="+pageindex;
			// 获取数据
			this.$http.get(url).then(function(res){
				if(res.body.status!=0){
					Toast(res.body.message)
					return
				}
				// console.log(res.body)
				this.list = this.list.concat(res.body.message);
			})
			},
			// 加载更多功能
		
		}
	}
</script>

<style scoped>
#contents{
	padding: 5px;
}
 .p{
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}
	#list{
		padding: 5px;
	}
	.title{
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}

</style>