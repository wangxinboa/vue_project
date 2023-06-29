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
			<div class="label">{{ getLabel(nodeData, parentMsg) }}</div>
		</div>
		<div class="node-children">
			
			<c-tree-node
				v-if="!isLeaf"
				v-for="(child, keyName) in children"
				:key="keyName"
				:nodeData="child"
				:parentMsg="getParentMsg(nodeData, child, keyName)"
				/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'c-tree-node',
		props: {
			nodeData: {
				type: [Object, Array, String, Number, Boolean],
			},
			parentMsg: {
				type: null,
			}
		},
		inject: ['getChildren', 'getLabel', 'getParentMsg'],
		watch: {
			nodeData(oldVal, newVal){
				this.children = this.getChildren(this.nodeData, this.parentMsg)
				this.isLeaf = this.getIsLeaf(this.children)
			}
		},
		data(){
			let children = this.getChildren(this.nodeData, this.parentMsg);
			return {
				children,
				isLeaf: this.getIsLeaf(children),
				isExpand: true,
			}
		},
		methods: {
			getIsLeaf(children){
				return Array.isArray(children) ? children.length === 0 : 
									((typeof children) === 'object' && children !== null) ? Object.keys(children) === 0 : true
			},
			handleExpand(){

			}
		},
		mounted(){
			// console.log('nodeData:', this.nodeData);
			// console.log('children:', this.children);
			// console.log('isLeaf:', this.isLeaf);
			// console.log('initIsLeaf:', this.initIsLeaf());
			// console.log(Object.keys(this.children) === 0);
		}
	}
</script>

<style lang="less">
	.component-tree-node{
		width: 100%;
		>.node-content{
			position: relative;
			display: flex;
			width: 100%;
			line-height: 0.22rem;
			font-size: 0.14rem;
	    color: #ffffff;
			transition: background-color .3s, height .3s;
	    cursor: pointer;
	    overflow: hidden;
			border-bottom: 0.04rem solid rgba(0,0,0,0);
			border-top: 0.04rem solid rgba(0,0,0,0);
	    >.expand{
	    	width: 0.22rem;
	    	height: 0.22rem;
		    text-align: center;
		    overflow: hidden;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out, width .3s;
	    }
	    >.expand.expanded{
		    transform: rotate(90deg);
	    }
	    >.expand.leaf{
	    	opacity: 0;
	    	pointer-events: none;
	    }
	    >.label{
	    	flex: 1;
	    	width: 0;
				word-break: break-word;
				>.span{
					width: fit-content;
					line-height: 0.22rem;
					transition: background-color .3s;
				}
				>.span.move_in{
					display: block;
					background-color: #9b9b9b;
				}
	    }
		}
		>.node-children{
			margin: 0 0 0 0.16rem;
			overflow: hidden;
			transition: height .3s;
	    border-left: 0.01rem solid #666666;
		}
	}
</style>