<template>
	<div class="component-file-node">
		<div class="node-content"
			:data-selected="analyseResult.selectedFile === fileNode"
			:data-hide="analyseResult.isOnlyShowAnalyseFile ? !(fileNode.hasAnalyse || fileNode.isAnalyse) : false" >
			<div 
				:class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown="handleExpand"> › </div>
			<div class="label"
				v-on:mousedown="selectNode(fileNode, $event)">{{fileNode.name}}</div>
			<div class="btns">
				<div class="btn">
					<div 
						:class="{
							'analyse iconfont': true,
							'icon-yulan': fileNode.isAnalyse,
							'icon-chakan': !fileNode.isAnalyse,
						}"
						:title="fileNode.isAnalyse ? '解析文件' : '添加为解析文件'"
						:data-selected="fileNode.isAnalyse"
						v-on:mousedown.stop="setAnalyseFile(fileNode, $event)"></div>
				</div>
			</div>
		</div>
		<div class="children"
			ref="children"
			v-if="! isLeaf ">
			<component-file-node 
				v-for="node in fileNode.files"
				:key="node.name"
				:analyseResult="analyseResult"
				:fileNode="node"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'component-file-node',
		props: {
			fileNode: {
				type: Object,
			},
			analyseResult: {
				type: Object,
			}
		},
		data(){
			return {
				isLeaf: !this.fileNode.files || this.fileNode.files.length === 0,
				isExpand: true,
			}
		},
		methods: {
			handleExpand(){
				if( this.isLeaf ){
					return;
				}
				this.isExpand = !this.isExpand;
				// console.log('this.$refs.children.style:', this.$refs.children.style);
				let height ;
				if( this.isExpand ){
					this.$refs.children.style.height = null;
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = 0;
					setTimeout(()=>{
						this.$refs.children.style.height = `${height}px`;
					}, 0);
					setTimeout(()=>{
						this.$refs.children.style.height = null;//	300 是 css transition 的数据
					}, 300);
				}else{
					height = this.$refs.children.clientHeight;
					this.$refs.children.style.height = `${height}px`;
					setTimeout(()=>{
						this.$refs.children.style.height = 0;
					}, 0);
				}
			},
			selectNode(node){
				// console.log('selectNode node:', node);
				if( node.folder ){
					console.log(node.folder);
					console.log("folderName:",node.folder.name);
				}
				if( !this.isLeaf ){
					this.handleExpand();
					return 
				}

				if( this.analyseResult.selectedFile === node ){
					this.analyseResult.selectedFileOrderPath = this.analyseResult.selectedFile = null;

				}else{
					this.analyseResult.selectedFile = node;
					this.analyseResult.selectedFileOrderPath = node.orderPath;
				}
			},
			setAnalyseFile(node){
				node.isAnalyse = !node.isAnalyse;

				if( this.isLeaf ){//	文件
					if( this.analyseResult.selectedFile ){
						this.analyseResult.selectedFile = node;
					}
				}else{// 文件夹
					// 向下检索
					let folders = [node];
					while( folders.length > 0 ){
						let folder = folders.pop();
						if( folder.hasAnalyse !== folder.isAnalyse ){
							folder.hasAnalyse = folder.isAnalyse;
						}
						folder.files.forEach((file)=>{
							if( file.isAnalyse !== folder.isAnalyse ){
								file.isAnalyse = folder.isAnalyse;
							}
							if( file.type === 'folder' ){
								folders.push(file);
							}
						});
					}
				}
				// 向上检索
				while(node.folder){
					let folder = node.folder;
					if( node.isAnalyse ){//	选择解析一个文件
						folder.hasAnalyse = true;

						let isAllAnalyse = true;
						for( let i = 0, len = folder.files.length; i < len; i++ ){
							if( !folder.files[i].isAnalyse ){
								isAllAnalyse = false;
								break;
							}
						}
						if( isAllAnalyse ){
							node.folder.isAnalyse = true;
						}

					}else{//	取消解析一个文件
						folder.isAnalyse = false;

						let isAllNotAnalyse = true;
						for( let i = 0, len = folder.files.length; i < len; i++ ){
							if( folder.files[i].isAnalyse || folder.files[i].hasAnalyse ){
								isAllNotAnalyse = false;
								break;
							}
						}
						if( isAllNotAnalyse ){
							folder.hasAnalyse = false;
						}
					}
					node = node.folder;
				}
			},
		},
		mounted(){
			// console.log('this.fileNode:', this.fileNode);
			// console.log('this.fileNode.files:', this.fileNode.files);
		}
	}
</script>

<style lang="less">
	.component-file-node{
		width: 100%;
		>.node-content{
			position: relative;
			display: flex;
			width: 100%;
			height: 0.24rem;
			line-height: 0.24rem;
			font-size: 0.14rem;
	    color: #ffffff;
	    background-color: #494949;
			transition: background-color .3s, height .3s;
	    cursor: pointer;
	    overflow: hidden;
	    >.expand{
	    	width: 0.3rem;
	    	min-width: 0.3rem;
	    	height: 100%;
		    text-align: center;
		    overflow: hidden;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
	    }
	    >.expand.expanded{
		    transform: rotate(90deg);
	    }
	    >.expand.leaf{
	    	width: 0.14rem;
	    	min-width: 0.14rem;
	    	opacity: 0;
	    	pointer-events: none;
	    }
	    >.label{
	    	flex: 1;
	    	height: 100%;
				white-space: nowrap;
	    }
	    >.btns{
	    	position: absolute;
	    	right: 0;
	    	top: 0;
	    	padding: 0 0.1rem;
	    	height: 0.24rem;
		    background-color: #494949;
		    opacity: 0;
	    	transition: opacity .3s ,background-color .3s;
	    	>.btn{
	    		height: 100%;
    			display: flex;
					align-items: center;

	    		>.iconfont{
	    			width: 0.2rem;
				    height: 0.2rem;
				    line-height: 0.2rem;
				    font-size: 0.12rem;
				    text-align: center;
				    cursor: pointer;
				    border-radius: 0.04rem;
				    color: #ffffff;
			    	transition: background-color  .3s;
						&:hover{
							background-color: #696969;
						}
	    		}

	    	}
	    }
	    &:hover{
	    	background-color: #333333;
		    >.btns{
		    	opacity: 1;
		    	background-color: #333333;
		    }
	    }

		}
		>.node-content[data-selected="true"]{
			background-color: #272727;
	    >.btns{
	    	background-color: #272727;
	    }
		}
		>.node-content[data-hide="true"]{

			height: 0;
		}
		>.children{
			margin: 0 0 0 0.16rem;
			overflow: hidden;
			transition: height .3s;
	    border-left: 0.01rem solid #666666;
		}
	}
</style>