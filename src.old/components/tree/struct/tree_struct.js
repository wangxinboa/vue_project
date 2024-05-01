

export default class TreeStruct{
	constructor(data){
		this.data = data;
		this.children = [];
	}

	addChildren(childrenData){
		childrenData.forEach((childData)=>{
			this.children.push(new TreeStruct(childData));
		});
	}

	dispose(){
		this.data = null;
		this.label = null;
		this.children.forEach((child)=>{
			child.dispose();
		});
		this.children = null;
	}
}