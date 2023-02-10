<template>
	<div :class="{
			'tree-node': true,
		}">
		<div :class="{
			'tree-node-body-container': true,
			'is-selected': isSelected,
			}">
			<div :class="{
					'tree-node-body': true,
				}"
				>
				<div class="tree-node-icon">
					<div :class="{
							'tree-node-icon-expand': true,
							'is-expand': isExpand,
							'is-show': getNodeChildren(data) && (getNodeChildren(data).length > 0 || Object.keys(getNodeChildren(data)).length > 0) || needLoad
						}"
						v-on:mousedown='handleExpandIconDown'>
						›
					</div>
				</div>
				<div class="tree-node-content"
					v-on:click='handleSelectNode(data)'
					>
					{{ getNodeContent(data) }}
				</div>
			</div>
		</div>
    <tree_transition>
			<div class="tree-node-children"
				v-if='getNodeChildren(data) && isExpand'>
				<my-tree-node
					v-for='(node, index) in getNodeChildren(data)'
					:key='node.name'
					:id='id'
					:content='content'
					:children='children'
					:indent='indent'
					:startExpand='startExpand'
					:dealNode='dealNode'
					:data='node'
					:lazyLoad='lazyLoad'
					:selectNode='selectNode'
					:memoryExpandState='memoryExpandState'/>
			</div>
		</tree_transition>
	</div>
</template>

<script>
	import transition from './tree_transition';
	import { getTree } from './tree.js';

	export default {
		name: 'my-tree-node',
		components: {
			'tree_transition': transition 
		},
		data(){
			return {
				tree: getTree(this.id),
				isSelected: false,
				isExpand: this.lazyLoad ? false : this.startExpand,
				needLoad: this.lazyLoad ? true : false,
			}
		},
		props: {
			id: String,
			content: [String, Function],
			children: [String, Function],
			indent: Number,
			startExpand: Boolean,
			dealNode: [Object, Function],
			data: Object,
			selectNode: Function,
			lazyLoad: [Function, Object],
			memoryExpandState: [Boolean]
		},
		methods: {
			handleExpandIconDown(e){
				let children = this.getNodeChildren(this.data);
				if( this.needLoad && !children ){
					children = this.lazyLoad(this.data);
					if( children ){
						this.isExpand = !this.isExpand;
					}
					this.needLoad = false;
				}else{
					this.isExpand = !this.isExpand;
				}
				if( this.isExpand && this.tree.getAccordion() && children ){
					this.$parent.$children.forEach((component)=>{
						if( component.isExpand && component !== this ){
							component.isExpand = false;
						}
					})
				}
			},
			handleSelectNode(node){
				let selectedNode = this.tree.getSelectedNode()
				if( selectedNode ){
					selectedNode.isSelected = false;
					if( selectedNode === this ){
						this.tree.setSelectedNode(null);
						this.selectNode(null);
					}else{
						this.isSelected = true;
						this.tree.setSelectedNode(this);
						this.selectNode(node);
					}
				}else{
					this.isSelected = true;
					this.tree.setSelectedNode(this);
					this.selectNode(node);
				}
			},
			getNodeContent(node){
				if( !node ){
					return 
				}
				if( this.dealNode ){
					return this.dealNode(node).content;
				}
				switch ( typeof this.content ){
					case 'string':
						return node[this.content];
					case 'function':
						return this.content(node);
					default:
						return null;
				}
			},
			getNodeChildren(node){
				if( !node ){
					return 
				}
				if( this.dealNode ){
					return this.dealNode(node).children;
				}
				switch ( typeof this.children ){
					case 'string':
						return node[this.children];
					case 'function':
						return this.children(node);
					default:
						return null;
				}
			}
		}
	}
</script>

<style lang="less">
	.tree-node{
		>.tree-node-body-container{
			display: flex;
			flex-direction: column;
	    height: 26px;
	    line-height: 26px;
	    transition: background-color .3s;
			>.tree-node-body{
				display: flex;
				width: 100%;
				height: 100%;
				>.tree-node-icon{
					width: 18px;
			    text-align: center;
			    overflow: hidden;
					>.tree-node-icon-expand{
						font-size: 12px;
						opacity: 0;
				    pointer-events: none;
				    user-select: none;
		        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
					}
					>.tree-node-icon-expand.is-expand{
				    transform: rotate(90deg);
					}
					>.tree-node-icon-expand.is-show{
				    cursor: pointer;
						opacity: 1;
				    pointer-events: all;
					}
				}
				>.tree-node-content{
					flex: 1;
					font-size: 14px;
					user-select: none;
					cursor: pointer;
					transition: background-color .3s;
					white-space: nowrap;
				}
			}
			&:hover{
				background-color: rgba(167, 167, 167, 0.2);
			}
		}
		>.tree-node-body-container.is-selected{
			background-color: rgba(167, 167, 167, 0.5);
		}
		>.tree-node-children{
			margin-left: 18px;
			border-left: 1px solid rgba(0,0,0,0.2);
		}
	}
</style>