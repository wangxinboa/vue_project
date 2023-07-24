<template>
	<div class="ast_message">
		<div class="code_ast">

			<div class="code_ast_header">
<!-- 				<div class="btn icon-btn icon-json"
					title="ast 展示"
					v-on:mousedown="changeAstShowType"></div> -->
				<div class="btn icon-btn icon-jiexi"
					title="解析代码为 ast 节点"
					v-on:mousedown="codeStrToAst"></div>
			</div>

			<div class="code_ast_content">
				<c-tree
					v-if="astShowType === AstShowTypeFlag.TREE"
					:treeData="astNodes"
					:dataType="'jsonType'"
					:label="getLabel"
					:children="getChildren"
					:defaultExpand="false"
					:excludeKeys="['start', 'end', 'loc']"
					v-on:selectNode="handleSelectNode"
					/>
				<v-codeEditor
					v-else-if="astShowType === AstShowTypeFlag.JSON"
					:defaultCode="astJSON"
					:readOnly="true"/>
			</div>
			
		</div>
		<div class="code_editor_container">
			<v-codeEditor ref="codeEditor"
				:defaultCode="codeStr"/>
		</div>
	</div>
</template>

<script>
	import VCodeEditor from '../code_editor/code_editor';
	import { jsCodeStrToAst, isAstNode } from '../ast_learn_graph/utils.js';

	const AstShowTypeFlag = {
		JSON: 'JSON',
		TREE: 'TREE'
	}

	export default {
		components: {
			"v-codeEditor": VCodeEditor,
		},
		inject: ['astLG'],
		props: ['astNodes', 'codeStr'],
		data(){
			return {
				astJSON: '',

				AstShowTypeFlag,
				astShowType: AstShowTypeFlag.TREE,
			}
		},
		watch: {
			astNodes(newVal){
				this.handleSelectNode(newVal[0]);

			},
			codeStr(newVal, oldVal){
				// console.log('newVal:', newVal);
			}
		},
		methods: {
			getLabel(node, keyName){
				let label;

				if( isAstNode(node) ){
					if( keyName === void 0 ){
						label = `Ast-${node.type}`;
					}else{
						label = `${keyName}: Ast-${node.type}`;
					}
				}else if( typeof node === 'object' && node !== null){
					if( Array.isArray(node) ){
						label = `${keyName} [${node.length}]`;
					}else{
						label = keyName;
					}
				}else{
					label = `${keyName}: ${node}`;
				}
				return label;
			},
			getChildren(node){
				return node;
			},

			handleSelectNode(node){
				if( isAstNode(node) ){
					let { start, end } = node.loc;

					this.$refs.codeEditor.setRange(start.line - 1, start.column, end.line - 1, end.column);
				}
			},

			codeStrToAst(){
				// let code = this.$refs.codeEditor.getValue(),
				// 		astNode = this.astLG.startComplete(code);

				// this.astNodes = [astNode];
				// this.astJSON = JSON.stringify(astNode, null, 4);

				this.astLG.startComplete(this.$refs.codeEditor.getValue());

			},
			changeAstShowType(){
				// this.astShowTree = !this.astShowTree;
				if( this.astShowType === this.AstShowTypeFlag.JSON ){
					this.astShowType = this.AstShowTypeFlag.TREE;
				}else if( this.astShowType === this.AstShowTypeFlag.TREE ){
					this.astShowType = this.AstShowTypeFlag.JSON;
				}
			},

		},

	}
</script>