import NodeProperty from './node_property.js';
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
		this.properties = []
	}

	findProperty(key){
		return this.properties.find((property)=>{
			return property.key === key;
		});
	}

	addProperty(key){
		let property = new NodeProperty(key);
		this.properties.push(property);
		return property;
	}
	
	getProperty(key){
		let property = this.findProperty(key);
		if( property ){
			return property;
		}else{
			return this.addProperty(key);
		}
	}

	complete(ast){
		for( let key in ast ){
			if( !SkipAstKey[key] ){

				this.addPropertyValue(key, ast[key], ast);
			}
		}
	}

	addPropertyValue(key, val, ast){
		if( typeof val === 'number' ||
			typeof val === 'string' ||
			typeof val === 'boolean' ){
			
			this.getProperty(key)
				.addPrimitive( typeof val );

		}else if( isJsAst(val) ){
			if( !this.findProperty(key) ){
				this.addProperty(key);
			}
		}else if(( Array.isArray( val ) && val.every((item)=>{ return isJsAst(item); }) )){
			if( val.length > 0 && !this.findProperty(key) ){
				this.addProperty(key);
			}
		}else if( val === undefined || val === null ){
			// console.log(`ast[${key}]:`, ast, val);
		}else{
			if( ast.type === 'TemplateElement' && key === 'value' ){

				this.getProperty(key)
					.addPrimitive( '{ cooked: string | null; raw: string; }' );

			}else{
				console.error(`节点中有未纳入规划的数据类型 ${ast.type}-${key}:`, this.type, val, ast);
			}
		}
	}

	addAstLN(childAst, key, isInParentArray){
		let property = this.getProperty(key);
		if( property ){
			if( isInParentArray ){
				property.addArrayAstLN(childAst);
			}else{
				property.addAstLN(childAst);
			}
		}else{
			console.error('出错, 未找到该ast学习节点对应属性的键值:', key, this);
		}
	}

	getAstLN(){

	}

	toJson(){

	}

	destroy(){

	}
}