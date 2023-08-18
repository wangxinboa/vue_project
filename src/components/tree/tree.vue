<template>
	<div class="component-tree">
		<div v-if="dataType === jsonType && treeData"
			class="component-ast-node-container">
			<c-json-node
				v-for="(child, keyName) in childrenData"
				:key="keyName"
				:keyName="keyName"
				:defaultExpand="defaultExpand"
				:nodeData="child"
				:excludeKeys="excludeKeys"
				/>
		</div>
		<div v-else-if="dataType === treeType && treeData"
			class="component-ast-node-container">
			<c-tree-node
				v-for="(child, index) in childrenData"
				:key="index"
				:defaultExpand="defaultExpand"
				:nodeData="child"
				/>
		</div>
		<div v-else
			class="component-ast-node-container">
			
		</div>
	</div>
</template>

<script>
	import jsonNode from './json_node.vue';
	import treeNode from './tree_node.vue';

	export default {
		components: {
			'c-json-node': jsonNode,
			'c-tree-node': treeNode,
		},
		props: {
			dataType: {
				type: String,
				default: 'tree'
			},
			treeData: {
				type: [Array, Object],
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
			defaultExpand: {
				type: Boolean,
				default: false,
			},
			// json
			excludeKeys: {
				type: Array,
				default(){
					return [];
				},
			}
		},
		data(){
			let childrenData = this.getChildren(this.treeData);
			return {
				events: {
					selectNode: 'selectNode',
				},
				jsonType: 'jsonType',
				treeType: 'treeType',

				childrenData,
			}
		},
		watch: {
			treeData(newVal, oldVal){
				this.childrenData = this.getChildren(newVal);
			}
		},
		provide(){
			return {
				selectNode: this.selectNode,
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
			selectNode(node){
				this.$emit(this.events.selectNode, node);
			},

		},
		mounted(){
			// console.log(this.treeData);
		}
	}
</script>

<style lang="less">
	.component-tree{
		width: fit-content;
    min-width: 100%;
    max-height: 100%;
    height: fit-content;
    min-height: 100%;
    max-height: 100%;
		overflow: auto;
		background-color: #191919;
		.component-tree-node{
			>.node-content{
				position: relative;
				padding: 0 0.1rem 0 0;
				display: flex;
				line-height: 0.18rem;
				font-size: 0.14rem;
		    color: #ffffff;
				transition: background-color .3s, height .3s;
		    cursor: pointer;
		    overflow: hidden;
				border-bottom: 0.04rem solid rgba(0,0,0,0);
				border-top: 0.04rem solid rgba(0,0,0,0);
		    >.expand{
		    	width: 0.18rem;
		    	height: 0.18rem;
			    text-align: center;
			    overflow: hidden;
	        transition: transform .3s ease-in-out, opacity .3s ease-in-out, width .3s;
		    }
		    >.expand.expanded{
			    transform: rotate(90deg);
		    }
		    >.expand.leaf{
		    	opacity: 0;
		    	pointer-events: none;
		    }
		    >.label{
			    text-align: left;
			    white-space: nowrap;
		    }

		    &:hover{
		    	background-color: #333333;
			    >.btns{
			    	opacity: 1;
			    	background-color: #333333;
			    }
		    }
			}
			>.node-children{
				margin: 0 0 0 0.16rem;
				transition: height .3s;
		    border-left: 0.01rem solid #666666;
		    overflow-y: hidden;
		    overflow-x: initial;
			}
		}
	}
</style>