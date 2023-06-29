<template>
	<div class="component-tree">
		<div class="component-ast-node-container">
			<c-tree-node
				v-if="treeData"
				v-for="(child, keyName) in treeData"
				:key="keyName"
				:nodeData="child"
				:parentMsg="getParentMsg(treeData, child, keyName)"
				/>
		</div>
	</div>
</template>

<script>
	import treeNode from './tree_node.vue';

	export default {
		components: {
			'c-tree-node': treeNode,
		},
		props: {
			treeData: {
				type: Array,
			},
			rootGetChildren: {
				type: Boolean,
				default: false,
			},
			children: {
				type: [String, Function],
				default: 'children',
			},
			label: {
				type: [String, Function],
				default: 'label',
			},
			getParentMsg: {
				type: Function,
				default: function(){
					return null
				},
			},
		},
		provide(){
			return {
				getChildren: this.getChildren,
				getLabel: this.getLabel,
				getParentMsg: this.getParentMsg,
			}
		},
		methods: {
			getChildren(node, parentMsg){
				if( typeof this.children === 'string' ){
					return node[this.children];
				}else if( typeof this.children === 'function' ){
					return this.children(node, parentMsg);
				}
			},
			getLabel(node, parentMsg){
				if( typeof this.label === 'string' ){
					return node[this.label];
				}else if( typeof this.label === 'function' ){
					return this.label(node, parentMsg);
				}
			},
		},
		mounted(){
			// console.log(this.treeData);
		}
	}
</script>

<style lang="less">
	.component-tree{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
</style>