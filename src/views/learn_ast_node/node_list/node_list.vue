<template>
	<div id="learnAstNode-codeList">
		<div class="operation">
			<div class="icon">
				<div class="iconfont icon-output"
					title="导出节点"
					v-on:mousedown="outputAstMessage"></div>
			</div>
			<div class="icon">
				<div class="iconfont icon-add"
					title="添加节点"
					v-on:mousedown="addAstNode"></div>
			</div>
		</div>
		<div class="tree">
			<c-astTree />
		</div>
	</div>
</template>

<script>
	import astTree from './ast_tree.vue';
	import { getNewNode, outputAstMessage } from '../deal_ast.js';

	export default {
		components: {
			'c-astTree': astTree,
		},
		inject: ['astMessage'],
		data(){
			return {
				astMessage: this.astMessage,
			}
		},
		methods: {
			outputAstMessage(){
				outputAstMessage(this.astMessage)
			},
			addAstNode(){
				let astTree = this.astMessage.astTree;
				astTree.children.push(
					getNewNode(`ast节点-${astTree.children.length + 1}`, astTree)
				);
			}
		}
	}
</script>

<style lang="less">
	#learnAstNode-codeList{
		width: 2.5rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #494949;
    border-right: 0.02rem solid #000000;
		>.operation{
			display: flex;
			flex-direction: row-reverse;
	    padding: 0.04rem 0.1rem;
			width: 100%;
			height: 0.4rem;
			>.icon{
				display: flex;
				padding-left: 0.04rem;
				height: 100%;
				justify-content: center;
				align-items: center;
				>.iconfont{
					width: 0.26rem;
					height: 0.26rem;
					line-height: 0.26rem;
					text-align: center;
					cursor: pointer;
					border-radius: 0.04rem;
					color: #ffffff;
					transition: background-color .3s;
					&:hover{
						background-color: #333333;
					}	
				}
				>.iconfont[data-selected="true"]{
					background-color: #000000;
				}
			}
		}
		>.tree{
			flex: 1;
			width: 100%;
			height: 0;
			border-top: 0.02rem solid #000000;
		}
	}
</style>