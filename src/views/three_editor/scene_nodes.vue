<template>
	<div class="scene_nodes">
		<div class="scene_nodes_header">
			<div class="scene_nodes_header_button">

				<div class="iconfont icon-refresh"
					v-on:mousedown="refreshScenes"></div>
				<div :class="[
					'iconfont',
					 threeEditorController.stopRender ? 'icon-play' : 'icon-pause'
					]"
					v-on:mousedown="setRender"></div>

			</div>
		</div>
		<div class="scene_nodes_content">
			<c-tree
				:data="threeEditorController.scenes"
				:selectedData="threeEditorController.selectedNodeShowDetails"
				:children="getNodeChildren"
				v-on:selectnode="handleSelectNodeShowDetails">

				<template v-slot:content="{index, node}">
					<div class="scene_node">
						{{index + '. ' + node.type + (node.name ? ': ' + node.name : '')}}
						<div class="scene_node_buttons"
							v-if="node.isObject3D"
							v-on:mousedown.stop>

							<!-- <div :class="[
								'iconfont',
								'icon-download'
							]"
							v-on:mousedown="handleDownLoadNodeJson(node)"></div> -->

							<div :class="[
								'iconfont',
								node.visible ? 'icon-invisible' : 'icon-visible',
							]"
							v-on:mousedown="handleVisibleNode(node)"></div>
						</div>
					</div>
				</template>
			</c-tree>
		</div>
	</div>
</template>

<script>
	import { downloadText } from '@utils/download.js';
	import downloadScene from './controller/download_scene.js';

	export default {
		inject: ['threeEditorController'],
		methods: {
			getNodeChildren( node ){

				if( node.material ){
					return node.children.concat(Array.isArray( node.material ) ? node.material : [ node.material ]);
				}else {
					return node.children;
				}
			},
			refreshScenes( node ){

				this.threeEditorController.refreshScenes();
			},
			setRender(){
				this.threeEditorController.stopRender = !this.threeEditorController.stopRender;
			},
			handleSelectNodeShowDetails( node, treeNode ){

				this.threeEditorController.selectedNodeShowDetails = node;
			},
			handleDownLoadNodeJson( node ){

				// downloadText( node.name ? `${node.name}.json` : `${node.type}.json`, JSON.stringify(node.toJSON()));

				downloadScene( node );
			},
			handleVisibleNode( node ){
				node.visible = !node.visible;
			}
		}
	}
</script>

<style lang="less">
	.scene_nodes{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.scene_nodes_header{
			padding: 0 0.08rem 0 0.08rem;
			width: 100%;
			height: 0.32rem;
			min-height: 0.32rem;
			background-color: #202020;
			>.scene_nodes_header_button{
				display: flex;
				align-items: center;
				height: 100%;
				>.iconfont{
					width: 0.26rem;
					height: 0.26rem;
					transition: background-color .3s;
					border-radius: 0.04rem;
					color: #ffffff;
					&:hover{
						background-color: #767676;
					}
				}
				>.iconfont:not(:last-child){
					margin-right: 0.04rem;
				}
			}
		}
		>.scene_nodes_content{
			width: 100%;
			height: 0;
			flex: 1;
			.scene_node{
				display: flex;
				height: 100%;
				white-space: nowrap;
				>.scene_node_buttons{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					width: 100%;
					height: 100%;

					>.iconfont{
						margin-left: 0.08rem;
						width: 0.18rem;
						height: 0.18rem;
						transition: background-color .3s;
						border-radius: 0.04rem;
						background-color: #444444;
						&:hover{
							background-color: #767676;
						}
					}
				}
			}
		}
	}
</style>