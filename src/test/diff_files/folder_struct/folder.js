
export class Folder{
	constructor(name){
		this.type = "folder";

		this.name = name;
		
		this.folders = [];
		this.foldersMap = new Map();

		this.files = [];
		this.filesMap = new Map();

	}

	hasFolder(name){
		return this.foldersMap.has(name);
	}
	getFolder(name){
		return this.foldersMap.get(name);
	}

	addFolder(folder){
		this.folders.push(folder);
		this.foldersMap.set(folder.name, folder);
	}

	addFile(file){
		this.files.push(file);
		this.filesMap.set(file.name, file);
	}

	getChildrenLength(){
		return this.folders + this.folders;
	}

	// toJSON(){

	// }
}


export class File{
	constructor(name, file){
		this.type = "file";

		this.name = name;
		this.file = file;


	}

}