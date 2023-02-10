<template>
	<div id="learnAstNode-nodeMessages">
		<c-message 
			v-for="(message, index) in astMessage.selectedAstNode"
			:key="message.nodeType"
			:message="message"/>
	</div>
</template>

<script>
	import message from './message.vue';

	export default {
		components: {
			"c-message": message,
		},
		inject: ['astMessage'],
	}

</script>

<style lang="less">
	#learnAstNode-nodeMessages{
		display: flex;
		flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
		flex: 1;
		width: 0;
		height: 100%;
		overflow-y: auto;
		>.node_message_container{

		}
	}
</style>