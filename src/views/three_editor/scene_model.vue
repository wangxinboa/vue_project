<template>
	<div class="scene_model">
		<canvas class="scene_canvas" ref="canvas"
			v-on:dragstart.stop.prevent
			v-on:dragover.stop.prevent
			v-on:drop.stop.prevent="dropFile"></canvas>
	</div>
</template>

<script>

	export default {
		inject: ['threeEditorController'],

		methods: {
			initScene(){

				this.threeEditorController.initCanvas( {
					canvas: this.$refs.canvas,
					antialias: true
				} );
			},
			resizeCanvas(){

				const parentNode = this.$refs.canvas.parentNode;

				console.log('this.$refs.canvas:', this.$refs.canvas);
				console.log('parentNode:', parentNode);

				this.$refs.canvas.width = parentNode.clientWidth;
				this.$refs.canvas.height = parentNode.clientHeight;
			},
			dropFile(e){

				this.threeEditorController.loadGLTFFile( e.dataTransfer.files[0] )
			}
		},

		mounted(){
			console.log('mounted');

			this.resizeCanvas();
			this.initScene();
			window.addEventListener('resize', this.resizeCanvas);
		},
		beforeDestory(){
			console.log('beforeDestory');

			window.removeEventListener('resize', this.resizeCanvas);
		}
	}
</script>

<style lang="less">
	.scene_model{
		width: 100%;
		height: 0;
		flex: 1;

		>.scene_canvas{
			width: 100%;
			height: 100%;
		}
	}
</style>