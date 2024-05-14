<template>
	<div class="mesh_details">

		<v-geometry_details :geometry="mesh.geometry" />
	</div>
</template>

<script>
	import GeometryDetailds from './geometry_details.vue';

	export default {
		inject: ['threeEditorController'],

		components: {
			'v-geometry_details': GeometryDetailds,
		},
		props: {
			mesh: {
				type: Object,
				default: null,
			}
		},

	}
</script>

<style lang="less">
	.mesh_details{
		width: 100%;
	}
</style>