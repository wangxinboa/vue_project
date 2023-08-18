import * as monaco from "monaco-editor";
import { Folder, File, getFileTreeByFolder } from './folder_struct/folder.js';
import { checkFolder } from './folder_struct/check_folder.js';

export default function diffFiles(){
	let editor = null,
			defaultLanguage = 'javascript';
			// originalModel = monaco.editor.createModel('', defaultLanguage),
			// modifiedModel = monaco.editor.createModel('', defaultLanguage);

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
	      original: monaco.editor.createModel('', defaultLanguage),
	      modified: monaco.editor.createModel('', defaultLanguage),
	    });
		},
		destory(){
			editor.dispose();
			editor = null;
		},

		oldFiles: null,
		newFiles: null,
		finalFiles: null,
		importOldFiles(files){
			this.oldFiles = getFileTreeByFolder(files);
			if( this.newFiles ){
				this.finalFiles = checkFolder(this.oldFiles, this.newFiles);
			}
		},
		importNewFiles(files){
			if( this.newFiles ){
				this.oldFiles = this.newFiles;
			}
			this.newFiles = getFileTreeByFolder(files);
			if( this.oldFiles ){
				this.finalFiles = checkFolder(this.oldFiles, this.newFiles);
			}
		},
		diff(file){
			// console.log('diff:', file);
			if( file.isCheckFile ){
				let readerOld = new FileReader(),
						rederNew = new FileReader(),
						oldStr = '', newStr = '',
						oldRead = false, newRead = false;

				if( file.oldFile ){
					file.oldFile.read((result)=>{
						oldStr = result;
						oldRead = true;

						if( oldRead && newRead ){

					    editor.setModel({
					      original: monaco.editor.createModel(oldStr, defaultLanguage),
					      modified: monaco.editor.createModel(newStr, defaultLanguage),
					    });
						}
					});
				}else{
					oldRead = true;
				}

				if( file.newFile ){
					file.newFile.read((result)=>{
						newStr = result;
						newRead = true;

						if( oldRead && newRead ){

					    editor.setModel({
					      original: monaco.editor.createModel(oldStr, defaultLanguage),
					      modified: monaco.editor.createModel(newStr, defaultLanguage),
					    });
						}
					});
				}else{
					newRead = true;
				}
			}
		}
	}
}
