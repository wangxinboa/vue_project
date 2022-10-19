<template>
	<div :class="[
			'side-panel',
			direction
		]"
		:style="sideStyle"
		ref='panel'>
		<div class="side-panel-body"
			:style="bodyStyle">

		</div>
		<div class="side-panel-bar"
			:style="barStyle"
			v-on:mousedown="barDown"
			v-on:mouseup="barClick">
		</div>
	</div>
</template>

<script>
	// 父元素布局为 display
	export default {
		data(){
			let
				sideStyle = {},
				bodyStyle = {},
				barStyle = {}

			sideStyle.minWidth =  this.barRange + 'px';
			bodyStyle.width = this.panelRange + 'px'
			barStyle.width =  this.barRange + 'px';

			return {
				sideStyle,
				bodyStyle,
				barStyle,

				hasBarDown: false,
				hasBarMove: false,

				startPosition: null,
				startRange: this.panelRange,
				newRange: null,
				visible: true
			}
		},
		props: {
			direction: {
				type: String,
				default(){
					return 'left';
				}
			},
			panelRange: {
				type: Number,
				default(){
					return 260;
				}
			},
			barRange: {
				type: Number,
				default(){
					return 6;
				}
			}
		},
		methods: {
			barDown(e){
				this.hasBarDown = true;
				this.hasBarMove = false;

				this.startPosition = e.screenX;
				// console.log('this.startPosition:', this.startPosition);
			},
			barMove(e){
				// console.log('barMove')
				if( this.hasBarDown ){
					this.hasBarMove = true;
					this.newRange = this.startRange + e.screenX - this.startPosition;

					this.bodyStyle.width = this.newRange + 'px';
				}
			},
			barUp(e){
				// console.log('barUp')
				if( this.hasBarDown ){
					if( this.hasBarMove ){
						this.startRange = this.newRange;
					}
					this.hasBarDown = false;
					this.startPosition = null;
					this.newRange = null;
				}
			},
			barClick(e){
				// console.log('barClick')
				if( !this.hasBarMove ){
					this.visible = !this.visible;
					// if( this.visible ){
					// 	this.bodyStyle.width = this.startRange + 'px';
					// 	this.bodyStyle.transition = '.3s width ease-in-out'
					// }else{
					// 	this.bodyStyle.width = 0;
					// 	this.bodyStyle.transition = '.3s width ease-in-out'
					// }
					// setTimeout(()=>{
					// 	this.bodyStyle.transition = null;
					// }, 300);
				}
			},
		},
		mounted(){
			document.addEventListener('mousemove', this.barMove);
			document.addEventListener('mouseup', this.barUp);
		},
		destroyed(){
			document.removeEventListener('mousemove', this.barMove);
			document.removeEventListener('mouseup', this.barUp);
		}
	}
</script>

<style lang="less">
	.side-panel{
		position: relative;

		background-color: #ffffff;
		opacity: 0.6;

		>.side-panel-bar{
			position: absolute;
			user-select: none;
			background-color: #dfdfdf;
		}
		>.side-panel-body{
			height: 100%;
		}
	}
	.side-panel.left,
	.side-panel.right{
		height: 100%;
		>.side-panel-bar{
			height: 100%;
			cursor: ew-resize;
		}
	}
	.side-panel.left{
		>.side-panel-bar{
			top: 0;
			right: 0;
		}
	}
	.side-panel.right{
		>.side-panel-bar{
			top: 0;
			left: 0;
		}
	}
</style>