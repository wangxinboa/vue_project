<template>
	<div class="read_web">
		<div class="web_url">
			<c-text_input class="url_input" ref="urlInput"
			v-on:confirm="setWebUrl"/>
			<div class="url_input_operations">
				<div class="iconfont icon-refresh"
					title="刷新页面"
					v-on:mousedown="setWebUrl"></div>
			</div>
		</div>
		<div class="web_page">
			<iframe class="web_page_iframe"
				ref="webPageFrame"
				v-on:load="handleWebPageIframeLoad"></iframe>
		</div>
	</div>

</template>

<script>
	export default {
		data(){
			return {
				webUrl: "",
				reFreshWebUrl: "",
			}
		},
		methods: {
			setWebUrl(){

				const value = this.$refs.urlInput.$el.value;

				if( this.webUrl === value ){

					return ;
				} else if( this.webUrl !== ""){

					this.webUrl = "";
					this.reFreshWebUrl = value;
				} else{

					this.webUrl = value;
					this.$refs.webPageFrame.src = this.webUrl;
				}
			},
			handleWebPageIframeLoad(){

				const newUrl = this.$refs.webPageFrame.contentWindow.location.href;

				if( this.reFreshWebUrl ){

					this.webUrl = this.reFreshWebUrl;
					this.reFreshWebUrl = "";
					this.$refs.webPageFrame.src = this.webUrl;
				}
			}
		}
	}
</script>