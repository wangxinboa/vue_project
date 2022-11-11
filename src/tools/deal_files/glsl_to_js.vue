<template>
	<div class="tool-glsl_to_js">
		<div class="operation">
			<div class="button import">
				导入 glsl 文件
				<input type="file" webkitdirectory='true'
					v-on:change="readJlslFiles">
			</div>
		</div>
		<div class="title">文件树</div>
		<div class="file_tree">
			<v-file_node
				v-if="filesTree"
				:fileNode="filesTree"/>
		</div>
		<div class="empty"></div>
	</div>
</template>

<script>
	import getFilesTree from './get_files_tree.js';
	import fileNode from './file_node.vue';

	export default {
		components: {
			"v-file_node": fileNode
		},
		data(){
			return {
				filesTree: null
			}
		},
		methods: {
			readJlslFiles(e){
				this.filesTree = getFilesTree(e.target.files, this.jlslToJs);
			},
			jlslToJs(fileNode, file){
				fileNode.file = 'export default `' + file + '`';
			}
		}
	}
</script>

<style lang="less">
	.tool-glsl_to_js{
		padding: 0 10%;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		>div{
			width: 5rem;
			max-width: 100%;
		}
		>.operation{
			display: flex;
			flex-direction: row;
			width: 100%;
			border-left: 0.02rem solid #000000;
			border-right: 0.02rem solid #000000;
			border-bottom: 0.02rem solid #000000;
			>.button{
				padding: 0.1rem;
				margin-right: 0.1rem;
				font-size: 0.18rem;
				cursor: pointer;
				letter-spacing: 0.04rem;
			}
			>.import{
				position: relative;
				overflow: hidden;
				>input{
					font-size: 0;
					outline: 0;
					padding: 0;
					border: 0;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					position: absolute;
					cursor: pointer;
				}
			}
		}
		>.title{
			padding: 0.1rem;
			font-size: 0.18rem;
			width: 100%;
			border-left: 0.02rem solid #000000;
			border-right: 0.02rem solid #000000;
			border-bottom: 0.02rem solid #000000;
		}
		>.file_tree{
			width: 100%;
			height: 0;
			flex: 1;
			overflow: auto;
			border-left: 0.02rem solid #000000;
			border-right: 0.02rem solid #000000;
			border-bottom: 0.02rem solid #000000;
		}
		>.empty{
			width: 100%;
			height: 0.06rem;
			border-left: 0.02rem solid #000000;
			border-right: 0.02rem solid #000000;
		}
	}
</style>