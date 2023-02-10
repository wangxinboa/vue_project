

export function getFileTreeByFolder(files){

	// 将 files 信息转化为 tree
	let	filesTree = null,
			folderOrders = {};

	for( let i = 0; i < files.length; i++ ){
		let file = files[i],
				path = file.webkitRelativePath.split("/"),
				parentFolderNode,

				reader = new FileReader();

		let folderPath = "",
				fileOrderPath = "";
		path.forEach((name, level, array)=>{
			console.log('name:', name);
			folderPath += `/${name}`

			if( level === array.length - 1 ){//	是文件
				let fileNode = {
					name,
					orderPath: level > 1 ? `${fileOrderPath}-${parentFolderNode.files.length}` : `${parentFolderNode.files.length}`,
					type: "file",
					folder: parentFolderNode,
					isAnalyse: false
				}
				Object.defineProperty(fileNode, "folder", {
					value: parentFolderNode,
					enumerable: false
				});
				reader.readAsText(file);
				parentFolderNode.files.push(fileNode);
				reader.onload = function(e){
					fileNode.file = reader.result;
				}
			}else{//	是文件夹
				if( level === 0 ){//	是上传的根文件夹
					if( !filesTree ){
						filesTree = {
							name,
							type: "folder",
							files: [],
							hasAnalyse: false,
							isAnalyse: false
						};
					}
					parentFolderNode = filesTree;
				}else{//	是文件夹
					let folderOrder;
					if( folderOrders[folderPath] === void 0 ){// 还未存在
						let folderNode = {
							name,
							type: "folder",
							files: [],
							hasAnalyse: false,
							isAnalyse: false
						}
						Object.defineProperty(folderNode, "folder", {
							value: parentFolderNode,
							enumerable: false
						});
						folderOrder = folderOrders[folderPath] = parentFolderNode.files.length;
						parentFolderNode.files.push(folderNode);
						parentFolderNode = folderNode;
					}else{
						folderOrder = folderOrders[folderPath];
						parentFolderNode = parentFolderNode.files[folderOrder];
					}
					if( level > 1 ){
						fileOrderPath += `-${folderOrder}`;
					}else{
						fileOrderPath += `${folderOrder}`;
					}
					// console.log("parentFolderNode:", parentFolderNode);
				}
			}

			// console.log("folderOrders:", folderOrders);
		});
	}
	// console.log('filesTree:', filesTree);
	return filesTree;
}

export function initJsonFileTree(folder){
	// console.log('fileTree:', fileTree);

	if(folder.files){
		folder.files.forEach((file)=>{
			Object.defineProperty(file, "folder", {
				value: folder,
				enumerable: false
			});
			if( file.type === "folder" ){
				initJsonFileTree(file);
			}
		});
	}

	return folder;
}


