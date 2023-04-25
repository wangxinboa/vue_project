

export default class NodeProperty{
	constructor(key){
		this.key = key;
		this.primitive = [];
		this.astLearnNodes = [];
		this.astLNArray = [];
	}
	addPrimitive(dataType){
		if( !this.primitive.includes(dataType) ){
			this.primitive.push(dataType);
		}
	}
	addAstLN(astLN){
		if( !this.astLearnNodes.includes(astLN) ){
			this.astLearnNodes.push(astLN);
		}
	}
	addArrayAstLN(astLN){
		if( !this.astLNArray.includes(astLN) ){
			this.astLNArray.push(astLN);
		}
	}
}
