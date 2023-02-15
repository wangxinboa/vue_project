<template>
	<div class="tree_container">
		<tree
		id='example'
		:data='data'
		:selectNode='selectNode'
		:drag='true'/>
	</div>
</template>

<script>
	import tree from './tree.vue'

	export default {
		components: {
			tree,
		},
		data(){
			return {
				data: null
			}
		},
		methods: {
			selectNode(node){
				console.log('node:', node);
			},
			lazyLoad(node){
				console.log('node:', node);
				// return [{
				// 	name: "节点测试"
				// }, {
				// 	name: "节点测试"
				// }]
			}
		},
		created(){
			let data = [
					{ name: "节点1", children: [
						{ name: "节点1-1" },
						{ name: "节点1-2" },
					]  },
					{ name: "节点2", children: [
						{ name: "节点2-1" },
						{
							name: "节点2-2",
							children: [
								{ name: "节点2-2-1" },
								{ name: "节点2-2-2" },
							]
						},
						{ name: "节点2-3" },
					] },
					{ name: "节点3" }
				]

			let 
					node = data[0],
					stack = [];

			data.forEach((node)=>{
				node.parent = { children: data }
				stack.push(node)
			})
			while(node = stack.pop()){
				let children = node.children
				if( children ){
					children.forEach((subNode)=>{
						subNode.parent = node;
						stack.push(subNode);
					});
				}
			}
			this.data = window.data = data;
		}
	}
</script>

<style lang="less">
	.tree_container{
		padding: 10px;
    width: 200px;
    height: 100%;
    border-right: 1px solid #434343;
		background-color: #ededed;
	}
</style>
