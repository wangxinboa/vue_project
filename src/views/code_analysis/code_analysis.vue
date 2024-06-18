<template>
	<div id="codeAnalysis">
		<input type="file" name="files"
			webkitdirectory="true"
			v-on:input="handleInput" />

		code_analysis
	</div>
</template>

<script>
	import getFiles from '@utils/input_files/get_files.js';

	export default {
		methods: {
			handleInput( e ){
				const files = e.target.files;

				console.log( 'getFiles(files):', getFiles(files) );
			}
		}
	}
</script>


<style lang="less">
	#codeAnalysis{
		width: 100%;
		height: 100%;
	}
</style>