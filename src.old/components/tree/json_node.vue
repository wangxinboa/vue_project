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
		<div class="node-children"
			v-if="childrenShow && !isLeaf"
			ref="children">
			<c-json-node
				v-for="(child, keyName) in children"
				v-if="!excludeKeys.includes(keyName)"
				:key="keyName"
				:keyName="keyName"
				:nodeData="child"
				:defaultExpand="defaultExpand"
				:excludeKeys="excludeKeys"
				/>
		</div>
	</div>
</template>

<script>
	import { showChildren, hideChildren } from './utils.js';

	export default {
		name: 'c-json-node',
		props: {
			nodeData: {
				type: [Object, Array, String, Number, Boolean],
			},
			keyName: {
				type: [String, Number],
			},
			defaultExpand: {
				type: Boolean,
			},
			excludeKeys: {
				type: Array,
			}
		},
		inject: ['getChildren', 'getLabel', 'getParentMsg', 'selectNode'],
		watch: {
			nodeData(newVal, oldVal){
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
		},
		mounted(){

		}
	}
</script>
