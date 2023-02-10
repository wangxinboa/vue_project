<template>
	<div class="components-scrollbar_browser"
		ref="container">
		<div class="view"
			ref="view">
			<slot></slot>
		</div>
		<div class="scrollbar_container x"
			v-if="needInitX && x">
			<div class="bar scrollbar_x"></div>
		</div>
		<div class="scrollbar_container y"
			v-if="needInitY && y">
			<div class="bar scrollbar_y"></div>
		</div>
	</div>
</template>

<script>
	import Scrollbar from './scrollbar.js'

	export default {
		props: {
			x: {
				type: Boolean,
				default: false,
			},
			y: {
				type: Boolean,
				default: true,
			},
			reset: {
				type: Function,
				default(){
					return ()=>{}
				}
			}
		},
		data(){
			return {
				scrollbar: null,
				needInitX: false,
				needInitY: false,
			}
		},
		methods: {
			setView(){
				let {
						container, view
					} = this.$refs,
					containerRect = view.getBoundingClientRect();

				view.style['overflow-x'] = 'scroll';
				this.needInitX = container.clientWidth - view.clientWidth !== 0;
				if( this.needInitX ){
					view.style.height = ( 2 * containerRect.height - view.clientHeight + 1 ) + 'px';
				}

				view.style['overflow-y'] = 'scroll';
				this.needInitY = container.clientHeight - view.clientHeight !== 0;
				if( this.needInitY ){
					view.style.width = ( 2 * containerRect.width - view.clientWidth + 1 ) + 'px';
				}
			}
		},
		mounted(){
			this.setView();
		}
	}
</script>

<style lang="less">
	.components-scrollbar_browser{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		>.scrollbar_container{
			position: absolute;
			border-radius: 3px;
			cursor: pointer;
			user-select: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			>.bar{
				border-radius: 3px;
				cursor: pointer;
			}
		}
		>.scrollbar_x{
			bottom: 0;
			left: 0;
			width: 100%;
			height: 6px;
			>.scrollbar_x{
				height: 100%;
			}
		}
		>.scrollbar_y{
			top: 0;
			right: 0;
			width: 6px;
			height: 100%;
			>.scrollbar_y{
				width: 100%;
			}
		}
		>.view{
			width: 100%;
			height: 100%;
			overflow-x: hidden;
			overflow-y: hidden;
		}
}
</style>