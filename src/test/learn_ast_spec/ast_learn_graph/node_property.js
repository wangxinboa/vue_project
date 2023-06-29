
const PropertyValueFlag = {
	
}

export default class NodeProperty{
	constructor(key){
		this.key = key;
		this.primitive = [];
		this.objectValue = [];
		this.astLearnNodes = [];
		this.astLNArray = [];
	}
	addPrimitive(dataType){
		if( this.astLNArray.length > 0 ){
			console.error('Primitive 和 Array<AstLN> 共存')
		}
		if( this.astLearnNodes.length > 0 ){
			console.error('Primitive 和 AstLN 共存')
		}
		if( !this.primitive.includes(dataType) ){
			this.primitive.push(dataType);
		}
	}
	addObjectValue(obj){

	}
	addAstLN(astLN){
		if( this.astLNArray.length > 0 ){
			console.error('AstLN 和 Array<AstLN> 共存')
		}
		if( this.primitive.length > 0 ){
			console.error('AstLN 和 Primitive 共存')
		}
		if( !this.astLearnNodes.includes(astLN) ){
			this.astLearnNodes.push(astLN);
		}
	}
	addArrayAstLN(astLN){
		if( this.astLearnNodes.length > 0 ){
			console.error('Array<AstLN> 和 AstLN 共存')
		}
		if( this.primitive.length > 0 ){
			console.error('Array<AstLN> 和 Primitive 共存')
		}
		if( !this.astLNArray.includes(astLN) ){
			this.astLNArray.push(astLN);
		}
	}
}
