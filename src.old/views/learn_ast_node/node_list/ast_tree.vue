<template>
	<div class="component-ast-node-container"
		ref="astTree"
		:data-move="isMoving"
		v-on:mousemove="moveNode"
		v-on:mousedown="endMoveNode"
		v-on:mouseleave="endMoveNode">
		<c-astTreeNode
			v-for="(child, index) in astMessage.astTree.children"
			:key="index"
			:index="index"
			:data="child"/>
	</div>
</template>

<script>
	import astTreeNode from './ast_tree_node.vue';
	import astTreeMessage from './ast_tree.js';

	export default {
		components: {
			'c-astTreeNode': astTreeNode,
		},
		data(){
			return {
				isMoving: false,
				x: null,
				y: null,
				offsetY: null,
			}
		},
		inject: ['astMessage'],
		methods: {
			moveNode(e){
				if( astTreeMessage.movingTreeNode ){
					astTreeMessage.cloneNode.style.top = `${e.clientY - this.y - this.offsetY + this.$refs.astTree.scrollTop}px`;
					astTreeMessage.cloneNode.style.left = `${e.clientX - this.x}px`;
				}
			},
			endMoveNode(e){
				// console.log("e:", e.type);
				this.$emit('endMoveNode');
			}
		},
		created(){
			astTreeMessage.root = this;

			this.$on('startMoveNode', function(e, treeNode){
				// console.log('startMoveNode e:', e);
				if( astTreeMessage.movingTreeNode ){
					if( astTreeMessage.movingTreeNode === treeNode ){
						this.isMoving = treeNode.$data.isMoving = false;
						this.$el.removeChild(astTreeMessage.cloneNode);

						astTreeMessage.movingTreeNode = astTreeMessage.cloneNode = null;
					}else{

					}
				}else{
					// console.log("treeNode.$refs.node:", treeNode.$refs.node);
					astTreeMessage.movingTreeNode = treeNode;
					let cloneNode = astTreeMessage.cloneNode = treeNode.$refs.node.cloneNode(true);

					cloneNode.classList.add('moving');

					// console.log(this.$refs.astTree.clientTop);
					// console.log(e.clientY);

					this.x = e.clientX;
					this.offsetY = e.offsetY;

					cloneNode.style.top = `${e.clientY - this.y - this.offsetY + this.$refs.astTree.scrollTop}px`;
					cloneNode.style.left = `${e.clientX - this.x}px`;
					this.isMoving = astTreeMessage.movingTreeNode.$data.isMoving = true;
					this.$el.appendChild(cloneNode);
				}

			});

			this.$on('showEndMoveTarget', function(type){
				let { movingTreeNode , moveTargetTreeNode } = astTreeMessage,
						{ index, data } = movingTreeNode;

				switch(type){
					case 0:
						if( data.parent.children[index + 1] === moveTargetTreeNode.data ){
							// console.log('目标节点的下一个节点就是移动节点');
							moveTargetTreeNode.moveInType = null;
						}else{
							moveTargetTreeNode.moveInType = type;
						}
						break;
					case 1:
						if( movingTreeNode.data.parent === moveTargetTreeNode.data ){
							// console.log('移动节点的父节点就是目标节点');
							moveTargetTreeNode.moveInType = null;
						}else{
							moveTargetTreeNode.moveInType = type;
						}
						break;
					case 2:
						moveTargetTreeNode.moveInType = null;
						if( data.parent.children[index - 1] === moveTargetTreeNode.data ){
							// console.log('目标节点的上一个节点就是移动节点');
							moveTargetTreeNode.moveInType = null;
						}else{
							moveTargetTreeNode.moveInType = type;
						}
						break;
				}
			});

			this.$on('endMoveNode', function(){
				if( astTreeMessage.movingTreeNode ){
					// console.log("endMoveNode");

					this.$el.removeChild(astTreeMessage.cloneNode);

					if( astTreeMessage.moveTargetTreeNode ){
						let moveNode = astTreeMessage.movingTreeNode.data,
								moveNodeIndex = astTreeMessage.movingTreeNode.index,
								endNode = astTreeMessage.moveTargetTreeNode.data,
								endNodeIndex = astTreeMessage.moveTargetTreeNode.index,
								moveInType = astTreeMessage.moveTargetTreeNode.moveInType;

						
						astTreeMessage.moveTargetTreeNode.moveInType = null;
						this.isMoving = astTreeMessage.movingTreeNode.isMoving = false;

						astTreeMessage.cloneNode = 
						astTreeMessage.movingTreeNode = 
						astTreeMessage.moveTargetTreeNode = null;

						let 
							moveNodeparentChildren = moveNode.parent.children,
							endNodeParentChildren = endNode.parent.children;


						switch( moveInType ){
							case 0:
								moveNodeparentChildren.splice( moveNodeIndex, 1 );
								moveNode.parent = endNode.parent;
								endNodeParentChildren.splice( endNodeIndex, 0, moveNode );
								break;
							case 1:
								moveNodeparentChildren.splice( moveNodeIndex, 1 );
								moveNode.parent = endNode;
								endNode.children.push(moveNode);
								break;
							case 2:
								moveNodeparentChildren.splice( moveNodeIndex, 1 );
								moveNode.parent = endNode.parent;
								endNodeParentChildren.splice( endNodeIndex + 1, 0, moveNode );
								break;
						}
					}else{
						this.isMoving = astTreeMessage.movingTreeNode.isMoving = false;
						astTreeMessage.movingTreeNode = astTreeMessage.cloneNode = null;
					}
				}

			});
		},
		mounted(){
			this.y = this.$refs.astTree.getBoundingClientRect().y;
		}
	}
</script>

<style lang="less">
	.component-ast-node-container{
    position: relative;
		padding: 0.1rem 0 0 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: visible;
		>.component-ast-node.moving{
			position: absolute;
			opacity: 0.3;
			pointer-events: none;
			>.node-content{
				background-color: #000000;
				pointer-events: none;
			}
		}
	}
	.component-ast-node-container[data-move="true"]{
		cursor: move;
		.component-ast-node{
			>.node-content{
		    >.btns{
		    	pointer-events: none;
		    	opacity: 0;
		    }
			}
		}
	}
</style>