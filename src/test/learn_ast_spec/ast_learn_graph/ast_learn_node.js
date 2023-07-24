import { isAstNode, isReference, isSampleData } from './utils.js';
import NodeProperty, {
	PropertyValueTypeFlag, SimpleDataTypeFlag,
	SimpleData, AstData, ObjectData
} from './node_property.js';

export default class AstLearnNode{
	constructor(nodeType, graph){
		this.graph = graph;

		this.type = nodeType;

		this.keyMsgs = [];
		this.keyMsgsMap = new Map();

		this.cacheAst = [];
	}

	cache(astNode, cacheCodeIndex){
		this.cacheAst.push({
			astNode,
			cacheCodeIndex,
		})
	}

	hasKeyMsg(key){
		return this.keyMsgsMap.has(key);
	}

	getKayMsg(key){
		return this.keyMsgsMap.get(key);
	}

	addKeyMsg(key, valueType, isArray, SimpleDataType){

		let keyMsg = new NodeProperty(key, valueType, isArray, SimpleDataType, this);
		this.keyMsgsMap.set(key, keyMsg);
		this.keyMsgs.push(keyMsg);
		return keyMsg;
	}

	acquireKeyMsg(key, valueType, isArray, SimpleDataType){
		if( this.hasKeyMsg(key) ){
			return this.getKayMsg(key);
		}else{
			return this.addKeyMsg(key, valueType, isArray, SimpleDataType);
		}
	}

	addData(key, data, isArray = false, SimpleDataType = SimpleDataTypeFlag.Type){
		if( isAstNode(data) ){
			let
				valueType = PropertyValueTypeFlag.Ast,
				keyMsg = this.acquireKeyMsg(key, valueType, isArray, SimpleDataType);

			keyMsg.addAstData(data);
		}else if( isSampleData(data) ){
			let
				valueType = PropertyValueTypeFlag.Simple,
				keyMsg = this.acquireKeyMsg(key, valueType, isArray, SimpleDataType);

			keyMsg.addSimpleData(data);
		}else{
			console.error('未处理的额外情况:', key, data, this);
		}

	}

	checkValueType(keyMsg, initValueType){
		if( keyMsg.valueType !== initValueType ){
			console.error('astNode:', JSON.stringify(this, null, 4));
			console.error('keyMsg:', JSON.stringify(keyMsg, null, 4));
			throw new Error(`astNode ${keyMsg.key} 属性中有不一样类型的数值`);
		}
	}

	static parse(jsonNode, graph){
		// console.log('jsonNode:', jsonNode);
		let node = graph.acquireLNode(jsonNode.type);

		jsonNode.keyMsgs.forEach((keyMsg)=>{
			let key = node.acquireKeyMsg(keyMsg.key, keyMsg.valueType, keyMsg.isArray, keyMsg.SimpleDataType);

			if( key.isAstData() ){
				// key
				keyMsg.value.forEach((val)=>{
					// console.log('val:', val);
					// console.log('node:', graph.acquireLNode(val.type));
					key.addData( new AstData( graph.acquireLNode(val.type), val.isNew ), val.type );
				});
			}else if( key.isSimpleData() ){
				keyMsg.value.forEach((val)=>{
					// console.log('val:', val);
					key.addData( new SimpleData(val.data, val.isNew) );
				});
			}

			// node.addData(keyMsg.key, keyMsg.valueType, keyMsg.isArray, keyMsg.SimpleDataType);
		});

		return node;
	}

	toJSON(){
		return {
			type: this.type,
			keyMsgs: this.keyMsgs,
		}
	}

	destroy(){

	}
}