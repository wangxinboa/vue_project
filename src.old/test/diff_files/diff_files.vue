<template>
	<div id="diffFiles">
		<div class="files_tree">
			<div class="files_tree-header">
				<div class="btn old">importOld
					<input class="hidden_input_button"
						type="file" webkitdirectory="true"
						v-on:change="importOldFiles" />
				</div>
				<div class="btn new">importNew
					<input class="hidden_input_button"
						type="file" webkitdirectory="true"
						v-on:change="importNewFiles"/>
				</div>
				<div class="btn new_to_old"
					v-on:mousedown="newToOld">newToOld</div>
			</div>
			<div class="files_tree-content">
				<c-tree
					dataType="treeType"
					:treeData="diffFiles.finalFiles"
					:label="getLabel"
					:children="getChildren"
					v-on:selectNode="diffFiles.diff"
					/>
			</div>
		</div>
		<div class="file_code"
			ref="editorContainer"></div>
	</div>
</template>


<script>
	import diffFiles from './diff_files.js';

	export default {
		data(){
			return {
				diffFiles: diffFiles(),
			}
		},
		provide(){
			return {
				diffFiles: this.diffFiles
			}
		},
		methods: {
			importOldFiles(e){
				this.diffFiles.importOldFiles(e.target.files);
			},
			importNewFiles(e){
				this.diffFiles.importNewFiles(e.target.files);
			},
			newToOld(){

			},
			getChildren(node){
				// return node.folder
				if( node && node.folders && node.files ){
					return node.folders.concat(node.files);
				}
				return []
			},
			getLabel(node){
				if( node ){
					return `${node.name} ${node.type}`;
				}
				return '';
			}
		},
		mounted(){
			this.diffFiles.initMonacoEditor(this.$refs.editorContainer);
		},
		beforeDestroy(){
			console.log('beforeDestroy');
		}
	}
</script>

<style lang="less">
	#diffFiles{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    >.files_tree{
    	display: flex;
    	flex-direction: column;
    	width: 3rem;
    	height: 100%;
	    background-color: #262626;
			border-right: 0.01rem solid #5b5b5b;

    	>.files_tree-header{
				padding: 0.06rem 0.04rem;
				display: flex;
				justify-content: flex-end;
    		width: 100%;
				height: 0.32rem;
				border-bottom: 0.01rem solid #5b5b5b;

    		>.btn{
    			position: relative;
					padding: 0 0.04rem;
					height: 0.2rem;
					line-height: 0.2rem;
					font-size: 0.12rem;
					border-radius: 0.04rem;
					color: #ffffff;
					transition: background-color .3s, color .3s;
					cursor: pointer;

    		}
				>.btn:hover{
					background-color: #6d6d6d;
				}
				>.btn:active{
					background-color: #434343;
				}
    	}

    	>.files_tree-content{
    		width: 100%;
    		height: 0;
    		flex: 1;
    	}
    }
    >.file_code{
    	width: 0;
    	flex: 1;
    	height: 100%;
    	background-color: #1e1e1e;
    }

	}
</style>