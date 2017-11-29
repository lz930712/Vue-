<template>
	<div id="teml">
		<div id="desc">
			 <!--1.0 商品轮播图-->
		<div class="silder">
		<slider :imgs="imgs"></slider>
        </div>
       
</div>
		<!--2.0 实现商品购买区-->
		<div id="buy">
			<h4>{{info.title}}</h4>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price
}}</span>
				</li>
				<li class="count">
					购买数量：<span class="numbercount"><count v-on:send="getCount"></count></span>    
				<transition 
				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter"
				>
				<div class="ball" v-show="isshow"></div>
				</transition>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="toShopCar">加入购物车</mt-button>
				</li>
			</ul>
		</div>

		<div id="params">
				<h6>商品参数</h6>
				<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quantity}}</li>
				<li>上架时间：{{info.add_time|datafmt('YYYY-MM-DD ')}}</li>
			</ul>
		</div>

		<!--3.0 图文详情-->
		<!--4.0 商品评论-->
		<div id="other">
            <router-link v-bind="{to:'/goods/goodsinfo/info/'+id}">
            <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodsinfo/commontinfo/'+id}">
			<mt-button type="danger" size="large">商品评论</mt-button>
         </router-link>
        </div>
	</div>
</template>

<script>

import slider from '../subcom/slider.vue';
import common from '../../../skits/common.js';
import { Toast } from 'mint-ui';
// 使用vm对象
// 按需导入
import {vm,COUNTSTR}  from '../../../skits/vm.js'
// 引入商品购买的+-操作
import count from '../subcom/count.vue'
// 引入本地存储
import{ valueObj,setItem} from '../../../skits/localSg.js'

	export default{
        components:{
            slider,
            count
        },
		data(){
            return{
				isshow:false,
                id:0,
                imgs:[],
                info:{},
				countNumber:1,
				
            }
        },
        created(){
        this.id=this.$route.params.id;
        this.getImgs();
        this.getInfo();
        // this.getCount()
        },
        methods:{
			beforeEnter:function(el){
					el.style.transform ="translate(0px,0px)";
					// console.log(el)
					
				},
				enter:function(el,done){
					el.offsetWidth;
					el.style.transform='translate(79px,364px)';
					done()
					// console.log(el)

				},
				afterEnter:function(el){
					this.isshow=!this.isshow;
				},
			toShopCar:function(){
				// 小球动画
				this.isshow=!this.isshow
				vm.$emit(COUNTSTR,this.countNumber);
				 valueObj.goodsid = this.id;
				 valueObj.count=this.countNumber;
				 setItem(valueObj)
			},
            getImgs:function(){
            var url = common.apidomain+"/api/getthumimages/"+this.id;
            this.$http.get(url).then(function(res){
                if(res.body.status!=0){
                    Toast(res.body.message)
                }
                this.imgs=res.body.message

            })
            },
            // 获取数据详情
            getInfo:function(){
                var url = common.apidomain+"/api/goods/getinfo/"+this.id;
                this.$http.get(url).then(function(res){
                    if(res.body.status!=0){
                        Toast(res.body.message)
                    }
                    this.info=res.body.message[0]
					// console.log(this.info)
					
                })
            },
            // 获取传来的count
            getCount:function(count){
                this.countNumber=count;
            }
        }
	}
</script>

<style scoped>
	.silder{
	 border:1px solid rgba(0,0,0,0.4);
	 border-radius: 5px;
	 margin: 5px;
 }

	#buy,#params,#other
	{
		margin: 5px;
		padding: 5px;
		border:1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
	}
 .line{
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	#buy ul,#params ul{
		padding-left: 0px;
	}
 #buy h4{
	 color:#0094ff;
	padding: 5px;
 }
 #buy li,#params li{
	 list-style: none;
	 padding: 8px;
 }

	#buy .price span{
		color:red;
	}

	#other .imgdesc{
		margin-bottom: 20px;
    
	}
    .count{
        position: relative;
    }
    .numbercount{
        display: inline-block;
        position: absolute;
        left: 100px;
        top: 5px ;
    }
	.ball{
		height: 20px;
		width:20px;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		top: 7px;
		left:147px;
		transition: all  1s ease;
		z-index: 1000;
	}
</style>