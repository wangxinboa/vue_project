// 抄自 https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js

import {
	eachBR,
	eachBB
} from './traverse.js';
import sort from './sort.js';

let defaultChildrenKey = 'children';

function defaultGetData(source){
	let data = {};
	for(let key in source){
		if( key !== defaultChildrenKey ){
			data[key] = source[key];
		}
	}
	return data;
}

function defaultGetChildren(data){
	let children = data[defaultChildrenKey];
	if( Array.isArray(children) && children.length > 0 ){
		return children;
	}
}

export default function TreeNode(
		data, 
		getData = defaultGetData, 
		getChildren = defaultGetChildren
	){
	this.data = getData(data);
	this.children = null;
	let childrenTemp = getChildren(data);
	if( childrenTemp ){
		this.children = [];
		childrenTemp.forEach((item)=>{
			this.children.push(new TreeNode(item, getData, getChildren));
		});
	}
}

TreeNode.prototype.eachBR = eachBR;
TreeNode.prototype.eachBB = eachBB;
TreeNode.prototype.sort = sort;
