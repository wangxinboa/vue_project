<template>
	<div id="codeDocument-mapView"
		ref="mapView">
		
	</div>
</template>

<script>
	export default {
		props: {
			analyseResult: {
				type: Object
			},
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	#codeDocument-mapView{
		width: 100%;
		height: 100%;
		background-color: #232323;
	}
</style>