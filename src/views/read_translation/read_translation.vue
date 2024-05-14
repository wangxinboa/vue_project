<template>
	<div id="readTranslation">
		<v-read_web class="read_web_left"/>
		<v-read_web/>
	</div>
</template>


<script>
	import readWeb from './read_web.vue';

	export default {
		components: {
			'v-read_web': readWeb
		},
		data(){
			return {
				readLeftUrl: '',
				readRightUrl: '',
			}
		},
		methods: {
			setReadLeftWeb(){
				const value = this.$refs.readLeftInput.value;
				this.readLeftUrl = value;
			},
			setReadRightWeb(){
				const value = this.$refs.readRightInput.value;
				this.readRightUrl = value;
			},
		}
	}
</script>

<style lang="less">
	#readTranslation{
		display: flex;
		width: 100%;
		height: 100%;
		>.read_web{
			display: flex;
			flex-direction: column;
			width: 50%;
			height: 100%;
			>.web_url{
				display: flex;
				padding: 0.1rem 0.1rem 0.1rem 0.1rem;
				width: 100%;
				height: 0.5rem;
				background-color: #3c3c3c;
				>.url_input{
					flex: 1;
					width: 0;
					height: 100%;
					padding: 0 0.06rem;
					background-color: #282828;
					color: #c7c7c7;
					border-radius: 0.1rem;
				}
				>.url_input_operations{
					display: flex;
					align-items: center;
					padding: 0 0.1rem;
					height: 100%;
					>.iconfont{
						width: 0.26rem;
						height: 0.26rem;
						border-radius: 0.04rem;
						transition: background-color .3s;
						&:hover{
							background-color: #6b6b6b;
						}
					}
				}
			}
			>.web_page{
				flex: 1;
				width: 100%;
				height: 0;
				>.web_page_iframe{
					width: 100%;
					height: 100%;
				}
			}
		}
		>.read_web.read_web_left{
			border-right: 0.01rem solid #2e2e2e;
		}
	}
</style>