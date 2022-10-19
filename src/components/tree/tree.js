
const trees = {};
class Tree{
	getSelectedNode(){
		return this.selectedNode;
	}
	setSelectedNode(node){
		this.selectedNode = node;
	}
	setAccordion(accordion){
		if( typeof accordion === 'boolean' ){
			this.isAccordion = accordion;
		}
		return this;
	}
	getAccordion(){
		return this.isAccordion;
	}
}

export default function createTree(id){
	if( trees[id] ){
		return trees[id];
	}
	return trees[id] = new Tree();
}

export function getTree(id){
	return trees[id];
}