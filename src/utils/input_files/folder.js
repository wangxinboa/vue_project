export default class Folder{
	constructor( name ){

		this.type = "folder";

		this.name = name;

		this.folders = [];
		this.foldersMap = new Map();

		this.files = [];
		this.filesMap = new Map();
	}

	hasFolder( name ){

		return this.foldersMap.has( name );
	}
	getFolder( name ){

		return this.foldersMap.get( name );
	}
	addFolder( folder ){

		this.folders.push( folder );
		this.foldersMap.set( folder.name, folder );
	}

	hasFile( name ){

		return this.filesMap.has( name );
	}
	getFile( name ){

		return this.filesMap.get( name );
	}
	addFile( file ){

		this.files.push( file );
		this.filesMap.set( file.name, file );
	}

	getChildrenLength(){

		return this.folders + this.folders;
	}

	toJSON(){
		return {
			type: this.type,
			name: this.name,
			folders: this.folders,
			files: this.files,
		}
	}
}