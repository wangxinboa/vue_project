<template>
	<v-page
		icon="tupian"
		title="图片转换 base64">
		<div id="imageToBase64">
			<div class="operation">
				<div class="button prevent_text_overflow import">
					导入图片
					<input class="hidden_input_button" type="file" name="file"
						v-on:change="readImageFile">
				</div>
				<div class="button prevent_text_overflow copy"
					v-on:mousedown="copyBase64">复制 base64</div>
			</div>
			
			<div class="image"
				v-on:dragstart.prevent
				v-on:dragover.prevent
				v-on:drop.prevent='dropImageFile'>
				<img :src="base64" v-if="base64">
			</div>

			<div class="base64_container">
				<textarea class="base64" ref="base64" readonly></textarea>
			</div>
		</div>
	</v-page>
</template>


<script>
	export default {
		data(){
			return {
				base64: ''
			}
		},
		methods: {
			dropImageFile(e){
				let
					files = e.dataTransfer.files,
					file = files[0],
					reader = new FileReader();

				reader.onload = ()=>{
					this.base64 = this.$refs.base64.value = reader.result;
				};
				reader.readAsDataURL(file);
			},
			readImageFile(e){
				let
					files = e.target.files,
					file = files[0],
					reader = new FileReader();

				reader.onload = ()=>{
					this.base64 = this.$refs.base64.value = reader.result;
				};
				reader.readAsDataURL(file);
			},
			copyBase64(){
		    this.$refs.base64.select();		// 选择对象
		    document.execCommand("Copy");	// 执行浏览器复制命令
			}
		},
	}
</script>


<style lang="less">
	#imageToBase64{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		>.operation{
			display: flex;
			flex-direction: row;
			padding: 0.2rem;
			>.button{
				padding: 0.1rem 0.18rem;
				margin-right: 0.1rem;
			  border-radius: 0.04rem;
		    border-width: 0.01rem;
        border-style: solid;
		    border-color: #DCDFE6;
				font-size: 0.14rem;

				cursor: pointer;
				transition: background-color .3s, border-color .3s,  box-shadow .3s;
			}
			>.button:hover{
				border-color: rgba(0, 0, 0, 0.15);
				box-shadow: rgba(0, 0, 0, 0.1) 0 0.04rem 0.12rem;

			}
			>.button:active{
			  background-color: #F0F0F1;
			  border-color: rgba(0, 0, 0, 0.15);
			  box-shadow: rgba(0, 0, 0, 0.06) 0 0.02rem 0.04rem;
			}
			>.import{
				position: relative;
				overflow: hidden;

			}
		}
		>.image{
			margin-left: 0.2rem;
			margin-right: 0.2rem;
			padding: 0.06rem;
			display: flex;
			justify-content: center;
			width: 5rem;
			max-width: calc(100% - 0.4rem);
			height: 2rem;
			min-height: 2rem;
			border-width: 0.02rem;
			border-style: dashed;
			border-color: #434343;
			border-radius: 0.04rem;
			overflow: hidden;
			>img{
		    max-width: 100%;
		    max-height: 100%;
				object-fit: contain;
			}
		}
		>.base64_container{
			margin-left: 0.2rem;
			margin-right: 0.2rem;
			padding: 0.2rem 0;
			flex: 1;
			width: 5rem;
			min-height: 1rem;
			max-width: calc(100% - 0.4rem);
			overflow: auto;
			font-size: 0.14rem;
			word-break: break-all;
			>.base64{
				width: 100%;
				height: 100%;
				resize: none;
			}
		}
	}
</style>