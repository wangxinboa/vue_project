import File from './file.js';
import Folder from './folder.js';

export default function getFiles( files ){

	// 将 files 信息转化为 tree
	let	filesTree = null,
			folderOrders = {};

	for( let i = 0; i < files.length; i++ ){
		let file = files[i],
				path = file.webkitRelativePath.split("/"),
				parentFolde;

		path.forEach(( name, level, array )=>{
			if( level === array.length - 1 ){//	是文件

				let fileNode = new File( file );

				parentFolde.addFile( fileNode );

			}else{//	是文件夹
				if( level === 0 ){//	是上传的根文件夹

					if( !filesTree ){
						filesTree = new Folder( name );
					}
					parentFolde = filesTree;

				}else{//	是文件夹
					if( parentFolde.hasFolder( name ) ){// 还未存在

						parentFolde = parentFolde.getFolder( name );
					}else{

						let folderNode = new Folder( name );

						parentFolde.addFolder(folderNode);
						parentFolde = folderNode;
					}
				}
			}

		});
	}

	return filesTree;
}