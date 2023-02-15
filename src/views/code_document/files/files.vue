<template>
	<div id="codeDocument-filesView">
		<div class="header">
			<div class="title">
				原始项目代码文件
			</div>
			<div class="btns">
				<div class="icon">
					<div class="iconfont icon-import import"
						title="导入项目代码文件">
						<input class="import_code_files"
						type="file" webkitdirectory='true'
						v-on:change="importCodeFiles" />
					</div>
				</div>
				<div class="icon">
					<div class="iconfont icon-yanjiu"
						:data-selected="analyseResult.isOnlyShowAnalyseFile"
						title="只展示解析文件"
						v-on:mousedown="setShowAnalyse">
					</div>
				</div>
			</div>
		</div>
		<div class="file_tree">
			<v-file_node
				v-if="analyseResult.filesTree"
				:analyseResult="analyseResult"
				:fileNode="analyseResult.filesTree"/>

		</div>
	</div>
</template>

<script>
	import fileNode from './file_node.vue';
	import { getFileTreeByFolder } from './file_tree.js';

	export default {
		components: {
			"v-file_node": fileNode
		},
		props: {
			analyseResult: {
				type: Object
			},
		},
		methods: {
			importCodeFiles(e){
				let files = e.target.files;

				this.analyseResult.filesTree = getFileTreeByFolder(files);
				this.analyseResult.selectedFile = null;
			},
			setShowAnalyse(){
				this.analyseResult.isOnlyShowAnalyseFile = !this.analyseResult.isOnlyShowAnalyseFile;
			}
		}
	}
</script>

<style lang="less">
	#codeDocument-filesView{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #494949;
    border-right: 0.02rem solid #000000;

		>.header{
			display: flex;
	    padding: 0.04rem 0.1rem;
	    width: 100%;
	    height: 0.4rem;

			>.title{
				font-size: 0.14rem;
				color: #ffffff;
				line-height: 0.32rem;
				white-space: nowrap;
			}
			>.btns{
				display: flex;
				flex-direction: row-reverse;
				flex: 1;
				height: 100%;
				>.icon{
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 0.04rem;
					>.iconfont{
						width: 0.26rem;
						height: 0.26rem;
						line-height: 0.26rem;
						text-align: center;
						cursor: pointer;
						border-radius: 0.04rem;
						color: #ffffff;
						transition: background-color .3s;
						&:hover{
							background-color: #333333;
						}
					}
					>.iconfont[data-selected="true"]{
						background-color: #000000;
					}
					>.import{
						position: relative;
						>.import_code_files{
							position: absolute;
							left: 0;
							top: 0;
							font-size: 0;
							width: 100%;
							height: 100%;
							opacity: 0;
							cursor: pointer;
						}
					}
				}
			}
		}
		>.file_tree{
			padding: 0.1rem 0 0 0;
			width: 100%;
			flex: 1;
			border-top: 0.02rem solid #000000;
			overflow: auto;
		}
	}
</style>