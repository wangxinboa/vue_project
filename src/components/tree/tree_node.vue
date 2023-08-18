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
				v-on:mousedown="selectNode(nodeData)">{{ getLabel(nodeData) }}</div>
		</div>
		<div class="node-children"
			v-if="childrenShow && !isLeaf"
			ref="children">
			<c-tree-node
				v-for="(child, index) in children"
				:key="index"
				:nodeData="child"
				:defaultExpand="defaultExpand"
				/>
		</div>
		
	</div>
</template>

<script>
	import { showChildren, hideChildren } from './utils.js';

	export default {
		name: 'c-tree-node',
		inject: ['getChildren', 'getLabel', 'getParentMsg', 'selectNode'],
		props: {
			nodeData: {
				type: [Object, Array, String, Number, Boolean],
			},
			defaultExpand: {
				type: Boolean,
			},
		},
		watch: {
			nodeData(oldVal, newVal){
				this.children = this.getChildren(this.nodeData, this.keyName)
				this.isLeaf = this.getIsLeaf(this.children)
			}
		},
		data(){
			let children = this.getChildren(this.nodeData, this.keyName);
			return {
				children,
				isLeaf: this.getIsLeaf(children),
				isExpand: this.defaultExpand,
				childrenShow: this.defaultExpand,
			}
		},
		methods: {
			getIsLeaf(children){
				return Array.isArray(children) ? children.length === 0 : 
									((typeof children) === 'object' && children !== null) ? Object.keys(children) === 0 : true
			},
			handleExpand(){
				if( this.isExpand ){
					hideChildren.apply(this);
				}else{
					showChildren.apply(this);
				}
			},
		}


	}
</script>