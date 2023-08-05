import * as monaco from "monaco-editor";
import { Folder, File } from './folder_struct/folder.js';

// export default class DiffFiles{
// 	constructor(){
// 		this.oldFiles = null;
// 		this.NewFiles = null;
// 	}

// 	importOldFiles(files){
// 		this.oldFiles = getFileTreeByFolder(files);
// 		console.log('oldFiles', JSON.stringify(this.oldFiles, null, 4));
// 	}

// 	importNewFiles(files){
// 		this.NewFiles = getFileTreeByFolder(files);
// 		console.log('NewFiles', JSON.stringify(this.NewFiles, null, 4));
// 	}

// 	initEditor(editorContainer){

// 	}



// }

export default function diffFiles(){
	let editor = null,
			language = 'javascript',
			originalModel = monaco.editor.createModel('123', language),
			modifiedModel = monaco.editor.createModel('321', language);
	return {
		initMonacoEditor(containerDom){
			editor = monaco.editor.createDiffEditor(containerDom, {
	      minimap: {
	        enabled: false // 是否启用预览图
	      }, // 预览图设置
	      readOnly: true, // 是否只读
	      theme: "vs-dark",
	      //enableSplitViewResizing: false,
	      renderSideBySide: true,
	      originalEditable: true,
	    });
	    editor.setModel({
	      original: originalModel,
	      modified: modifiedModel,
	    });
		},

		setCode(oldStr, newStr){

		},

		destory(){
			diffEditor.dispose()
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