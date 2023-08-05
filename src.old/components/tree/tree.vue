<template>
	<div class="component-tree">
		<my-tree
			v-for='(child, index) in data'
			:key='child.name'
			:id='id'
			:content='content'
			:children='children'
			:indent='indent'
			:startExpand='startExpand'
			:dealNode='dealNode'
			:data='child'
			:lazyLoad='lazyLoad'
			:selectNode='selectNode'
			:memoryExpandState='memoryExpandState'></my-tree>
	</div>
</template>

<!-- 暂时不打算在 vue 的基础上实现拖拽 -->
<script>
	import treeNode from './tree_node.vue';
	import createTree from './tree.js';


	export default {
		components: {
			'my-tree': treeNode,
		},
		props: {
			// 参数配置
			id: String,
			dealNode: {
				type: [Object, Function],
				default: null
			},
			content: {
				type: [String, Function],
				default: 'name'
			},
			children: {
				type: [String, Function],
				default: 'children'
			},
			indent: {
				type: Number,
				default: 8
			},
			startExpand: {
				type: Boolean,
				default: false
			},
			memoryExpandState: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			accordion: {
				type: Boolean,
				default: false
			},
			lazyLoad: {
				type: [Object, Function],
				default: null
			},
			selectNode: {
				type: Function,
				default: ()=>{
				},
			}
		},
		methods: {

		},
		created(){
			createTree(this.id)
				.setAccordion(this.accordion)
		},
		// beforeDestroy(){
		// 	console.log('Destroy')
		// }
	}
</script>

<style lang="less">
	.tree{

	}
</style>
