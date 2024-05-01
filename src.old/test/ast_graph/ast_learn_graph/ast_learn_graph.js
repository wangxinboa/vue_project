import AstLearnNode from './ast_learn_node.js';
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

	complete(ast, parentAst){
		let astLN = this.getNode(ast.type);

		if( parentAst ){
			let parentAstLN = this.getNode(parentAst.type);
			parentAstLN.addChild(astLN);
		}
	}

	toDagre(){
		let
			states = this.nodes.map((astLN)=>{
				return astLN.toDagreNode();
			}),
			transitions = [];

		this.nodes.forEach((astLN)=>{
			astLN.children.forEach((child)=>{
				transitions.push({
					source: states.find((dargeNode)=>{
						return dargeNode.label === astLN.type
					}),
					target: states.find((dargeNode)=>{
						return dargeNode.label === child.type
					})
				})
			});
		});

		return {
			states, transitions,
		}
	}

	toDagreJSON(){
		let transitions = [];

		this.nodes.forEach((astLN)=>{
			astLN.children.forEach((child)=>{
				transitions.push({
					source: astLN.type,
					target: child.type
				})
			});
		});

		return transitions;
	}

	toWebColaJSON(){
		let
			nodes = this.nodes.map((astLN)=>{
				return {
					name: astLN.type,
					width: 20 * astLN.type.length,
					height: 50,
				};
			}),
			links = [];

		this.nodes.forEach((astLN)=>{
			astLN.children.forEach((child)=>{
				links.push({
					source: this.nodes.indexOf(astLN),
					target: this.nodes.indexOf(child)
				})
			});
		});

		return {
			nodes, links
		}
	}

	toJSON(){

	}

	destroy(){
		this.nodes.clear();
	}
}