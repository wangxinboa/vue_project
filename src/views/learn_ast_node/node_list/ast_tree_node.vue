<template>
	<div class="component-ast-node"
		ref="node">
		<div :class="{
				'node-content': true,
				'move_in_top': ( moveInType === 0 ),
				'move_in_bottom': ( moveInType === 2 )
			}"
			ref="content"
			:data-selected="data.selected"
			v-on:mouseenter="handleMouseenterContent"
			v-on:mouseleave="handleMouseleaveContent"
			v-on:mousemove="handleMousemoveContent"
			v-on:mousedown.stop="handleMousedownContent">
			<div
				:class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown.stop="handleExpand"> › </div>
			<div class="label">
					<span ref="label"
						:class="{
							span: true,
							move_in: (moveInType === 1)
						}"
						:contentEditable="isEditing"
						v-on:keydown="editKeydown($event)"
						v-on:paste="editPaste"
						v-on:blur="finishEdit" >{{data.nodeType}}</span>
			</div>
			<div class="btns"
				:data-show="isEditing || isMoving"
				:data-position="isEditing ? 'initial' : 'absolute'">
				<div class="btn">
					<div class="iconfont icon-yidong move"
						:data-selected="isMoving"
						v-on:mousedown.stop="startMoveNode"></div>

					<div class="iconfont icon-bianji"
						:data-selected="isEditing"
						v-on:mousedown.stop="editNode(data)"></div>

					<div class="iconfont icon-add"
						title="添加节点"
						v-on:mousedown.stop="addChildNode(data)"></div>

					<div class="iconfont icon-delete"
						v-on:mousedown.stop="deleteNode(data)"></div>

				</div>
			</div>
		</div>
		<div class="children"
			ref="children"
			v-if="!isLeaf">
			<component-ast-node 
				v-for="(child, index) in data.children"
				:key="index"
				:index="index"
				:data="child"/>
		</div>
	</div>
</template>


<script>
	import ast from '../node_message/ast.json';
	import { getNewNode } from '../deal_ast.js';
	import astTreeMessage from './ast_tree.js';
	import { startEdit, paste, keydown, getValue } from './div_to_input.js';

	export default {
		name: 'component-ast-node',
		props: {
			index: {
				type: Number,
			},
			data: {
				type: Object,
			}
		},
		inject: ['astMessage'],
		data(){
			return {
				isLeaf: !this.data.children || this.data.children.length === 0,
				isExpand: false,
				isEditing: false,

				isMoving: false,
				moveInType: null,
			}
		},
		watch: {
			'data.children': function(newVal, oldVal){
				if( newVal.length > 0 && this.isLeaf ){
					this.isLeaf = false;
				}else if( newVal.length === 0 && !this.isLeaf ){
					this.isLeaf = true;
				}
			}
		},
		methods: {
			handleExpand(){
				if( this.isLeaf ){
					return;
				}
				this.isExpand = !this.isExpand;
				let height ;
				if( this.isExpand ){
					this.$refs.children.style.height = null;
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = 0;
					setTimeout(()=>{
						this.$refs.children.style.height = `${height}px`;
					}, 0);
					setTimeout(()=>{
						this.$refs.children.style.height = null;//	300 是 css transition 的数据
					}, 300);
				}else{
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = `${height}px`;
					setTimeout(()=>{
						this.$refs.children.style.height = 0;
					}, 0);
				}
			},
			deleteNode(node){
				if( this.data.selected ){
					let indexOf = this.astMessage.selectedAstNode.indexOf(this.data);
					this.astMessage.selectedAstNode.splice( indexOf, 1 );
				}
				let parentChildren = node.parent.children;
				parentChildren.splice( this.index, 1 );
			},

			editNode(){
				if( this.isEditing ){
					return; 
				}
				this.isEditing = true;
				setTimeout(()=>{
					startEdit(this.$refs.label);
				});
			},
			editKeydown(e){
				keydown(this.$refs.label, e, {
					finishEdit: this.finishEdit
				});
			},
			editPaste(e){
				paste(this.$refs.label, e);
			},
			finishEdit(){
				this.isEditing = false;
				document.getSelection().removeAllRanges();
				this.data.nodeType = getValue(this.$refs.label);
				// console.log('this.data.nodeType:', this.data.nodeType);
			},

			addChildNode(node){
				node.children.push(
					getNewNode(`${node.nodeType}-${node.children.length + 1}`, node)
				);
			},
			startMoveNode(e){
				astTreeMessage.root.$emit('startMoveNode', e, this);
			},

			handleMousedownContent(){
				if( astTreeMessage.movingTreeNode ){//	正在移动
					astTreeMessage.root.$emit('endMoveNode');
				}else{
					if( ast[this.data.nodeType] ){
						this.data.selected = !this.data.selected;
						if( this.data.selected ){
							this.astMessage.selectedAstNode.push(this.data);
						}else{
							let indexOf = this.astMessage.selectedAstNode.indexOf(this.data);
							this.astMessage.selectedAstNode.splice( indexOf, 1 );
						}
					}else{
						this.handleExpand();
					}
				}
			},
			handleMouseenterContent(e){
				if( astTreeMessage.moveTargetTreeNode ){
					console.error('代码出错');
				}
				if( astTreeMessage.movingTreeNode && astTreeMessage.movingTreeNode !== this ){
					astTreeMessage.moveTargetTreeNode = this;
				}
			},
			handleMouseleaveContent(e){
				if( astTreeMessage.movingTreeNode && astTreeMessage.moveTargetTreeNode === this ){
					astTreeMessage.moveTargetTreeNode.moveInType = null;
					astTreeMessage.moveTargetTreeNode = null;
				}
			},
			handleMousemoveContent(e){
				if( astTreeMessage.moveTargetTreeNode === this ){
					if( e.offsetY < 8 ){
						astTreeMessage.root.$emit('showEndMoveTarget', 0);

					}else if( e.offsetY > this.$refs.content.clientHeight - 8 ){
						if( this.index === this.data.parent.children.length - 1 ){
							astTreeMessage.root.$emit('showEndMoveTarget', 2);
						}
					}else{
						astTreeMessage.root.$emit('showEndMoveTarget', 1);
					}
				}
			}
		},
		created(){
			if( this.data.selected ){
				this.astMessage.selectedAstNode.push(this.data);
			}
		},
		mounted(){
			if( !this.isExpand && !this.isLeaf){
				this.$refs.children.style.height = 0;
			}
		},
		destroyed(){
			// console.log(this.data.nodeType);
		}
	}

</script>

<style lang="less">
	.component-ast-node{
		width: 100%;
		>.node-content{
			position: relative;
			display: flex;
			width: 100%;
			line-height: 0.22rem;
			font-size: 0.14rem;
	    color: #ffffff;
	    background-color: #494949;
			transition: background-color .3s, height .3s;
	    cursor: pointer;
	    overflow: hidden;
			border-bottom: 0.04rem solid rgba(0,0,0,0);
			border-top: 0.04rem solid rgba(0,0,0,0);
	    >.expand{
	    	width: 0.22rem;
	    	height: 0.22rem;
		    text-align: center;
		    overflow: hidden;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out, width .3s;
	    }
	    >.expand.expanded{
		    transform: rotate(90deg);
	    }
	    >.expand.leaf{
	    	//width: 0.14rem;
	    	opacity: 0;
	    	pointer-events: none;
		    transform: rotate(90deg);
	    }
	    >.label{
	    	flex: 1;
	    	width: 0;
				word-break: break-word;
				>.span{
					width: fit-content;
					line-height: 0.22rem;
					transition: background-color .3s;
				}
				>.span.move_in{
					display: block;
					background-color: #9b9b9b;
				}
	    }
	    >.btns{
	    	//position: absolute;
	    	right: 0;
	    	top: 0;
	    	padding: 0 0.1rem;
	    	height: 0.22rem;
		    background-color: #494949;
		    opacity: 0;
	    	transition: opacity .3s ,background-color .3s;
	    	>.btn{
	    		height: 100%;
    			display: flex;
					align-items: center;

	    		>.iconfont{
	    			width: 0.2rem;
				    height: 0.2rem;
				    line-height: 0.2rem;
				    font-size: 0.12rem;
				    text-align: center;
				    cursor: pointer;
				    border-radius: 0.04rem;
				    color: #ffffff;
			    	transition: background-color  .3s;
						&:hover{
							background-color: #696969;
						}
	    		}
	    		>.iconfont[data-selected="true"]{
							background-color: #000000;
	    		}
	    		>.move{
	    			cursor: move;
	    		}

	    	}
	    }
	    >.btns[data-show="true"]{
	    	opacity: 1;
	    }
	    >.btns[data-position="initial"]{
	    	position: initial;
	    }
	    >.btns[data-position="absolute"]{
	    	position: absolute;
	    }
	    &:hover{
	    	background-color: #333333;
		    >.btns{
		    	opacity: 1;
		    	background-color: #333333;
		    }
	    }

		}
		>.node-content.move_in_top{
			border-top: 0.04rem solid #9b9b9b;
		}
		>.node-content.move_in_bottom{
			border-bottom: 0.04rem solid #9b9b9b;
		}
		>.node-content[data-selected="true"]{
			background-color: #272727;
	    >.btns{
	    	background-color: #272727;
	    }
		}
		>.node-content[data-hide="true"]{

			height: 0;
		}
		>.children{
			margin: 0 0 0 0.16rem;
			overflow: hidden;
			transition: height .3s;
	    border-left: 0.01rem solid #666666;
		}
	}
</style>