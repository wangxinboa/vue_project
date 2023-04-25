<template>
	<v-page
		icon="zhanshizhongxin"
		title="ast 规范学习">
	<template #content>
		<div id="learnAstSpec">
			<div class="ast_learn_node_list_container">
				<v-astLearnNodeList
					:astLearnGraph="astLG"/>
			</div>
			<div class="arc_diagram">
				
			</div>
			<div class="code_editor">
				<v-codeEditor
					v-on:capturecode="completeAstLearnGraph"
					/>
			</div>
		</div>
	</template>
	</v-page>
</template>

<script>
	import astLearnNodeList from './learn_ast_massage/ast_learn_node_list';
	import codeEditor from './code_editor/code_editor';
	import AstLearnGraph from './ast_learn_graph/ast_learn_graph.js';


	export default {
		components: {
			"v-astLearnNodeList": astLearnNodeList,
			"v-codeEditor": codeEditor,
		},
		data(){
			return {
				astLG: new AstLearnGraph(),
			}
		},
		methods: {
			completeAstLearnGraph(codeStr){
				this.astLG.startComplete(codeStr);
				console.log('astLG:', this.astLG);
			},
		}
	}
</script>

<style lang="less">
	#learnAstSpec{
		display: flex;
		width: 100%;
		height: 100%;
		>.ast_learn_node_list_container{
			width: 3rem;
			height: 100%;
			background-color: #262626;
		}
		>.arc_diagram{
			width: 0;
			flex: 1;
			height: 100%;
			background-color: yellow;
		}
		>.code_editor{
			width: 0;
			flex: 1;
			height: 100%;
		}
	}
</style>