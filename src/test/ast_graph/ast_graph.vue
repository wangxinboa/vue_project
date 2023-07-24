<template>
	<v-page
		icon="zhanshizhongxin"
		title="ast 节点关系打印">
		<div id="AstGraph">
			<div class="code_editor_container">
				<v-codeEditor
					v-on:onchange="getCodeAst"/>
			</div>
		</div>
	</v-page>
</template>

<script>
	import AstLearnGraph from './ast_learn_graph/ast_learn_graph.js';

	import VCodeEditor from './code_editor/code_editor';
	
	export default {
		components: {
			"v-codeEditor": VCodeEditor,
		},
		data(){
			return {
				astLearnGraph: new AstLearnGraph(),
			}
		},
		methods: {
			getCodeAst(codeStr){
				// console.log('codeStr:', codeStr);
				this.astLearnGraph.startComplete(codeStr);
				// console.log('astLearnGraph:', this.astLearnGraph);
				console.log('dagre:', JSON.stringify(this.astLearnGraph.toDagreJSON(), null, 4));
				// console.log('WebCola:', JSON.stringify(this.astLearnGraph.toWebColaJSON(), null, 4));
			}
		}

	}
</script>

<style lang="less">
	#AstGraph{
		display: flex;
		width: 100%;
		height: 100%;
		>.code_editor_container{
			width: 100%;
			height: 100%;
		}
	}
</style>