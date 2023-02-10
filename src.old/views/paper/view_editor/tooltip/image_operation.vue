<template>
	<div class="tooltip-operation image_operation"
		:data-show="tooltipMessage.imageOperationShow"
		v-on:mousedown="cancelOperation">
		<div class="operatoin" v-on:mousedown.stop>
			<div class="image_preview"
				v-on:dragstart.prevent
				v-on:dragover.prevent
				v-on:drop.prevent='dropImageFile'>
				<img id="showImage" :src="tooltipMessage.imageBase64" v-if="tooltipMessage.imageBase64"/>
				<div class="title" v-else>拖拽预览</div>
			</div>
			<div class="image_title">
				<input ref="imageTitle"
					type="text"
					placeholder="图片标题"
					v-model="tooltipMessage.imageTitle"/>
			</div>
			<div class="buttons">
				<div class="button">
					<input type="file" v-on:change="readImageFile">
					导入
				</div>
				<div class="button"
					v-on:mousedown="clearOperation">清空</div>
				<div class="button"
					v-on:mousedown="confirmOperation">确定</div>
				<div class="button"
					v-on:mousedown="cancelOperation">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		// data(){
		// 	return {
		// 		showStyleMessage: false
		// 	}
		// },
		props: {
			tooltipMessage: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			dropImageFile(e){
				let
					files = e.dataTransfer.files,
					file = files[0],
					reader = new FileReader();

				reader.onload = ()=>{
					this.tooltipMessage.imageBase64 = reader.result;
				};
				reader.readAsDataURL(file);
			},
			readImageFile(e){
				let
					files = e.target.files,
					file = files[0],
					reader = new FileReader();

				reader.onload = ()=>{
					this.tooltipMessage.imageBase64 = reader.result;
				};
				reader.readAsDataURL(file);
			},
			clearOperation(e){
				this.tooltipMessage.imageBase64 = null;
				this.tooltipMessage.imageTitle = null;
				this.tooltipMessage.imageStyle = null;
				this.tooltipMessage.imgStyle = null;
			},
			confirmOperation(){
				// console.log('tooltipMessage:', this.tooltipMessage);

				let { editor, imageBase64, imageTitle, imgStyle } = this.tooltipMessage,
						range = editor.lastRange,
						nowblock = editor.nodeApi.getBlock(range.endContainer),
						imageBlock = editor.objToDom({
							type: "image",
							isBlock: true,
							title: imageTitle,
							src: imageBase64,
							imageStyle: {
	                "text-align": "center"
	            },
	            imgStyle
						});

				editor.nodeApi.insertAfter(imageBlock, nowblock);
				this.cancelOperation();
			},
			cancelOperation(){
				this.tooltipMessage.imageOperationShow = false;
			},
		}
	}
</script>

<style lang="less">
	.tooltip-operation.image_operation{
		display: flex;
		justify-content: center;
		align-items: center;
		>.operatoin{
			display: flex;
			flex-direction: column;
			width: 70%;
			max-width: 100%;
			min-width: 3.5rem;
			height: 70%;
			max-height: 100%;
			min-height: 2.5rem;
			border-radius: 0.1rem;
			background-color: #ffffff;
			>.image_preview{
				flex: 1;
		    display: flex;
		    justify-content: center;
		    align-items: center;
				padding: 0.2rem 0 0.1rem;
				width: 100%;
				height: 0;
				>img{
					object-fit: contain;
			    max-height: 100%;
			    max-width: 100%;
				}
				>.title{
			    font-size: 0.5rem;
			    letter-spacing: 0.1rem;
			    color: #adadad;
				}
			}
			>.image_title{
				padding: 0.1rem 0.2rem;
				width: 100%;
				border-top: 0.02rem solid #000000;
				border-bottom: 0.02rem solid #000000;
				>input{
					width: 100%;
					font-size: 0.2rem;
				}
			}
			>.buttons{
				padding: 0.1rem 0;
				width: 100%;
				height: 0.6rem;
				display: flex;
				justify-content: center;
				>.button{
					position: relative;
					padding: 0 0.1rem;
					height: 100%;
					text-align: center;
					line-height: 0.4rem;
					font-size: 0.18rem;
			    border-radius: 0.04rem;
					cursor: pointer;
					transition: background-color .3s;
					&:hover{
						background-color: #d4d4d4;
					}
					>input{
						position: absolute;
						top: 0;
						left: 0;
						font-size: 0;
						opacity: 0;
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>