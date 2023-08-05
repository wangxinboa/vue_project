<template>
	<div class="tooltip">
		<div class="button" :data-not-allow="rangeNotInEditor">
			<div class="title iconfont icon-json"
				title="导出json"
				v-on:mousedown="exportJson"></div>
		</div>
		<div class="divider"></div>
		<div class="button header_paragraph_type"
				:data-not-allow="headerParagraphType === null">
			<div class="title">
				<div class="now_type_name">{{headerParagraphType}}</div>
				<div class="iconfont icon-caozuozhankai"></div>
				<div class="all_types_container">
					<div class="all_types">
						<div class="type_name"
							v-on:mouseup="setHeaderParagraph('paragraph')">
							正文
						</div>
						<div class="type_name"
							v-on:mouseup="setHeaderParagraph('h1')">
							<h1>标题1</h1>
						</div>
						<div class="type_name"
							v-on:mouseup="setHeaderParagraph('h2')">
							<h2>标题2</h2>
						</div>
						<div class="type_name"
							v-on:mouseup="setHeaderParagraph('h3')">
							<h3>标题3</h3>
						</div>
						<div class="type_name"
							v-on:mouseup="setHeaderParagraph('h4')">
							<h4>标题4</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="button" :data-not-allow="rangeNotInEditor">
			<div class="title iconfont icon-fsux_tubiao_gongshi_jisuan"
				title="添加数学公式" 
				v-on:mousedown="addMathjax"></div>
		</div>
		<v-mathjaxOperation :tooltipMessage="tooltipMessage"/>
		<div class="button list" :data-not-allow="rangeNotInEditor">
			<div class="title iconfont icon-liebiaomoshi"
				title="添加列表">
				<div class="all_types_container">
					<div class="all_types">
						<div class="type_name"
							v-on:mouseup="listOperation('disorderly')">
							无序列表
						</div>
						<div class="type_name"
							v-on:mouseup="listOperation('english')">
							小写英语
						</div>
						<div class="type_name"
							v-on:mouseup="listOperation('English')">
							大写英语
						</div>
						<div class="type_name"
							v-on:mouseup="listOperation('number')">
							数字序列
						</div>
						<div class="type_name"
							v-on:mouseup="listOperation('custom')">
							自定义
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="button" :data-not-allow="rangeNotInEditor">
			<div class="title iconfont icon-tupian"
				title="添加图片"
				v-on:mousedown="addImage"></div>
		</div>
		<v-imageOperation :tooltipMessage="tooltipMessage"/>
		<div class="button" :data-not-allow="rangeNotInEditor">
			<div class="title iconfont icon-yuandaimaxiayoudaima"
				title="添加代码"></div>
		</div>
	</div>
</template>

<script>
	import setHeaderParagraph from './header_and_paragraph.js';
	import listOperation from './list_operation.js';
	import debounce from '../../../../utils/timer/debounce.js';

	import imageOperation from './image_operation.vue';
	import mathjaxOperation from './mathjax_operation.vue';

	export default {
		components: {
			'v-imageOperation': imageOperation,
			'v-mathjaxOperation': mathjaxOperation,
		},
		data(){
			return {
				headerParagraphType: null,
				rangeNotInEditor: true,

				tooltipMessage: {
					editor: null,
					anotherEditor: null,

					imageOperationShow: false,
					imageBase64: null,
					imageTitle: null,
					imageStyle: null,
					imgStyle: null,

					mathjaxOperationShow: false,
					mathjaxTexs: [''],
					mathjaxStyle: null,
				}
			}
		},
		props: {
			editor: {
				type: Object,
				default: null
			},
			anotherEditor: {
				type: Object,
				default: null
			},
			allEditors: {
				type: Array,
				default: null
			}
		},
		watch: {
			editor(newVal){
				this.tooltipMessage.editor = newVal;
			},
			anotherEditor(newVal){
				this.tooltipMessage.anotherEditor = newVal;
			},
			allEditors(newVal){
				// console.log('newVal:', newVal);
				newVal.forEach((editor)=>{
					// console.log('editor:', editor.editorDom);
					editor.editorDom.addEventListener('mousedown', this.mousedown);
				});
			}
		},
		methods: {
			exportJson(){
				if( this.editor ){
					this.editor.exportObjJsonFormatting('json.json');
				}
			},
			setHeaderParagraph: setHeaderParagraph,
			listOperation: listOperation,
			addMathjax(){
				this.tooltipMessage.mathjaxOperationShow = true;
			},
			addImage(){
				this.tooltipMessage.imageOperationShow = true;
			},
			selectionchangeDebounce: debounce(function(){
				if( !this.editor.editable ){
					return;
				}
				let { nodeApi, rangeApi } = this.editor,
						range = rangeApi.getRange();
				console.log('range:', range);
				if( range ){
					let { startContainer, endContainer } = range;
					if( this.editor.editorDom.contains(startContainer) && this.editor.editorDom.contains(endContainer) ){
						this.rangeNotInEditor = false;
						this.editor.recordRange(range);

						let startBlock = nodeApi.getBlock(startContainer),
								endBlock = nodeApi.getBlock(endContainer);
						if( startBlock === endBlock ){
							if( startBlock.className === "paragraph" ){
								this.headerParagraphType = "正文"
							}else if( startBlock.className === "header" ){
								switch( startBlock.nodeName ){
									case "H1":
										this.headerParagraphType = "标题1";
										break;
									case "H2":
										this.headerParagraphType = "标题2";
										break;
									case "H3":
										this.headerParagraphType = "标题3";
										break;
									case "H4":
										this.headerParagraphType = "标题4";
										break;
									default:
										this.headerParagraphType = null;
										break;
								}
							}else{
								this.headerParagraphType = null;
							}
							// this.setBlockLogo(startBlock);
						}
						return;
					}else{
						this.rangeNotInEditor = true;
					}
				}
				this.headerParagraphType = null;
			}, 100),
			mousedown(e){
				if( !this.editor || !this.editor.editable ){
					return;
				}
				let element = e.target,
						editorDom = this.editor.editorDom;
				// console.log('element:', element);
				if( editorDom !== element && editorDom.contains(element) ){
					let
						block = this.editor.nodeApi.getBlock(element);
					// console.log('block:', block);
					if( element.className === 'mathjax' ){
						console.log("复制 mathjax");
						let mathjaxTexs = this.tooltipMessage.mathjaxTexs,
								obj;
						while( mathjaxTexs.length > 0 ){
							mathjaxTexs.splice( 0, 1);
						}

						if( element.style.length > 0 ){
							obj = this.editor.domToObj(element);
							mathjaxTexs.push(obj.data);
							this.tooltipMessage.mathjaxStyle = obj.style;
						}else{
							while(element.previousSibling
									&& element.previousSibling.className === 'mathjax'
									&& element.style.length === 0){
								element = element.previousSibling
							}
							do{
								obj = this.editor.domToObj(element);
								mathjaxTexs.push(obj.data);
								element = element.nextSibling;
							}while(element && element.className === 'mathjax' && element.style.length === 0);
							this.tooltipMessage.mathjaxStyle = null;
						}
					}else if( block.className === 'image' ){
						console.log("复制 image");
						// console.log("obj:", obj);
						let obj = this.editor.domToObj(block);
						this.tooltipMessage.imageBase64 = obj.src;
						this.tooltipMessage.imageTitle = obj.title;
						this.tooltipMessage.imageStyle = obj.imageStyle;
						this.tooltipMessage.imgStyle = obj.imgStyle;
					}
				}
			}
		},
		mounted(){
			document.addEventListener('selectionchange', this.selectionchangeDebounce);
		},
    destroyed(){
			document.removeEventListener('selectionchange', this.selectionchangeDebounce);
			this.allEditors.forEach((editor)=>{
				editor.editorDom.removeEventListener('mousedown', this.mousedown);
			});
    }
	}
</script>

<style lang="less">
	.tooltip{
		display: flex;
		justify-content: center;
		width: 100%;
    border-left: 0.02rem solid #000000;
    border-bottom: 0.02rem solid #000000;
    >.divider{
    	width: 0.02rem;
	    margin: 0.06rem;
	    background-color: #d7d7d7;
	    border-radius: 0.01rem;
	    z-index: 2;
    }
		>.button{
			position: relative;
			padding: 0.06rem;
			min-width: 0.4rem;
			height: 100%;
			z-index: 2;
			>.title{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				border-radius: 0.04rem;
				transition: background-color .3s, color .3s;
				>.all_types_container{
					position: absolute;
					padding-top: 0.36rem;
					pointer-events: none;
					>.all_types{
				    height: 0;
				    background-color: #ffffff;
						box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
				    border-radius: 0.04rem;
				    overflow: hidden;
				    transition: height .3s, padding-top .3s, padding-bottom .3s;
						>.type_name{
					    padding: 0.08rem 0.2rem;
					    font-size: 0.16rem;
							cursor: pointer;
							transition: background-color .3s;
							&:hover{
								background-color: #cecece;
							}
						}
					}
				}

				&:hover{
					background-color: #d4d4d4;
				}
			}
			>.iconfont{
				font-size: 0.2rem;
			}
		}
		>.button[data-not-allow="true"]{
			cursor: not-allowed;
			>.title{
				color: #959595;
				pointer-events: none;
			}
		}
		>.header_paragraph_type{
			z-index: 1;
			>.title{
				>.now_type_name{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 0.44rem;
					height: 100%;
					font-size: 0.14rem;
				}
				>.iconfont{
					padding-bottom: 0.04rem;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
				>.all_types_container{
					top: 0;
					left: -0.2rem;
					>.all_types{
				    width: 2rem;
					}
				}
				&:hover{
					>.all_types_container{
						pointer-events: initial;
						>.all_types{
					    padding-top: 0.1rem;
					    padding-bottom: 0.1rem;
							height: 2.5rem;
						}
					}
				}
			}
		}
		>.list{
			z-index: 1;
			>.title{
				>.all_types_container{
					top: 0;
					left: -0.4rem;
					>.all_types{
				    width: 1.2rem;
						>.type_name{
					    height: 0.4rem;
					    line-height: 0.24rem;
							text-align: center;
						}
					}
				}
				&:hover{
					>.all_types_container{
						pointer-events: initial;
						>.all_types{
					    padding-top: 0.1rem;
					    padding-bottom: 0.1rem;
							height: 2.2rem;
						}
					}
				}
			}
		}

		>.tooltip-operation{
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(73, 73, 73, 0.86);
			z-index: 3;
			pointer-events: none;
			opacity: 0;
			transition: opacity .3s;
		}
		>.tooltip-operation[data-show="true"]{
			pointer-events: initial;
			opacity: 1;
		}

	}
</style>