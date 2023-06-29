
import { Node, parse } from '@babel/parser';

// js 代码转化为 ast 节点
export function jsCodeStrToAst(codeStr){
	try{
		return parse(codeStr, {
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
		console.error('解析代码失败:', e);
		return null;
	}
}

export function isJsAst(jsData){
	return jsData instanceof Node || (jsData instanceof Object && typeof jsData.type === 'string');
}

export function traverseAst(callback, ast, parentAst){

	callback(ast, parentAst);

	for(let key in ast){
		let value = ast[key];
		if( Array.isArray(value) ){
			value.forEach((item)=>{
				if( isJsAst(item) ){
					traverseAst(callback, item, ast);
				}
			});
		}else if( isJsAst(value) ){
			traverseAst(callback, value, ast);
		}
	}
}