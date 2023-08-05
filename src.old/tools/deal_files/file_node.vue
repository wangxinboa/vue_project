<template>
	<div class="component-file-node">
		<div class="node-content">
			<div 
				:class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown="handleExpand"> › </div>
			<div class="label">{{fileNode.name}}</div>
			<div class="btns">
				<div class="btn">
					<div title="导出js文件" class="iconfont icon-output"
						v-if="fileNode.files"
						v-on:mousedown.stop="exportJSFiles(fileNode)"></div>
				</div>
			</div>
		</div>
		<div class="children"
			ref="children"
			v-if="! isLeaf ">
			<component-file-node 
				v-for="node in fileNode.files"
				:key="node.name"
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
			exportJSFiles(node){
				console.log('node:', node);
				if( node.files ){
					let code = '',
							exportFiles = [];

					function recursive(file, path = '.'){
						if( file.file ){
							code += `import czm_${file.name} from '${path}.js';\n`;
							exportFiles.push(`czm_${file.name}`)
						}else if( file.files ){
							file.files.forEach((item)=>{
								recursive(item, `${path}/${item.name}` );
							});
						}
					}

					recursive(node);

					code += `\nexport default {\n\t${exportFiles.join(',\n\t')}\n}`

					let a = document.createElement('a');					// 创建a标签
	        let e = document.createEvent('MouseEvents');	// 创建鼠标事件对象
	        e.initEvent('click', false, false);						// 初始化事件对象
					// 字符内容转变成blob地址
					let blob = new Blob([code]);
					a.href = URL.createObjectURL(blob);
	        a.download = 'CzmBuiltins.js';								// 设置下载文件名
				  a.dispatchEvent(e);
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
			height: 0.3rem;
			line-height: 0.3rem;
			font-size: 0.14rem;
	    color: #000000;
	    background-color: #ffffff;
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
	    	height: 0.3rem;
		    background-color: #ffffff;
		    opacity: 0;
	    	transition: opacity .3s, background-color .3s;
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
				    color: #000000;
			    	transition: background-color  .3s;
						&:hover{
							background-color: #cacaca;
						}
	    		}

	    	}
	    }
	    &:hover{
	    	background-color: #eeeeee;
		    >.btns{
		    	opacity: 1;
		    	background-color: #eeeeee;
		    }
	    }

		}
		>.children{
			margin: 0 0 0 0.16rem;
			overflow: hidden;
			transition: height .3s;
	    border-left: 0.01rem solid #666666;
		}
	}
</style>