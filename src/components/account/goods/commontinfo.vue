<template>
	<div id="teml">
		<commont v-bind:id="id"></commont>
	</div>
</template>

<script>
import commont from '../subcom/commont.vue'
	export default{
        components:{
            commont
        },
		data(){
            return{
                id:0
            }
        },
        created(){
            this.id=this.$route.params.id
        }
	}
</script>

<style scoped>
	
</style>