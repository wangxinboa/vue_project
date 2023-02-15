<template>
	<div id="code_parser">
		<v-header
			class="header"
			icon="yuandaimaxiayoudaima"
			title="代码解析器"
			v-on:iconMouswDown="$router.push(paths.index)" />
		<div class="container">
			<div class="code_files">

			</div>
			<div class="">
				
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data(){
			return {

			}
		}
	}
</script>

<style lang="less">
	#code_parser{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.container{
			display: flex;
			width: 100%;
			height: 0;
			flex: 1;
			>.code_files{
				width: 2rem;
				height: 100%;
			}
		}
	}
</style>