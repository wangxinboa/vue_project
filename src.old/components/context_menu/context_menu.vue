<template>
	<div class="component-menu"
		tabindex="0"
		v-on:mousedown.stop
		>
		<div
			class='item'
			v-for='item in menu'
			v-on:mousedown.stop='itemDwom(item.event)'>
				{{item.name}}
			</div>
	</div>
</template>

<script>
	import simpleAnimation from '../../utils/timer/animation/simple_animation.js';

	export default {
		data(){
			return {
				parentNode: null,
				event: null,

				width: 0,
				height: 0,

				visible: false,
				isAnimation: false,
				blurStillShow: false,
			}
		},
		props: {
			menu: {
				type: Array,
				default(){
					return [];
				}
			}
		},
		methods: {
			parentNodeDown(e){
				// console.log('containerDown:', e);
				e.stopPropagation();
				if( e.button === 2 ){
					if( this.visible ){
						this.blurStillShow = true;
					}
					this.setPosition(e);
					this.setVisible(true);
				}
			},
			itemDwom(callback){
				if( !this.isAnimation ){
					callback( this.event );
					this.setVisible(false);
				}
			},
			initRect(){
				this.$el.style.display = null;

				this.width = this.$el.clientWidth;
				this.height = this.$el.clientHeight;

				this.$el.style.display = 'none';
			},
			setPosition(event){
				if( event ){
					this.event = event;
					let 
							x = event.pageX,
							y = event.pageY,

							width = this.width,
							height = this.height,

						screenWidth = window.innerWidth,
						screenHeight = window.innerHeight

					if( x + width + 1 > screenWidth ){
						x -= width;
					}
					if( y + height + 1 > screenHeight ){
						 y -= height;
					}

					this.$el.style.left = x + 'px';
					this.$el.style.top = y + 'px';
				}else{
					throw new Error('MouseEvent 为空, 无法设置菜单位置');
				}
			},
			setVisible(visible){
				if( this.visible === visible ){
					return ;
				}
				this.visible = visible;
				if( visible ){

					simpleAnimation({
						duration: 300,
						onStart: ()=>{
							this.$el.style.display = null;
							this.isAnimation = true;
						},
						onUpdate: (percentage)=>{
							this.$el.style.opacity = percentage;
						},
						onComplete: (percentage)=>{
							this.$el.style.opacity = null;
							this.isAnimation = false;
							this.$el.focus();
						}
					});
				}else{
					simpleAnimation({
						duration: 300,
						onStart: ()=>{
							this.$el.style.display = null;
							this.isAnimation = true;
						},
						onUpdate: (percentage)=>{
							this.$el.style.opacity = 1 - percentage;
						},
						onComplete: (percentage)=>{
							this.$el.style.opacity = null;

							this.$el.style.display = 'none';

							this.$el.style.left = null;
							this.$el.style.top = null;
							this.isAnimation = false;
						}
					});
				}
			},
			onblur(e){
				// console.log('失去焦点');
				if( this.blurStillShow ){
					this.$el.focus();
					this.blurStillShow = false;
				}else{
					this.setVisible(false);
				}
			}
		},
		mounted(){
			this.initRect();

			this.parentNode = this.$el.parentNode;

			this.parentNode.addEventListener('mousedown', this.parentNodeDown);
			this.parentNode.oncontextmenu = function (event) {
        event.preventDefault();
      };
      this.$el.onblur = this.onblur;
			document.body.appendChild(this.$el);
		},
		destroyed(){
			this.parentNode.removeEventListener('mousedown', this.parentNodeDown);
			this.parentNode = null;
			this.parentNode.oncontextmenu = null;
      this.$el.onblur = null;
			document.body.removeChild(this.$el);
		}

	}
</script>

<style lang="less">
	.component-context-menu{
		padding: 4px;
		position: absolute;
		user-select: none;
		white-space: nowrap;
		border: 1px solid #afafaf;
		border-radius: 4px;
		background-color: #ffffff;
		transition: 0.3s left ease-in-out, 0.3s top ease-in-out ;
		outline: none;
		>.item{
			padding: 2px 8px;
			border-radius: 2px;
			font-size: 12px;
			cursor: pointer;
			transition: 0.3s background-color ease-in-out;
			&:hover{
				background-color: #1e78d2;;
			}
		}
	}
</style>