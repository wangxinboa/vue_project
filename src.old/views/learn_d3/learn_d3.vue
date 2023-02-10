<template>
	<div id="learnD3"
      v-on:mousewheel.prevent>
		<svg ref="svg"></svg>
	</div>
</template>

<script>
	import examples from './examples/examples.js';

	import initDrag from './init_svg/drag.js';

	export default {
		methods: {
			resize(){
				let
					svg = this.$refs.svg,
					container = svg.parentNode;

				svg.setAttribute('width', container.clientWidth);
				svg.setAttribute('height', container.clientHeight);
			},
		},
		mounted(){
			// console.log('修改');
			// svg 自适应满屏
			window.addEventListener('resize', this.resize);
			this.resize();
			// 初始化拖拽
			initDrag.init(this.$refs.svg);

			let { type } = this.$route.query;

			if( !type || !examples[type] ){
				type = 'tree';
			}

			// 	初始化树
			examples[type](this.$refs.svg);
		},
		beforeDestroy(){
			window.removeEventListener('resize', this.resize);
		}
	}
</script>

<style lang="less">
	#learnD3{
		width: 100%;
		height: 100%;
		overflow: hidden;
		>svg{
			width: 100%;
			height: 100%;
			font-size: 0.1rem;
		}
	}
</style>