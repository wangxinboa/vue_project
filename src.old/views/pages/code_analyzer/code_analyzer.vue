<template>
	<v-page
		icon="yuandaimaxiayoudaima"
		title="代码解析器">
		<div id="codeAnalyzer">
			<div class="code_folders">

			</div>
			<div class="ace_container">
				
			</div>
		</div>
	</v-page>
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
	#codeAnalyzer{
		width: 100%;
		height: 100%;
		>.code_folders{
			width: 3rem;
			height: 100%;
		}
		>.ace_container{

		}
	}
</style>