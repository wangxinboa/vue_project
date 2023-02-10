<template>
	<div class="scrollbar_contaoner-y"
		v-if='needAddScrollbar'
		ref='scrollbarContainer'
		>
		<div class="scrollbar"
			ref='scrollbar'
		></div>
	</div>
</template>

<script>
	import movement from './movement.js';
	import pc from './pc.js';
	import mobile from './mobile.js';

	// 抄作业 https://github.com/noeldelgado/gemini-scrollbar
	export default {
		data(){
			return {
				parentNode: null,
				scrollbarNode: null,
				scrollbarContainerNode: null,

				needAddScrollbar: true,

				rate: null,

				parentScrollHeight: null,
				parentClientHeight: null,
				parentScrollTopMax: null,

				scrollbarHeight: null,
				scrollbarMoveMax: null,

				// 用于拖动滚动条
				startScrollTop: null,
				startPageY: null,

				// 移动端拖拽滚动条
				startTouchPageY: null,
				startTouchScrollTop: null,

				scrollbarContainerAnimation: null,

				mouseWheels: [],

				isMobile: "ontouchend" in document ? true : false,
			}
		},
		methods: {
			...movement,
			// PC 端事件
			...pc,
			// 移动端
			...mobile
		},
		mounted(){
			this.parentNode = this.$el.parentNode;
			this.scrollbarNode = this.$refs.scrollbar;
			this.scrollbarContainerNode = this.$refs.scrollbarContainer;

			this.parentScrollHeight = this.parentNode.scrollHeight;
			this.parentClientHeight = this.parentNode.clientHeight;

			if( this.parentScrollHeight <= this.parentClientHeight){
				this.needAddScrollbar = false;
			}else{
				this.initScrollbar();
				if( this.isMobile ){
					this.mobileInit();
				}else{
					this.pcInit();
				}
			}
		},
		destroyed(){
			if( this.needAddScrollbar ){
				if( this.isMobile ){
					this.mobileDestroyed();
				}else{
					this.pcDestroyed();
				}
				this.scrollbarNode = null;
				this.scrollbarContainerNode = null;
				this.parentNode = null;
			}
		}
	}
</script>

<style lang="less">
	.scrollbar_contaoner-y{
		position: absolute;
		width: 6px;
		right: 2px;
		bottom: 2px;
		top: 2px;
		border-radius: 3px;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		>.scrollbar{
			position: absolute;
			top: 0;
			width: 100%;
			background-color: rgba(0,0,0,0.2);
			border-radius: 3px;
			//opacity: 0;
			transition: opacity .3s;
		}
	}
</style>