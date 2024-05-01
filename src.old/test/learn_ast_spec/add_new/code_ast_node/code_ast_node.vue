<template>
	<div class="code_ast_node fill">
		<div class="code_ast_node_header">
			
		</div>
		<div class="code_ast_node_content">
			<c-tree
				:treeData="astNode"
				:dataType="'jsonType'"
				:label="getLabel"
				:children="getChildren"
				:defaultExpand="false"
				:excludeKeys="['start', 'end', 'loc']"
				/>
		</div>
	</div>
</template>

<script>
	import { isAstNode } from '../../utils.js';

	export default {
		props: {
			astNode: {
				type: [Object, Array],
				default: null
			}
		},
		methods: {
			getLabel(node, keyName){
				let label;

				if( isAstNode(node) ){
					label = node.type;
				}else if( typeof node === 'object' && node !== null){
					label = keyName;
				}else{
					label = `${keyName}: ${node}`;
				}
				return label;
			},
			getChildren(node){
				return node;
			}
		},
		mounted(){
		}
	}
</script>


<style lang="less">
	.code_ast_node{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.code_ast_node_header{

		}
		>.code_ast_node_content{
			width: 100%;
			height: 0;
			flex: 1;
			overflow: auto;
		}
	}
</style>
