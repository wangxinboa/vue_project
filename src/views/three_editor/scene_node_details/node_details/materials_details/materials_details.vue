<template>
	<div class="materials_detials" >
		<v-shader_material_details v-if="material.isShaderMaterial" :material="material"/>
	</div>
</template>

<script>
	import ShaderMaterialDetails from './shader_material_details.vue';
	import MeshStandardMaterialDetails from './mesh_standard_material_details.vue';


	export default {
		components: {
			'v-shader_material_details': ShaderMaterialDetails,
			'v-mesh_standard_material_details': MeshStandardMaterialDetails,
		},
		props: {
			material: {
				type: Object,
				default: null
			}
		},
	}
</script>

<style lang="less">
	.materials_detials{

	}
</style>