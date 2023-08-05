<template>
	<div id="learnAstNode">
		<div class="header">
			<div class="title">
				<div class="iconfont icon-jiedianguanli"></div>
				<div class="text" >Ast 节点学习</div>
			</div>
		</div>
		<div class="main">
			<v-nodeList/>
			<v-nodeMessage/>
		</div>
	</div>
</template>

<script>
	// import getAst from './node_message/parse.js';
	import nodeList from './node_list/node_list.vue';
	import nodeMessage from './node_message/node_message.vue';

	import astMessage from './astMessage.json';
	import { initAstMessageJson } from './deal_ast.js';

	export default {
		components: {
			"v-nodeList": nodeList,
			"v-nodeMessage": nodeMessage,
		},
		provide: {
			astMessage: initAstMessageJson(astMessage)
		},
	}
</script>

<style lang="less">
	#learnAstNode{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.header{
			display: flex;
			height: 0.5rem;
			background-color: #24292f;
			>.title{
				display: flex;
				padding-left: 0.1rem;
				flex: 1;
				height: 100%;
				>div{
					color: #ffffff;
					line-height: 0.5rem;
				}
				>.iconfont{
					font-size: 0.16rem;
				}
				>.text{
					padding-left: 0.08rem;
					font-size: 0.14rem;
				}
			}
		}
		>.main{
			display: flex;
			height: 0;
			flex: 1;
			>.item{
				height: 100%;
			}

		}

	}
</style>