<template>
	<div id="mathtexToImage">
		<v-header
			class="header"
			icon="fsux_tubiao_gongshi_jisuan"
			title="数学公式 mathjax" />
		<div class="container">
			<textarea class="tex_text_area"
				ref="textarea"
				v-on:input="texChange"></textarea>

			<div class="image">
				<img :src="mathjaxBase64">
			</div>

			<textarea class="base64" ref="base64" readonly></textarea>
		</div>
	</div>
</template>
	
<script>
	import { getBase64 } from './mathtex_to_image.js';

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
	#mathtexToImage{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.container{
			display: flex;
			flex-direction: column;
			padding: 0.2rem;
			width: 5rem;
			max-width: 100%;
			height: 0;
			flex: 1;

			>.tex_text_area{
				padding: 0.1rem;
				width: 100%;
				height: 1.68rem;
				min-height: 1.68rem;
				resize: none;
				border-width: 0.02rem;
				border-style: dashed;
				border-color: #434343;
				border-radius: 0.04rem;
			}

			>.image{
				padding: 0.2rem 0.1rem;
				width: 100%;
				min-height: 0.6rem;
				overflow: auto;
				>img{
					display: block;
				}
			}

			>.base64{
				flex: 1;
				width: 100%;
				min-height: 1rem;
				resize: none;
			}
		}
	}
</style>