<template>
	<div class="component-tree">
		<c-tree-node
			v-for="(child, index) in treeData"
			:index="index"
			:key="index"
			:defaultExpand="defaultExpand"
			:nodeData="child">

			<template v-slot:content="{index, node}">
				<slot name="content" v-bind:index="index" v-bind:node="node"></slot>
			</template>
		</c-tree-node>
	</div>
</template>

<script>
	import TreeStore from './tree.js';

	import treeNode from './tree_node.vue';

	export default {
		components: {
			'c-tree-node': treeNode,
		},
		props: {
			data: {
				type: Array,
				default: [],
			},
			children: {
				type: [String, Function],
				default: 'children',
			},
			allowCheck: {
				type: Boolean,
				default: false,
			},
			selectedData: {
				type: [Object, Array],
				default: null
			},
			defaultExpand: {
				type: Boolean,
				default: true,
			},
		},
		provide(){
			return {
				selectNode: this.selectNode,
				defaultExpand: this.defaultExpand,
			}
		},
		data(){
			const treeStore = new TreeStore( this.allowCheck );
			return {
				treeStore,
				treeData: treeStore.getTreeNode(this.data, this.getChildren ),
			}
		},
		watch: {
			data(newVal, oldVal){

				this.treeStore.nodesMap.clear();

				this.treeStore.selectedNode = null;
				this.treeStore.selectedNodes.clear();

				this.treeData = this.treeStore.getTreeNode(this.data, this.getChildren );
			},
			selectedData(newVal, oldVal){

				if( this.allowCheck ){

					this.treeStore.selectDataNodes( newVal );
				}else{

					this.treeStore.selectDataNode( newVal );
				}
			}
		},
		methods: {
			getChildren(node){

				let children = null;

				if( typeof this.children === 'string' ){

					children = node[this.children];
				}else if( typeof this.children === 'function' ){

					children = this.children(node);
				}

				return children ? children : [];
			},
			selectNode( node ){

				const selectedNode = this.treeStore.selectNode( node );

				this.$emit('selectnode', selectedNode ? selectedNode.data : selectedNode, node);
			},

		},
	}
</script>

<style lang="less">
	.component-tree{
		min-width: 100%;
		max-width: 100%;
		min-height: 100%;
		max-height: 100%;
		overflow: auto;
		.component-tree-node{
			width: fit-content;
			height: fit-content;
			min-width: 100%;
			>.tree-node-content{
				display: flex;
				align-items: center;
				padding: 0 0.1rem 0 0;
				height: 0.26rem;
				line-height: 0.26rem;
				font-size: 0.14rem;
				color: #ffffff;
				transition: background-color .3s, height .3s;
				overflow: hidden;
				>.expand{
					width: 0.18rem;
					min-width: 0.18rem;
					height: 0.18rem;
					line-height: 0.18rem;
					text-align: center;
					overflow: hidden;
					cursor: pointer;
				}
				>.expand.expanded{
					transform: rotate(90deg);
				}
				>.expand.leaf{
					opacity: 0;
					pointer-events: none;
				}
				>.node-message{
					flex: 1;
					height: 100%;
				}
				&:hover{
					background-color: #333333;
				}
			}
			>.tree-node-content[data-selected="true"]{
				background-color: #272727;
			}
			>.tree-node-children{
				margin: 0 0 0 0.16rem;
				transition: height .3s;
				border-left: 0.01rem solid #666666;
				overflow-y: hidden;
				overflow-x: initial;
			}
		}
	}
</style>