<template>
	<div class="analysis_code">
		
	</div>
</template>


<script>
	import AnalysisCodeController from './analysis_code_controller.js';


	export default {
		provide(){
			return {
				controller: new AnalysisCodeController(),
			}
		},
	}
</script>