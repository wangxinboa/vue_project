<template>
	<div id="codeDocument">
		<div class="header">
			<div class="title">
				<div class="iconfont icon-yuandaimaxiayoudaima"></div>
				<div class="text" >代码文档</div>
			</div>
			<div class="set">
				<div class="icon">
					<div class="iconfont icon-set">
						<c-dropdown class="set-btns_container">
							<div class="set-btns">
								<div class="set-btn import">导入解析结果
									<input class="import_project" type="file" />
								</div>
								<div class="set-btn export"
									v-on:mousedown="exportProject">导出解析结果</div>
							</div>
						</c-dropdown>
					</div>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="bar">
				<div
					:data-selected="analyseResult.fileListVisible"
					class="item-btn"
					title="文件列表"
					v-on:mousedown="setFileListVisible()">列</div>
				<div
					:data-selected="analyseResult.codeVisible"
					class="item-btn"
					title="代码文件"
					v-on:mousedown="setCodeVisible()">
					代
				</div>
				<div
					:data-selected="analyseResult.mapVisible"
					class="item-btn"
					title="代码关系图"
					v-on:mousedown="setMapVisible()">
					图
				</div>
			</div>
			<div class="items">
				<div class="item files" ref="fileList"
					:style="{
						width: analyseResult.fileListVisible ? ( analyseResult.filesTreeViewWidth + 'rem' ) : 0
					}">
					<v-files 
						:analyseResult="analyseResult"/>
				</div>

				<div class="item code">
					<div class="code" ref="code"
						:style="{
							width: analyseResult.codeVisible ? 
											analyseResult.mapVisible ? '50%' : '100%' : '0'
						}">
						<v-code
							:analyseResult="analyseResult" />
					</div>
					<div class="map" ref="codeMap"
						:style="{
							width: analyseResult.mapVisible ? 
											analyseResult.codeVisible ? '50%' : '100%' : '0'
						}">
						<v-map 
							:analyseResult="analyseResult"/>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import dropdown from './dropdown.vue';
	import files from './files/files.vue';
	import code from './code/code.vue';
	import map from './map/map.vue';
	import analyseResult from './analyseResult.json';
	import { initJsonFileTree } from './files/file_tree';


	export default {
		components: {
			"c-dropdown": dropdown,
			"v-files": files,
			"v-code": code,
			"v-map": map,
		},
		data(){
			return {
				analyseResult: {
					filesTreeViewWidth: 2.5,

					filesTree: null,
					selectedFileOrderPath: null,

					selectedFile: null,

					isOnlyShowAnalyseFile: false,

					fileListVisible: true,
					codeVisible: true,
					mapVisible: false,
				},
			}
		},
		created(){
			// console.log('analyseResult:', analyseResult);
			this.initAnalyseResult(analyseResult);
		},
		methods: {
			importProject(){

			},
			initAnalyseResult(json){
				// console.log("json:", json);
				this.setFileListVisible(json.fileListVisible);
				this.setCodeVisible(json.codeVisible);
				this.setMapVisible(json.mapVisible);

				this.analyseResult.filesTree = initJsonFileTree(json.filesTree);
				this.analyseResult.isOnlyShowAnalyseFile = json.isOnlyShowAnalyseFile;
				this.analyseResult.selectedFileOrderPath = json.selectedFileOrderPath;

				let orderPath = this.analyseResult.selectedFileOrderPath,
						folderFiles = this.analyseResult.filesTree.files;

				if( typeof json.selectedFileOrderPath === "string"  ) {
					let file;
					orderPath.split('-').forEach((order,)=>{
						file = folderFiles[order];
						folderFiles = file.files;
					});

					this.analyseResult.selectedFile = file;
				}
			},
			exportProject(){
				// console.log('exportProject');
				// console.log("this.analyseResult.filesTree:", this.analyseResult.filesTree);
				let
					analyseResult = {
						version: '0',
						fileListVisible: this.analyseResult.fileListVisible,
						codeVisible: this.analyseResult.codeVisible,
						mapVisible: this.analyseResult.mapVisible,

						filesTree: this.analyseResult.filesTree,
						isOnlyShowAnalyseFile: this.analyseResult.isOnlyShowAnalyseFile,
						selectedFileOrderPath: this.analyseResult.selectedFileOrderPath
					},
					eleLink = document.createElement('a');
				eleLink.download = 'analyseResult.json';
				eleLink.style.display = 'none';
				// 字符内容转变成blob地址
				var blob = new Blob([JSON.stringify(analyseResult)]);
				eleLink.href = URL.createObjectURL(blob);
				// 触发点击
				// document.body.appendChild(eleLink);
				document.body.appendChild(eleLink);
				eleLink.click();
				// 然后移除
				document.body.removeChild(eleLink);
			},
			setFileListVisible(visible){
				if( visible !== void 0 ){
					this.analyseResult.fileListVisible = visible;
				}else{
					this.analyseResult.fileListVisible = !this.analyseResult.fileListVisible;
				}
			},
			setCodeVisible(visible){
				if( visible !== void 0 ){
					this.analyseResult.codeVisible = visible;
				}else{
					this.analyseResult.codeVisible = !this.analyseResult.codeVisible;
				}
			},
			setMapVisible(visible){
				if( visible !== void 0 ){
					this.analyseResult.mapVisible = visible;
				}else{
					this.analyseResult.mapVisible = !this.analyseResult.mapVisible;
				}
			}
		}
	}
</script>

<style lang="less">
	#codeDocument{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.header{
			display: flex;
			height: 0.5rem;
			background-color: #24292f;
			>.title{
				display: flex;
				padding-left: 0.1rem;
				flex: 1;
				height: 100%;
				>div{
					color: #ffffff;
					line-height: 0.5rem;
				}
				>.iconfont{
					font-size: 0.16rem;
				}
				>.iconfont.has_buttons{
					position: relative;
					>.buttons{
						position: absolute;
					}
					>.project_operation{
						top: 0;
						left: 0;
						width: 1rem;
						height: 2rem;
						background-color: #000000;
					}
				}
				>.text{
					padding-left: 0.08rem;
					font-size: 0.14rem;
				}
			}
			>.set{
				display: flex;
		    flex-direction: row-reverse;
				padding-right: 0.1rem;
				height: 100%;
				>.icon{
					display: flex;
					flex-direction: column;
			    justify-content: center;
					height: 100%;
					>.iconfont{
						position: relative;
						padding: 0.04rem;
						width: 0.26rem;
						height: 0.26rem;
						color: #ffffff;
						border-radius: 0.04rem;
						cursor: pointer;
						transition: background-color .3s;
						&:hover{
							background-color: #484848;
						}
						>.set-btns_container{
							position: absolute;
							right: 0;
							top: 0.3rem;
					    z-index: 1;
					    >.set-btns{
					    	padding: 0.04rem 0;
						    background-color: rgba(0, 0, 0, 80%);
						    border-radius: 0.04rem;
								>.set-btn{
									padding: 0.04rem 0.14rem;
									white-space: nowrap;
									text-align: center;
									transition: background-color .3s;
									font-size: 0.12rem;
									cursor: pointer;
							    &:hover{
							    	background-color: #ff0000;
							    }
								}
								>.set-btn.import{
									position: relative;
									>.import_project{
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
				}
			}
		}
		>.main{
			display: flex;
			height: 0;
			flex: 1;
			>.bar{
				padding: 0.54rem 0 0 0;
				display: flex;
				flex-direction: column;
				width: 0.4rem;
				height: 100%;
				background-color: #333333;
				>.item-btn{
					width: 100%;
					height: 0.4rem;
					color: #ffffff;
					line-height: 0.4rem;
					font-size: 0.26rem;
					text-align: center;
					cursor: pointer;
					transition: background-color .3s;
					&:hover{
						background-color: #ff0000;
					}
				}
				>.item-btn[data-selected="true"]{
					background-color: #cc0000;
				}
			}
			>.items{
				position: relative;
				flex: 1;
				width: 0;
				display: flex;
				>.item{
					height: 100%;
					overflow: hidden;
				}
				>.item.files{
					width: 2.5rem;
					transition: width .3s;
				}
				>.item.code{
					display: flex;
					flex: 1;
					>.code,
					>.map{
						height: 100%;
						transition: width .3s;
					}
				}
			}
		}
	}
</style>