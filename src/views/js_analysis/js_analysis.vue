<template>
	<div id="codeAnalysis">
		<!-- <input type="file" name="files"
			webkitdirectory="true"
			v-on:input="handleInput" /> -->
		<!-- <input type="file" name="files"
			v-on:input="handleInput" /> -->

		code_analysis
	</div>
</template>

<script>
	import * as BabelParser from './babel_parser.js'
	import getFiles from '@utils/input_files/get_files.js';


	export default {
		methods: {
			handleInput( e ){
				const
					files = e.target.files,
					file = files[0];

				const reader = new FileReader();

				reader.readAsText( file );
				reader.onload = () => {
					console.log('file.result:', reader.result);
					console.log(BabelParser.getJsCodeAst( reader.result ))
				}

				console.log('files:', files);
				console.log('file:', file);
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