<template>
	<div class="component-tree-node">
		<div class="node-content">
			<div
				:class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown="handleExpand"> › </div>
			<div class="label"
				v-on:mousedown="selectNode(nodeData)">{{ getLabel(nodeData, keyName) }}</div>
		</div>
		
	</div>
</template>

<script>
	
	export default {

	}
</script>