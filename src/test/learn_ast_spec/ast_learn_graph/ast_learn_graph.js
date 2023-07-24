import AstLearnNode from './ast_learn_node.js';
import astLGJson from './ast_learn_graph.json';
import { jsCodeStrToAst, isAstNode } from './utils.js';

const SkipAstKey = {
	'type': true,
	'loc': true,
	'start': true,
	'end': true,
	'extra': true,
	'__clone': true,
}

export default class AstLearnGraph{
	constructor(){
		this.nodes = [];
		this.nodesMap = new Map();

		this.newNodes = [];
		this.newNodesMap = new Map();
		

		this.cacheCode = [];
		this.cacheCodeIndex = -1;
	}

	hasLNode(astType){
		return this.nodesMap.has(astType);
	}

	getLNode(astType){
		return this.nodesMap.get(astType);
	}
	getLNodes(){
		return this.nodes;
	}

	addLNode(nodeType){
		let node = new AstLearnNode(nodeType, this);

		this.nodes.push(node);
		this.nodesMap.set(nodeType, node);
		return node;
	}

	acquireLNode(nodeType){

		if( this.hasLNode(nodeType) ){
			
			return this.getLNode(nodeType);
		}else{

			return this.addLNode(nodeType);
		}
	}

	startComplete(codeStr){
		// console.log('startComplete');
		try{
			let astNode = jsCodeStrToAst(codeStr);

			this.cacheCode.push(codeStr);
			this.cacheCodeIndex ++;

			this.complete(astNode);

			return astNode;
		}catch(e){
			console.error(e);
		}
	}

	complete(astNode){
		// console.log('astNode:', astNode);
		let astLNode = this.acquireLNode(astNode.type),
				childAstLNode = null;

		astLNode.cache(astNode, this.cacheCodeIndex);

		for( let key in astNode ){
			if( !SkipAstKey[key] ){

				let value = astNode[key];

				if( Array.isArray(value) ){

					value.forEach((item)=>{

						astLNode.addData(key, item, true);

						if( isAstNode(item) ){
							this.complete(item);
						}

					});
				}else{
					astLNode.addData(key, value);

					if( isAstNode(value) ){
						this.complete(value);
					}
				}

			}

		}
	}

	parse(jsonGraph){
		jsonGraph.forEach((astLNode)=>{
			// console.log('astLNode:', astLNode);
			this.acquireLNode(astLNode.type);
		});

		jsonGraph.forEach((astLNode)=>{
			AstLearnNode.parse(astLNode, this);
		});
	}

	toJSON(){
		return this.nodes;
	}

	destroy(){
		this.nodes = null;
		this.nodes.clear();
	}
}