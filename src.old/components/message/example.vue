<template>
	<div v-on:mousedown='handleTestDown'>测试 message</div>
</template>

<script>
	import Message from './message.js'

	export default{
		methods: {
			handleTestDown(){
				Message.show({
					duration: 3000,
					// onClose(message){
					// 	console.log('onClose', message)
					// }
				})
			}
		}
	}
</script>

