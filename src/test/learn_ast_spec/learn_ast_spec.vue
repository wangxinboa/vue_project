<template>
	<v-page
		icon="zhanshizhongxin"
		title="ast 规范学习">
	<template #content>
		<div id="specAst">
			<div class="ast_node_list">
				
			</div>
			<div class="arc_diagram">
				
			</div>
			<div class="code_editor">
				<v-codeEditor
					v-on:capturecode="completeAstSpecData"
					/>
			</div>
		</div>
	</template>
	</v-page>
</template>

<script>
	import * as babelParser from '@babel/parser';
	import codeEditor from './code_editor/code_editor';
	import dataJson from './data.json';
	

	export default {
		components: {
			"v-codeEditor": codeEditor,
		},
		data(){
			return {
				astSpecDataMap: this.initAstSpecData(dataJson),
				newAstSpecData: new Map(),
				astNodePrototype: null
			}
		},
		methods: {
			initAstSpecData(dataJson){
				let astSpecDataMap = new Map();
				return astSpecDataMap;
			},
			codeStrToAst(codeStr){
				try{
					return babelParser.parse(codeStr, {
						sourceType: 'module',
						strictMode: false,
						createParenthesizedExpressions: true,
						allowUndeclaredExports: true,
						plugins: [
							'decimal',
							'decorators-legacy',
							'recordAndTuple',
							'partialApplication',
							'functionBind',
							'doExpressions',
							'moduleBlocks',
							'flow',
							'importAssertions'

							// 'syntaxType'

							// 'classProperties',
							// 'objectRestSpread',
							// 'jsx',
							// 'typescript',
							// 'asyncGenerators',
							// 'dynamicImport',
							// 'exportDefaultFrom',
							// 'exportNamespaceFrom'
						]
					});
				}catch(e){
					return null;
				}
			},
			completeAstSpecData(codeStr){
				let ast = this.codeStrToAst(codeStr);
				if( ast ){
					if( !this.astNodePrototype ){
						this.astNodePrototype = ast.constructor;
					}
					// console.log('codeStr:', codeStr);
					// console.log('ast:', ast);
					this.traverseAst(ast, null, null);
				}
			},
			isAst(data){

			},
			traverseAst(ast, parentAst, key){
				// console.log('ast:', ast);
				// console.log('babelCore:', babelCore);
				for(let key in ast){
					let value = ast[key];
					if( Array.isArray(value) ){
						value.forEach((item)=>{
							this.traverseAst()
						});
					// }else if(  ){

					}
				}
			}
		}
	}
</script>

<style lang="less">
	#specAst{
		display: flex;
		width: 100%;
		height: 100%;
		>.ast_node_list{
			width: 2rem;
			height: 100%;
			background-color: red;
		}
		>.arc_diagram{
			width: 0;
			flex: 1;
			height: 100%;
			background-color: yellow;
		}
		>.code_editor{
			width: 0;
			flex: 1;
			height: 100%;
		}
	}
</style>