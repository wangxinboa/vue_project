

export default function getFilesTree(files, callback){
	// 将 files 信息转化为 tree
	let	filesTree = null,
			folderOrders = {};

	for( let i = 0; i < files.length; i++ ){
		let file = files[i],
				path = file.webkitRelativePath.split("/"),
				parentFolderNode,

				reader = new FileReader();

		let folderPath = "";// 记录路径
		path.forEach((name, level, array)=>{
			folderPath += `/${name}`

			if( level === array.length - 1 ){//	是文件
				let nameArr = name.split('.');
				if( nameArr[1] === 'glsl' ){

					let fileNode = {
						fullName: name,
						name: nameArr[0],
					}

					reader.readAsText(file);
					parentFolderNode.files.push(fileNode);
					reader.onload = function(e){
						// fileNode.file = reader.result;
						callback(fileNode, reader.result);
					}
				}
			}else{//	是文件夹
				if( level === 0 ){//	是上传的根文件夹
					if( !filesTree ){
						filesTree = {
							name,
							files: [],
						};
					}
					parentFolderNode = filesTree;
				}else{//	是文件夹
					let folderOrder;
					if( folderOrders[folderPath] === void 0 ){// 还未存在
						let folderNode = {
							name,
							files: [],
						}
						// folderOrder = folderOrders[folderPath] = parentFolderNode.files.length;
						folderOrder = folderOrders[folderPath] = 0;
						parentFolderNode.files.unshift(folderNode);
						parentFolderNode = folderNode;
					}else{
						folderOrder = folderOrders[folderPath];
						parentFolderNode = parentFolderNode.files[folderOrder];
					}
				}
			}
		});
	}
	return filesTree;
}

