<template>
	<div id="teml">
    <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in imgs">
        <img v-if="item.img" v-bind:src="item.img">
        <img v-else="item.src" v-bind:src="item.src">
        </mt-swipe-item>
    </mt-swipe>      
	</div>
</template>

<script>
	export default{
		data(){
            return{

            }
        },
        props:['imgs'],
        created(){

        },
        methods:{

        }
	}
</script>

<style scoped>

	 .mint-swipe{
        height: 300px;
        width:100%;
    }
    .mint-swipe-item{
        height: 100%;
        width:100%;
    }
    .mint-swipe-item img{
        width:100%;
        height:100%;
        display:block;
    }
</style>