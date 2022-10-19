<template>
	<div class="tex_to_image">
		<div class="tex">
			<div class="title">数学公式-Tex</div>
			<textarea class="tex_text_area"
				ref="textarea"
				v-on:input="texChange"></textarea>
		</div>
		<div class="image_container">
			<div class="title">数学公式-图片</div>
			<div class="image">
				<img :src="mathjaxBase64">
			</div>
		</div>
		<div class="base64_container">
			<div class="title">数学公式-图片-base64</div>
			<textarea class="base64" ref="base64" readonly></textarea>
		</div>
	</div>
</template>

<script>
	import { getBase64 } from './tex_to_image.js';
	export default {
		data(){
			return {
				mathjaxBase64: null
			}
		},
		mounted(){
			this.$refs.textarea.value = 'O(\\left \\vert E \\right \\vert \\log \\left \\vert V \\right \\vert)';
			// this.mathjaxBase64 = this.$refs.base64.value = getBase64(this.$refs.textarea.value);
			this.texChange();
		},
		methods: {
			texChange(){
				this.mathjaxBase64 = this.$refs.base64.value = getBase64(this.$refs.textarea.value);

			}
		}
	}
</script>

<style lang="less">
	.tex_to_image{
		padding: 0 10%;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		>div{
			width: 5rem;
			max-width: 100%;
			>.title{
				padding: 0.1rem 0;
				font-size: 0.2rem;
				width: 100%;
			}
		}
		>.tex{
			padding: 0.16rem 0 0 0;
			>.tex_text_area{
				padding: 0.1rem;
				width: 100%;
				height: 1.68rem;
				resize: none;
				border-width: 0.02rem;
				border-style: dashed;
				border-color: #434343;
				border-radius: 0.04rem;
			}
		}
		>.mml{
			//width: 100%;
			height: 0.4rem;
			min-height: 0.4rem;
		}
		>.image_container{
			padding: 0.1rem 0;
			>.image{
				padding: 0.1rem;
				width: 100%;
				overflow: auto;
				>img{
					display: block;
				}
			}
		}
		>.base64_container{
			display: flex;
			flex-direction: column;
			flex: 1;
			padding: 0 0 0.1rem 0;
			min-height: 3rem;
			overflow: auto;
			font-size: 0.14rem;
			word-break: break-all;
			>.base64{
				flex: 1;
				width: 100%;
				resize: none;
			}
		}
	}
</style>