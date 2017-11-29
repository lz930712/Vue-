<template>
	<div id="teml">
    <div id="desc">
        <h4>
            {{info.title}}
        </h4>
        <p v-html="info.content"></p>
    </div>
	</div>
</template>

<script>
import common from '../../../skits/common.js';
import { Toast } from 'mint-ui';

	export default{
        
        
		data(){
            return{
                id:0,
                info:{}
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.getInfo()
        },
        methods:{
            getInfo:function(){
                var url = common.apidomain+"/api/goods/getdesc/"+this.id;
                this.$http.get(url).then(function(res){
                    if(res.body.status!=0){
                        Toast(res.body.message)
                    }
                this.info=res.body.message[0]
                })
            }
        }
	}
</script>

<style scoped>
#desc h4{
    color: skyblue
}
#desc{
    padding: 5px;
}
	
</style>