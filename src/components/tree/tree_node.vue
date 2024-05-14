<template>
	<div class="component-tree-node">
		<div class="tree-node-content"
			:data-selected="nodeData.selected">
			<div
				:class="{
					expand: true,
					leaf: isLeaf,
					expanded: isExpand && !isLeaf,
				}"
				v-on:mousedown="handleExpand"> › </div>
			<div class="node-message"
				v-on:mousedown="handleSelectNode">
				<slot name="content" v-bind:index="index" v-bind:node="nodeData.data">
					自定义组件内容
				</slot>
			</div>
		</div>
		<div class="tree-node-children"
			v-if="isExpand && !isLeaf"
			ref="children">
			<c-tree-node
				v-for="(child, index) in nodeData.children"
				:key="index"
				:index="index"
				:nodeData="child"
				:defaultExpand="defaultExpand"
			>

				<template v-slot:content="{node, index}">
					<slot name="content" v-bind:index="index" v-bind:node="node"></slot>
				</template>
			</c-tree-node>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'c-tree-node',
		inject: ['selectNode', 'defaultExpand'],
		props: {
			index: {
				type: Number,
			},
			nodeData: {
				type: Object,
			}
		},
		data(){

			return {
				isLeaf: this.nodeData.children.length === 0,
				isExpand: this.defaultExpand,
			}
		},
		methods: {
			handleExpand(){

				this.isExpand = !this.isExpand;
			},
			handleSelectNode(){

				this.selectNode( this.nodeData );
			}
		}
	}
</script>
