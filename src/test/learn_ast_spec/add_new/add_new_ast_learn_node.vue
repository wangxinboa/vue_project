<template>
	<div class="fill add_new_ast_learn_node">
		<div class="code_ast_container">
			<v-codeAstNode
				:astNode="astNode"/>
		</div>
		<div class="code_editor_container">
			<v-codeEditor
				v-on:onchange="getCodeAst"/>
		</div>
	</div>
</template>

<script>
	import VCodeEditor from './code_editor/code_editor';
	import VCodeAstNode from './code_ast_node/code_ast_node';


	import { jsCodeStrToAst } from '../utils.js';

	export default {
		components: {
			"v-codeAstNode": VCodeAstNode,
			"v-codeEditor": VCodeEditor,
		},
		data(){
			return {
				astNode: null
			}
		},

		methods: {
			getCodeAst(codeStr){
				console.log('codeStr:', codeStr);
				this.astNode = [jsCodeStrToAst(codeStr)];
			}
		}

	}
</script>

<style lang="less">
	.add_new_ast_learn_node{
		display: flex;
		>.code_ast_container{
			display: flex;
			flex-direction: column;
			width: 3rem;
			height: 100%;
			>.code_ast_header{
				width: 100%;
				height: 0.3rem;
			}
		}
		>.code_editor_container{
			width: 0;
			flex: 1;
			height: 100%;
		}
	}
</style>