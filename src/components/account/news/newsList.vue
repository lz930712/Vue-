<template >
	<div id="teml">
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list">
					<router-link v-bind="{to:'/news/newsinfo/' + item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>{{item.zhaiyao}}</p>
                            <div class="time">
                            <span>发表时间：{{item.add_time|datafmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span>点击数：{{item.click}}</span>                            
                            </div>
						</div>
					</router-link>
				</li>
			</ul>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import  common from'../../../skits/common.js'
	export default{
		data(){
            return{
                list:[]
            }
        },
        created:function(){
            this.getNews();
        }
        ,
        methods:{
            getNews:function(){
                var url= common.apidomain+"/api/getnewslist";
                this.$http.get(url).then(function(res){
                    var data = res.body;
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
	.time{
        color:skyblue; 
        font-size:14px;
        margin-top:15px
    }
    .time>span:nth-of-type(1){
        margin-right:10px;
    }
    .mui-table-view-cell a img{
        height:80px;
        width:80px;
        max-width:80px;
    }
   
</style>