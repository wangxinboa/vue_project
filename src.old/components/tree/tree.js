

export default class TreeController{
	// constructor(treeData){
	// }

	getChildren(node, parentMsg){
		if( typeof this.children === 'string' ){
			return node[this.children];
		}else if( typeof this.children === 'function' ){
			return this.children(node, parentMsg);
		}
	}

	getLabel(node, parentMsg){
		if( typeof this.label === 'string' ){
			return node[this.label];
		}else if( typeof this.label === 'function' ){
			return this.label(node, parentMsg);
		}
	}

	selectNode(node){
		this.treeComponent.selectNode(node);
	}


}