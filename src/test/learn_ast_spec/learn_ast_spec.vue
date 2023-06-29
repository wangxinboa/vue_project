<template>
	<v-page
		icon="zhanshizhongxin"
		title="ast 规范学习">
		<div id="learnAstSpec">

			<div class="ast_learn_node_list_container">
				<v-astLearnNodeList
					:astLearnGraph="astLG"
					:astLearnNode="astLNAnalysed"
					v-on:selectnode="analysisAstLN"
					v-on:startaddnode="startAddAstLN"/>
			</div>

			<c-drawer
				:visible="isAddAstLN"
				:size="'10rem'"
				:title="'学习新节点'"
				v-on:open="startAddAstLN"
				v-on:close="endAddAstLN"
				>
				<v-addAstLNode />
			</c-drawer>
		</div>
	</v-page>
</template>

<script>
	import VAstLearnNodeList from './learn_ast_massage/ast_learn_node_list';
	import VAddAstLNode from './add_new/add_new_ast_learn_node';

	import AstLearnGraph from './ast_learn_graph/ast_learn_graph.js';

	export default {
		components: {
			"v-astLearnNodeList": VAstLearnNodeList,
			"v-addAstLNode": VAddAstLNode,
		},
		data(){
			return {
				astLG: new AstLearnGraph(),
				astLNAnalysed: null,

				isAddAstLN: true,
			}
		},
		methods: {
			analysisAstLN(astLN){
				console.log('astLN:', astLN ? astLN.type : astLN);
				this.astLNAnalysed = astLN;
			},
			startAddAstLN(){
				this.isAddAstLN = !this.isAddAstLN;
			},
			endAddAstLN(){
				this.isAddAstLN = false;
			},
			completeAstLearnGraph(codeStr){
				if( this.astLNResolved ){

				}else{
					this.astLG.startComplete(codeStr);
				}
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
			border-right: 0.01rem solid #5b5b5b;
		}
	}
</style>