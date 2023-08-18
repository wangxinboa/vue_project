
const CheckType = {
	Same: 'Same',
	Add: 'Add',
	Del: 'Del',
}

export class CheckFolder{
	constructor(name, type){
		this.name = name;

		this.type = type;

		this.isCheckFolder = true;

		this.folders = [];
		this.foldersMap = new Map();

		this.files = [];
		this.filesMap = new Map();
	}

	checkFolder(oldFolder, newFolder){

		oldFolder.foldersMap.forEach((folder, name)=>{

			if( newFolder.hasFolder(name) ){

				this.addCheckFolder(
					new CheckFolder(name, CheckType.Same)
						.checkFolder(folder, newFolder.getFolder(name))
				);
			}else{

				this.addCheckFolder(
					new CheckFolder(name, CheckType.Del)
						.addDelFolder(folder)
				);
			}
		});

		oldFolder.filesMap.forEach((file, name)=>{

			if( newFolder.hasFile(name) ){

				this.addCheckFile(
					new CheckFile(name, CheckType.Same)
						.addOldFile(file)
						.addNewFile(newFolder.getFile(name))
				);
			}else{

				this.addCheckFile(
					new CheckFile(name, CheckType.Del)
						.addOldFile(file)
				)
			}
		});

		newFolder.foldersMap.forEach((folder, name)=>{

			if( !oldFolder.hasFolder(name) ){

				this.addCheckFolder(
					new CheckFolder(name, CheckType.Add)
						.addAddFolder(folder)
				);
			}
		});

		newFolder.filesMap.forEach((file, name)=>{

			if( !oldFolder.hasFile(name) ){

				this.addCheckFile(
					new CheckFile(name, CheckType.Add)
						.addNewFile(file)
				);
			}
		});

		this.folders.sort((a, b)=>{
			return a.name > b.name ? 1 :
						a.name < b.name ? -1 : 0 
		});
		this.files.sort((a, b)=>{
			return a.name > b.name ? 1 :
						a.name < b.name ? -1 : 0 
		});

		return this;
	}

	addCheckFolder(folder){
		this.folders.push(folder);
		this.foldersMap.set(folder.name, folder);

		return this;
	}

	addDelFolder(folder){
		folder.foldersMap.forEach((folder, name)=>{
			this.addCheckFolder(
				new CheckFolder(name, CheckType.Del)
					.addDelFolder(folder)
			);
		});

		folder.filesMap.forEach((file, name)=>{
			this.addCheckFile(
				new CheckFile(name, CheckType.Del)
					.addOldFile(file)
			)
		});

		return this;
	}

	addAddFolder(folder){
		folder.foldersMap.forEach((folder, name)=>{
			this.addCheckFolder(
				new CheckFolder(name, CheckType.Add)
					.addAddFolder(folder)
			);
		});

		folder.filesMap.forEach((file, name)=>{
				this.addCheckFile(
					new CheckFile(name, CheckType.Add)
						.addNewFile(file)
				);
		});

		return this;
	}

	addCheckFile(file){
		this.files.push(file);
		this.filesMap.set(file.name, file);

		return this;
	}

}

export class CheckFile{
	constructor(name, type){
		this.name = name;
		this.type = type;

		this.oldFile = null;
		this.newFile = null;

		this.isCheckFile = true;
	}

	addOldFile(oldFile){
		this.oldFile = oldFile;

		return this;
	}

	addNewFile(newFile){
		this.newFile = newFile;

		return this;
	}

}

export function checkFolder(oldFolder, newFolder){
	// let checkFolder;
	return new CheckFolder('root', CheckType.Same)
					.checkFolder(oldFolder, newFolder);
}