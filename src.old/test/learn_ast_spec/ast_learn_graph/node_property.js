
export const PropertyValueTypeFlag = {
	Ast: 'Ast',
	Simple: 'Simple',
	Object: 'Object'
}

export const SimpleDataTypeFlag = {
	Value: 'Value',
	Type: 'Type',
}

export default class NodeProperty{
	constructor(key, valueType, isArray, SimpleDataType, astLN){
		// console.log('key:', key, 'isArray:', isArray, 'valueType:', valueType);

		this.astLN = astLN;
		this.key = key;									// 键值
		this.isArray = isArray;					// 是否是数组
		this.valueType = valueType;			// 指类型
		this.value = [];								// 值
		this.valueMap = new Map();			// 值
		this.codeTemplate = []; 				// 代码模板

		this.SimpleDataType = SimpleDataType;
	}

	changeSimpleDataType(){
		if( this.hasSimpleData() && this.astLN.cacheAst.length > 0 ){
			this.clearData();

			if( this.SimpleDataType === SimpleDataTypeFlag.Type ){

				this.SimpleDataType = SimpleDataTypeFlag.Value;
			}else{

				this.SimpleDataType = SimpleDataTypeFlag.Type;
			}

			this.astLN.cacheAst.forEach((astLN)=>{
				if( astLN.astNode ){
					this.addSimpleData(astLN.astNode[this.key]);
				}
				// console.log('ast:', ast);
				// console.log(`ast[${this.key}]:`, ast[this.key]);
			});
		}
	}

	hasData(label){
		return this.valueMap.has(label);
	}

	addData(data, label){
		this.value.push(data);
		this.valueMap.set(label, data);
	}

	clearData(){
		this.value = [];
		this.valueMap.clear();
	}

	hasSimpleData(){
		return this.valueType === PropertyValueTypeFlag.Simple ||
					this.valueType === PropertyValueTypeFlag.Object
	}

	isAstData(){
		return this.valueType === PropertyValueTypeFlag.Ast;
	}
	getAstDataLabel(astLNode){
		return astLNode.type;
	}
	addAstData(astLNode){
		let label = this.getAstDataLabel(astLNode);
		if( !this.hasData(label) ){
			this.addData( new AstData(astLNode), label );
		}
	}

	isSimpleData(){
		return this.valueType === PropertyValueTypeFlag.Simple;
	}
	getSimpleDataLabel(simpleData){
		if( this.SimpleDataType === SimpleDataTypeFlag.Type ){
			if( simpleData === void 0 ){
				return 'undefined';
			}else if( simpleData === null ){
				return 'null';
			}else{
				return typeof simpleData;
			}
		}else if( this.SimpleDataType === SimpleDataTypeFlag.Value ){
			if( simpleData === void 0 ){
				return 'undefined';
			}else if( simpleData === null ){
				return 'null';
			}else{
				return simpleData;
			}
		}
	}
	addSimpleData(simpleData){
		let label = this.getSimpleDataLabel(simpleData);
		
		if( !this.hasData(label) ){
			this.addData( new SimpleData(label), label );
		}
	}

	isObjectData(){
		return this.valueType === PropertyValueTypeFlag.Object;
	}
	getObjectLabel(objData){
		
	}
	addObjectData(objData){

	}

	static parse(json){

	}

	toJSON(){
		return {
			key: this.key,
			isArray: this.isArray,
			valueType: this.valueType,
			value: this.value,
			codeTemplate: this.codeTemplate,
			SimpleDataType: this.SimpleDataType,
		}
	}
}



export class SimpleData{
	constructor(simpleData, isNew = true){
		this.isNew = isNew;
		this.data = simpleData;
	}
	toJSON(){
		return {
			isNew: this.isNew,
			data: this.data,
		}
	}
}


export class AstData{
	constructor(astLNode, isNew = true){
		this.isNew = isNew;
		this.data = astLNode;
	}
	toJSON(){
		return {
			isNew: this.isNew,
			type: this.data.type,
		}
	}
}

export class ObjectData{
	constructor(data){

	}
}


