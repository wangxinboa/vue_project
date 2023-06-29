import { isJsAst } from '../utils.js';

const SkipAstKey = {
	'type': true,
	'loc': true,
	'start': true,
	'end': true,
	'extra': true,
	'__clone': true,
}

export default class AstLearnNode{
	constructor(astType){
		this.type = astType;
		this.children = [];
	}

	findChild(astType){
		return this.children.find((astLN)=>{
			return astLN.type === astType;
		});
	}

	addChild(astLN){
		if( !this.findChild(astLN.type) ){
			this.children.push(astLN);
		}
		return astLN;
	}

	toDagreNode(){
		return {
			label: this.type
		}
	}

}