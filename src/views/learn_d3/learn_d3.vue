<template>
	<div id="learnD3" ref="container">
	</div>
</template>

<script>
	import tree from './examples/tree.js';

	import data from './examples/assets/flare.json';

	import initDrag from './init_svg/drag.js';

	import { select } from './d3_package/d3-selection/index.js';

	export default {
		methods: {
			resize(){
				let
					container = this.$refs.container,
					svg = container.childNodes[0];

				svg.setAttribute('width', container.clientWidth);
				svg.setAttribute('height', container.clientHeight);
			},
		},
		mounted(){
			// svg 自适应满屏
			window.addEventListener('resize', this.resize);
			// 初始化拖拽
			let svg = initDrag.init(this.$refs.container);
			// 	初始化树
			tree(svg, data);
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