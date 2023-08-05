import * as babelParser from '@babel/parser';

// console.log('babelParser:', babelParser);

export default function getAst(code){
	return babelParser.parse(code, {
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
}