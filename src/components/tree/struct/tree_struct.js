

export default class TreeStruct{
	constructor(data){
		this.data = data;
		this.children = [];
	}

	addChildren(data){

	}

	dispose(){
		this.data = null;
		this.children.forEach((child)=>{
			child.dispose();
		});
		this.children = null;
	}
}