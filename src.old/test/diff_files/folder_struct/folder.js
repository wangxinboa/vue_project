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

	hasFile(name){
		return this.filesMap.has(name);
	}
	getFile(name){
		return this.filesMap.get(name);
	}
	addFile(file){
		this.files.push(file);
		this.filesMap.set(file.name, file);
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

export class File{
	constructor(name, file){
		this.type = "file";

		this.name = name;
		this.file = file;

		this.text = '';
	}

	read(callback){
		if( this.text ){
			callback(this.text)
		}else{
			let reader = new FileReader();

			reader.readAsText(this.file);
			reader.onload = function(e){
				this.text = reader.result;
				callback(this.text);
			}
		}
	}

	toJSON(){
		return {
			type: this.type,
			name: this.name,
		}
	}
}

export function getFileTreeByFolder(files){

	// 将 files 信息转化为 tree
	let	filesTree = null,
			folderOrders = {};

	for( let i = 0; i < files.length; i++ ){
		let file = files[i],
				path = file.webkitRelativePath.split("/"),
				parentFolde;

		path.forEach((name, level, array)=>{
			if( level === array.length - 1 ){//	是文件

				let fileNode = new File(name, file);

				parentFolde.addFile(fileNode);

			}else{//	是文件夹
				if( level === 0 ){//	是上传的根文件夹

					if( !filesTree ){
						filesTree = new Folder(name);
					}
					parentFolde = filesTree;

				}else{//	是文件夹
					if( parentFolde.hasFolder(name) ){// 还未存在

						parentFolde = parentFolde.getFolder(name);
					}else{

						let folderNode = new Folder(name);

						parentFolde.addFolder(folderNode);
						parentFolde = folderNode;
					}
				}
			}

		});
	}

	return filesTree;
}
