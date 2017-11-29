<template >
	<div id="teml">
    <div class="row" v-for="(item,index) in dataList">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li>购买数量组件</li>
						<li><a href="#">删除</a></li>
					</ul>

				</div>
			</div>
		</div>

		{{value}}
	</div>
</template>

<script>
import{getgoodsObject} from '../../../skits/localSg.js';
import common from '../../../skits/common.js';
import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				value:[],
				dataList:[]
			}
		},
		created(){
			this.getList()
		},
		methods:{
			getList:function(){
			var obj = getgoodsObject();
			var idstring = '';
			// console.log(obj) 当前购买商品的id
			for( var key in obj ){
				// console.log(key)
				idstring +=key+','
			}
			// console.log(idstring)
			// 截取idstring长度 因为最后多了个,
			idstring = idstring.substring(0,idstring.length-1)
			//				3.0 ajax请求这个api获取到完整的商品数据信息赋值给this.datalist
				var url  = common.apidomain + '/api/goods/getshopcarlist/'+idstring;
				this.$http.get(url).then(function(res){
					//状态值的判断
					if(res.body.status != 0 ){
						Toast(res.body.message);
						return;
					}

					this.dataList = res.body.message;
				});
			}
		}
	}
</script>

<style scoped>
.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		margin-left: 5px;
	}

	
</style>