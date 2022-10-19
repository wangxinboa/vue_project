<template>
	<div class="image_to_base64">
		<div class="operation">
			<div class="button import">
				导入
				<input type="file" name=""
					v-on:change="readImageFile">
			</div>
			<div class="button copy"
				v-on:mousedown="copyBase64">复制</div>
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
		mounted(){

		}
	}
</script>

<style lang="less">
	.image_to_base64{
		padding: 0 10%;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		>div{
			width: 5rem;
			max-width: 100%;
		}
		>.operation{
			display: flex;
			flex-direction: row;
			>.button{
				padding: 0.1rem;
				margin-right: 0.1rem;
				font-size: 0.18rem;
				cursor: pointer;
				letter-spacing: 0.04rem;
			}
			>.import{
				position: relative;
				overflow: hidden;
				>input{
					font-size: 0;
					outline: 0;
					padding: 0;
					border: 0;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					position: absolute;
					cursor: pointer;
				}
			}
		}
		>.image{
			padding: 0.06rem;
			display: flex;
			justify-content: center;
			height: 2rem;
			border-width: 0.02rem;
			border-style: dashed;
			border-color: #434343;
			border-radius: 0.04rem;
			>img{
				object-fit: contain;
			}
		}
		>.base64_container{
			padding: 0.1rem 0;
			flex: 1;
			width: 5rem;
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