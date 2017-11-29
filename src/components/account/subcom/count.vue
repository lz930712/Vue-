<template>
	<div id='count'>
		<div @click="subtract">-</div>
		<div v-text="count"></div>
		<div @click="add">+</div>
	</div>
</template>

<script>
	export default{
		data(){
            return{
                count:1
            }
        },
        created(){

        },
        methods:{
        subtract:function(){
            this.count--;
            if(this.count<1){
                this.count = 1;
            }
            this.sendCount()
        },
        add:function(){
            this.count++;
            this.sendCount()
            
        },
        sendCount:function(){
            this.$emit('send',this.count)
        }
        }
	}
</script>

<style scoped>
	#count div{
        height: 25px;
        width: 35px;
        line-height: 25px;
        border: 1px solid red;
        text-align: center;
        display: inline-block;
    }
</style>