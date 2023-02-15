<template>
	<div :class="[
			'side-panel',
			direction
		]"
		:style="sideStyle"
		ref='panel'>
		<!-- <side_transition> -->
			<div class="side-panel-body"
				:style="bodyStyle"
				v-if='visible'>

			</div>
		<!-- </side_transition> -->
		<div class="side-panel-bar"
			:style="barStyle"
			v-on:mousedown="barDown"
			v-on:click="barClick">
		</div>
	</div>
</template>

<script>
	// 父元素布局为 display
	export default {
		components: {
			'side_transition': transition 
		},
		data(){
			// console.log('data')
			let
				sideStyle = {},
				bodyStyle = {},
				barStyle = {}
			if( this.direction === 'left' || this.direction === 'right' ){
				sideStyle.minWidth =  this.minBar + 'px';
				bodyStyle.width = this.range + 'px'
				barStyle.width =  this.minBar + 'px';
			}else if( this.direction === 'top' || this.direction === 'bottom' ){
				sideStyle.minHeight =  this.minBar + 'px';
				bodyStyle.height = this.range + 'px'
				barStyle.height =  this.minBar + 'px';
			}

			return {
				sideStyle,
				bodyStyle,
				barStyle,
				isBarDown: false,
				isBarMove: false,
				startPosition: null,
				startRange: this.range,
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
			range: {
				type: Number,
				default(){
					return 260;
				}
			},
			minParentRange: {
				type: Number,
				default(){
					return 660;
				}
			},
			minBar: {
				type: Number,
				default(){
					return 6;
				}
			}
		},
		methods: {
			barDown(e){
				this.isBarDown = true;
				this.isBarMove = false;

				if( this.direction === 'left' || this.direction === 'right' ){
					this.startPosition = e.screenX;
				}else if( this.direction === 'top' || this.direction === 'bottom' ){
					this.startPosition = e.screenY;
				}
			},
			barMove(e){
				if( this.isBarDown ){
					this.isBarMove = true;
					// if( this.direction === 'left' ){
						this.newRange = this.startRange + e.screenX - this.startPosition;
						this.newRange = this.newRange < this.minBar ? this.minBar : this.newRange;
						this.bodyStyle.width = this.newRange + 'px';
					}else if( this.direction === 'right' ){
						this.newRange = this.startRange + this.startPosition  - e.screenX;
						this.newRange = this.newRange < this.minBar ? this.minBar : this.newRange;
						this.bodyStyle.width = this.newRange + 'px';
					}else if( this.direction === 'top' ){
						this.newRange = this.startRange + e.screenY - this.startPosition;
						this.newRange = this.newRange < this.minBar ? this.minBar : this.newRange;
						this.bodyStyle.height = this.newRange + 'px';
					}else if( this.direction === 'bottom' ){
						this.newRange = this.startRange + this.startPosition - e.screenY;
						this.newRange = this.newRange < this.minBar ? this.minBar : this.newRange;
						this.bodyStyle.height = this.newRange + 'px';
					}

				}
			},
			barUp(e){
				if( this.isBarDown ){
					this.startRange = this.newRange;
					this.isBarDown = false;
					this.startPosition = null;
				}
			},
			getPostion(e){
				if( this.direction === 'left' || this.direction === 'right' ){
					return e.screenX;
				}else if( this.direction === 'top' || this.direction === 'bottom' ){
					return e.screenY;
				}
			},
			barClick(e){
				if( !this.isBarDown && !this.isBarMove ){
					console.log(this.visible)
					this.visible = !this.visible;
				}
			},
			resize(){
				// console.log('resize');
				// console.log('this.sideStyle:', this.sideStyle);
				// console.log('this.innerWidth:', this.sideStyle);

				// if( this.direction === 'left' || this.direction === 'right' ){

				// }else if( this.direction === 'right' ){

				// }
				// if(window.innerWidth < this.maxWindow){
				// 	this.sideStyle.position = 'absolute';
				// }else{
				// 	this.sideStyle.position = 'resize';
				// }
			}
		},
		mounted(){
			document.addEventListener('mousemove', this.barMove);
			document.addEventListener('mouseup', this.barUp);
			// window.addEventListener('resize', this.resize);
		},
		destroyed(){
			document.removeEventListener('mousemove', this.barMove);
			document.removeEventListener('mouseup', this.barUp);
			// window.removeEventListener('resize', this.resize);
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
			width: 100%;
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
	.side-panel.top,
	.side-panel.bottom{
		width: 100%;
		>.side-panel-bar{
			width: 100%;
	    cursor: ns-resize;
		}
	}
	.side-panel.top{
		>.side-panel-bar{
			left: 0;
			bottom: 0;
		}
	}
	.side-panel.bottom{
		>.side-panel-bar{
			left: 0;
			top: 0;
		}
	}
</style>