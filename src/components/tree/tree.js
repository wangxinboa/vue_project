
class TreeNode{
	constructor(data, children){

		this.data = data;
		this.children = children;

		this.selected = false;
	}

}

export default class TreeStore{

	constructor( allowCheck ){

		this.allowCheck = allowCheck;

		this.nodesMap = new Map();

		this.selectedNode = null;
		this.selectedNodes = new Map();
	}

	getTreeNode( nodes, getChildren ){

		if( !Array.isArray( nodes ) && nodes?.length === void 0 ){

			return null;
		}

		const treeNodes = []

		nodes.forEach(( child )=>{

			const treeNode = new TreeNode(
													child,
													this.getTreeNode( getChildren(child), getChildren )
												);

			this.nodesMap.set( child, treeNode );

			treeNodes.push( treeNode );
		});

		return treeNodes;
	}

	selectDataNode( data ){

		let node = this.nodesMap.get( data ) || null;

		if( this.selectedNode !== node ){

			if( this.selectedNode ){

				this.selectedNode.selected = false;
			}

			if( node ){

				node.selected = true;
			}

			this.selectedNode = node;
		}
	}

	selectDataNodes( data ){

	}

	selectNode( node ){

		if( this.allowCheck ){

		}else{

			node.selected = !node.selected;

			if( this.selectedNode === node ){

				this.selectedNode = null;
			}else if( this.selectedNode !== null ){

				if( !this.allowCheck && this.selectedNode.selected ){

					this.selectedNode.selected = false;
				}

				this.selectedNode = node;
			} else{

				this.selectedNode = node;
			}
		}

		return this.selectedNode;
	}
}
