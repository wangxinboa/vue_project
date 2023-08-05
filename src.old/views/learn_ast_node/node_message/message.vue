<template>
	<div class="node_message_container">
		<div class="node_message">
			<div class="header">
				<div class="title">{{message.nodeType}}</div>
				<div class="icon">
					<div class="iconfont icon-guanbi"
						v-on:mousedown="unselectAstNode(message)"></div>
					<div class="iconfont icon-bianji"
						v-on:mousedown="editAstNode(message)"></div>
				</div>
			</div>
			<div class="content">
				<div class="code"
					v-if="message.code || message.edit">
					<textarea ref="code"
						v-on:input="changeCodeDebounce"></textarea>
				</div>
				<div class="json_tree_container">
					<div class="json_tree">
						<c-jsonTreeNode
							v-if="ast"
							:data="ast"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getAst from './parse.js';
	import jsonTreeNode from './json_tree_node.vue';
	import debounce from '../../../utils/timer/debounce.js';

	export default {
		components: {
			'c-jsonTreeNode': jsonTreeNode,
		},
		inject: ['astMessage'],
		data(){
			return {
				ast: null,
			}
		},
		props: {
			message: {
				type: Object
			},
		},
		methods: {
			changeCodeDebounce: debounce(function(){
				this.message.code = this.$refs.code.value;
				try{
					this.ast = getAst(this.message.code);
					// console.info('ast:', JSON.stringify(this.ast, null, 4));
				}catch(e){
					this.ast = null;
					console.error(e);
				}
			}, 2000),
			unselectAstNode(node){
				// console.log("unselectAstNode");
				let index = this.astMessage.selectedAstNode.indexOf(node);
				this.astMessage.selectedAstNode.splice(index, 1);
				node.selected = false;
				// console.log('index:', index);
			},
			editAstNode(node){
				// console.log("editAstNode");
				// this.$set(node, 'edit', !node.edit);
				if(!node.code){
					node.edit = !node.edit;
				}
				// console.log('edit:', node.edit);
			}
		},
		mounted(){
			// console.log('message:', this.message);
			if( this.message.code ){
				this.$refs.code.value = this.message.code;
			}
			this.ast = getAst(this.message.code);
		}
	}
</script>

<style lang="less">
	.node_message_container{
		padding: 0.18rem;
		width: 100%;
		min-width: 5rem;
		>.node_message{
			padding: 0.04rem 0.1rem;
			width: 100%;
			border-radius: 0.04rem;
			box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
			>.header{
				position: relative;
				display: flex;
				width: 100%;
				height: 0.3rem;
				>.title{
					height: 100%;
					line-height: 0.3rem;
					font-size: 0.16rem;
				}
				>.icon{
					position: absolute;
					top: 0;
					right: 0;
					display: flex;
					align-items: center;
					flex-direction: row-reverse;
					height: 0.3rem;
					line-height: 0.3rem;
					>.iconfont{
						display: flex;
						align-items: center;
						margin: 0 0 0 0.06rem;
						width: 0.2rem;
						height: 0.2rem;
						cursor: pointer;
					}

				}
			}
			>.content{
				display: flex;
				width: 100%;
				border-top: 0.01rem solid #b6b6b6;
				height: fit-content;
				//transition: height .3s;
				>.code{
					padding: 0.1rem;
					width: 50%;
					//height: 100%;
			    min-height: 100%;
					>textarea{
						padding: 0.1rem;
						width: 100%;
						height: 100%;
						resize: none;
						border-width: 0.02rem;
						border-style: dashed;
						border-color: #434343;
						border-radius: 0.04rem;
					}
				}
				>.json_tree_container{
					padding: 0.1rem;
					width: 50%;
					overflow: auto;
					>.json_tree{
						width: fit-content;
						min-width: 100%;
						height: fit-content;
						max-height: 3rem;
						overflow: auto;
					}
				}
			}
		}
	}
</style>