<template>
	<div class="code_ast_node fill">
		<div class="code_ast_node_header">
			
		</div>
		<div class="code_ast_node_content">
			<c-tree
				:treeData="astNode"
				:label="getLabel"
				:children="getChildren"
				:getParentMsg="getParentMsg"
				/>
		</div>
	</div>
</template>

<script>
	import { isJsAst } from '../../utils.js';

	export default {
		props: {
			astNode: {
				type: [Object, Array],
				default: null
			}
		},
		data(){
			return {
				t: [{label: '1', children: [{label: '1-1'}]}, {label: '2'}],
			}
		},
		methods: {
			getParentMsg(parentNode, childNode, keyName){
				return keyName;
			},
			getLabel(node, parentMsg){
				let label;

				if( isJsAst(node) ){
					label = node.type;
				}else if( typeof node === 'object' && node !== null){
					label = parentMsg;
				}else{
					label = `${parentMsg}: ${node}`;
				}
				return label;
			},
			getChildren(node){
				return node;
			}
		},
		mounted(){
			setTimeout(()=>{
				this.t[0].label = '111';
			}, 3000);
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
		}
	}
</style>
