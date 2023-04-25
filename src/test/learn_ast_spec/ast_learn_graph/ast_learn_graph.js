import AstLearnNode from './ast_learn_node.js';
import astLGJson from './ast_learn_graph.json';
import { jsCodeStrToAst, traverseAst } from '../utils.js';

export default class AstLearnGraph{
	constructor(){
		this.nodes = [];
		this.complete = this.complete.bind(this);
	}

	findNode(astType){
		return this.nodes.find((astLN)=>{
			return astLN.type === astType;
		});
	}

	addNode(astType){
		let node = new AstLearnNode(astType);
		this.nodes.push(node);
		return node;
	}

	getNode(astType){
		let node = this.findNode(astType);
		if( node ){
			return node;
		}else{
			return this.addNode(astType);
		}
	}

	startComplete(codeStr){
		let ast = jsCodeStrToAst(codeStr);
		if( ast ){
			traverseAst(this.complete, ast);
		}
	}

	complete(ast, parentAst, key){
		let astLN = this.getNode(ast.type);

		astLN.complete(ast);

		if( parentAst ){
			let parentAstLN = this.getNode(parentAst.type);
			parentAstLN.addAstLN(astLN, key, Array.isArray(parentAst[key]));
		}
	}

	toJSON(){

	}

	destroy(){
		this.nodes.clear();
	}
}