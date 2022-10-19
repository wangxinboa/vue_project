<template>
	<div class="paper_view-pdf">
		<iframe class="iframe" ref="iframe" />
	</div>
</template>

<script>
	export default {
		props: {
			paper: {
				type: String,
				default: ''
			}
		},
		watch: {
			paper(newVal, oldVal){
				let path;
				if( process.env.NODE_ENV === 'development' ){
					path = "/papers"
				}else{
					path = "/vue_project/dist/papers"
				}

				if( newVal ){
					this.$refs.iframe.contentWindow.location.replace(`${path}/${newVal}/${newVal}.pdf#view=FitH,top`);
				}else{
					this.$refs.iframe.removeAttribute('src');
				}
			}
		}
	}
</script>
<style lang="less">
	.paper_view-pdf{
		width: 100%;
		height: 100%;
		>.iframe{
			width: 100%;
			height: 100%;
		}
	}
</style>