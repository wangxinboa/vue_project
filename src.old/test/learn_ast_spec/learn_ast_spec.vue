<template>
	<div id="learnAstSpec">
		<div class="action_bar">
			
		</div>

		<div class="ast_learn_node_list_container">
			<div class="list_header">
				<div class="btn"
					title="展示更新过的节点" 
					v-on:mousedown="exportAstLG">新</div>
				<div class="btn"
					title="展示全部节点" 
					v-on:mousedown="showAllAstLN">全</div>
				<div class="btn"
					title="导出 json 文件" 
					v-on:mousedown="exportAstLG">出</div>
				<!-- <div class="btn icon-btn icon-add"
					v-on:mousedown="startAddAstLN"></div> -->
			</div>

			<div class="ast_learn_node_list">
				<v-astLN
					v-for="astLN in showAstLNodes"
					:key="astLN.type"
					:astLNode="astLN"
					v-on:selectcacheast="selectCacheAst"
					/>
			</div>

		</div>

		<div class="ast_message_container">
			<v-astMsg
				:astNodes="selectedAstNodes"
				:codeStr="selectedCodeStr"/>
		</div>

		<!-- <c-drawer
			:visible="isAddAstLN"
			:size="'10rem'"
			:title="'添加新节点'"
			v-on:close="endAddAstLN"
			>
			<v-addAstLN
				v-on:change="addAstLN"/>
		</c-drawer> -->
	</div>
</template>

<script>
	import VAstLN from './learn_ast_message/ast_learn_node';
	import VAstMsg from './ast_message/ast_message';
	// import VAddAstLN from './add_new/add_new_ast_learn_node';


	import AstLG from './ast_learn_graph/ast_learn_graph.js';

	import astLGJSON from './ast_learn_graph/ast_learn_graph.json';

	// console.log('generate:', generate);

	export default {
		components: {
			"v-astLN": VAstLN,
			// "v-addAstLN": VAddAstLN,
			"v-astMsg": VAstMsg,
		},
		data(){
			return {
				astLG: new AstLG(),

				isAddAstLN: false,

				showAstLNodes: [],

				selectedAstNodes: [],
				selectedCodeStr: '',
			}
		},
		provide(){
			return {
				astLG: this.astLG,
			}
		},
		methods: {
			showAllAstLN(){
				this.showAstLNodes = this.astLG.nodes;
			},
			exportAstLG(){
				// console.log('this.astLG:', this.astLG);
				// console.log(JSON.stringify(this.astLG, null, 4));
			},

			addAstLN(codeStr){
				this.astLG.startComplete(codeStr);
			},

			selectCacheAst(cacheMsg){
				this.selectedAstNodes = [cacheMsg.astNode];
				this.selectedCodeStr = this.astLG.cacheCode[cacheMsg.cacheCodeIndex];
				// console.log('this.selectedCodeStr:', this.selectedCodeStr);
			}
		},
		mounted(){
			// window.astLG = this.astLG;

			// this.astLG.parse(astLGJSON);

// 			this.astLG.startComplete(`// B3DM File Format
// // https://github.com/CesiumGS/3d-tiles/blob/master/specification/TileFormats/Batched3DModel/README.md

// import { FeatureTable, BatchTable } from '../utilities/FeatureTable.js';
// import { LoaderBase } from './LoaderBase.js';
// import { readMagicBytes } from '../utilities/readMagicBytes.js';

// export class B3DMLoaderBase extends LoaderBase {

// 	parse( buffer ) {

// 		// TODO: this should be able to take a uint8array with an offset and length
// 		const dataView = new DataView( buffer );

// 		// 28-byte header

// 		// 4 bytes
// 		const magic = readMagicBytes( dataView );

// 		console.assert( magic === 'b3dm' );

// 		// 4 bytes
// 		const version = dataView.getUint32( 4, true );

// 		console.assert( version === 1 );

// 		// 4 bytes
// 		const byteLength = dataView.getUint32( 8, true );

// 		console.assert( byteLength === buffer.byteLength );

// 		// 4 bytes
// 		const featureTableJSONByteLength = dataView.getUint32( 12, true );

// 		// 4 bytes
// 		const featureTableBinaryByteLength = dataView.getUint32( 16, true );

// 		// 4 bytes
// 		const batchTableJSONByteLength = dataView.getUint32( 20, true );

// 		// 4 bytes
// 		const batchTableBinaryByteLength = dataView.getUint32( 24, true );

// 		// Feature Table
// 		const featureTableStart = 28;
// 		const featureTableBuffer = buffer.slice(
// 			featureTableStart,
// 			featureTableStart + featureTableJSONByteLength + featureTableBinaryByteLength,
// 		);
// 		const featureTable = new FeatureTable(
// 			featureTableBuffer,
// 			0,
// 			featureTableJSONByteLength,
// 			featureTableBinaryByteLength,
// 		);

// 		// Batch Table
// 		const batchTableStart = featureTableStart + featureTableJSONByteLength + featureTableBinaryByteLength;
// 		const batchTableBuffer = buffer.slice(
// 			batchTableStart,
// 			batchTableStart + batchTableJSONByteLength + batchTableBinaryByteLength,
// 		);
// 		const batchTable = new BatchTable(
// 			batchTableBuffer,
// 			featureTable.getData( 'BATCH_LENGTH' ),
// 			0,
// 			batchTableJSONByteLength,
// 			batchTableBinaryByteLength,
// 		);

// 		const glbStart = batchTableStart + batchTableJSONByteLength + batchTableBinaryByteLength;
// 		const glbBytes = new Uint8Array( buffer, glbStart, byteLength - glbStart );

// 		return {
// 			version,
// 			featureTable,
// 			batchTable,
// 			glbBytes,
// 		};

// 	}

// }`);

		}
	}
</script>

<style lang="less">
	#learnAstSpec{
		display: flex;
		width: 100%;
		height: 100%;
		>.action_bar{

		}

		>.ast_learn_node_list_container{
	    display: flex;
	    flex-direction: column;
	    padding: 0 0.06rem 0 0.06rem;
			width: 3.5rem;
			height: 100%;
			border-right: 0.01rem solid #5b5b5b;
			background-color: #262626;
			>.list_header{
				display: flex;
				justify-content: flex-end;
				padding: 0.06rem 0;
				width: 100%;
				height: 0.32rem;
				color: #ffffff;
				font-size: 0.14rem;
				>.btn{
					margin: 0 0 0 0.04rem;
					padding: 0.02rem;
					width: 0.2rem;
					height: 0.2rem;
					line-height: 0.16rem;
					text-align: center;
					border-radius: 0.04rem;
					font-size: 0.12rem;
					transition: background-color .3s, color .3s;
					cursor: pointer;
				}
				>.btn:hover{
					background-color: #6d6d6d;
				}
				>.btn:active{
					background-color: #434343;
				}
			}

			>.ast_learn_node_list{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 0;
				flex: 1;
				overflow: auto;
				>.ast_learn_node{
					margin: 0 0 0.06rem;
					width: 100%;
					background-color: #434343;
			    border-radius: 0.02rem;
					>.node_header{
						position: relative;
						display: flex;
						padding: 0 0.04rem;
						width: 100%;
						color: #ffffff;
						font-size: 0.14rem;
						line-height: 0.2rem;
						background-color: #6d6d6d;
				    >.text{
				    	padding: 0 0.04rem;
					    border-radius: 0.02rem;
					    transition: color .3s;
					    cursor: pointer;
				    }
						>.node_header_btns{
					    position: absolute;
							top: 0;
							right: 0;
							display: flex;
							justify-content: flex-end;
							padding: 0 0.02rem;
							height: 100%;
							>.node_header_btn{
								margin: 0.02rem 0 0 0.02rem;
								width: 0.16rem;
								height: 0.16rem;
								line-height: 0.16rem;
								text-align: center;
								border-radius: 0.04rem;
								transition: background-color 0.3s, color 0.3s;
								cursor: pointer;
							}
							>.node_header_btn:hover{
								background-color: #434343;
							}
							>.node_header_btn:active{
								background-color: #242424;
							}
						}
					}
					>.cache_code{
						display: flex;
						flex-wrap: wrap;
						padding: 0 0.04rem 0;
						font-size: 0.14rem;
						line-height: 0.2rem;
						>.cache_code_tab{
					    position: relative;
					    margin: 0.04rem 0.04rem 0 0;
					    padding: 0 0.06rem;
					    color: #afafaf;
					    border: 0.01rem solid #000000;
					    border-radius: 0.02rem;
					    cursor: pointer;
						}
					}

					>.ast_learn_node_key_msg{
						display: flex;
						flex-direction: column;
						padding: 0 0.04rem 0;
						width: 100%;
						font-size: 0.14rem;
						line-height: 0.2rem;
						>.msg_header{
							position: relative;
							display: flex;
							width: 100%;
							>.title{
								display: flex;
								padding: 0 0.04rem 0 0;
								color: #00ffdd;
								>.key{

								}
								>.is_array{
									padding: 0 0.04rem;

								}
								>.value_type{
									padding: 0 0.04rem;
								}
								>.data_type{
									cursor: pointer;
									transition: color .3s;
								}
								>.data_type:hover{
									color: #000000;
								}
							}
							>.btns{
								position: absolute;
							}
						}
						>.intro{
							padding: 0.04rem 0;
							display: flex;
							width: 100%;
							color: #ffffff;
						}
						>.values{
					    display: flex;
					    flex-wrap: wrap;
					    >.tag{
						    position: relative;
						    margin: 0 0.04rem 0.04rem 0;
						    padding: 0 0.06rem;
						    color: #0088ff;
						    border: 0.01rem solid #000000;
						    border-radius: 0.02rem;
				        word-break: break-all;
				        cursor: pointer;
						    >.is_new{
						    	position: absolute;
						    	right: 0.01rem;
						    	top: 0.01rem;
						    	width: 0.04rem;
						    	height: 0.04rem;
						    	border-radius: 50%;
						    	background-color: #ff0000;
						    }
					    }
						}
					}
					>.ast_learn_node_key_msg:not(:last-child){
				    border-bottom: 0.01rem solid #6b6b6b;
					}
				}
			}
		}

		>.ast_message_container{
			width: 0;
			flex: 1;
			height: 100%;
			background-color: #262626;
			>.ast_message{
				display: flex;
				width: 100%;
				height: 100%;
				>.code_ast{
					display: flex;
					flex-direction: column;
					width: 3rem;
					//flex: 1;
					height: 100%;
					>.code_ast_header{
						display: flex;
						justify-content: flex-end;
						padding: 0.06rem;
						width: 100%;
						height: 0.32rem;
						color: #ffffff;
						font-size: 0.14rem;
						>.btn{
							margin: 0 0 0 0.04rem;
							padding: 0.02rem;
							border-radius: 0.04rem;
							transition: background-color .3s, color .3s;
						}
						>.btn:hover{
							background-color: #6d6d6d;
						}
						>.btn:active{
							background-color: #434343;
						}
					}
					>.code_ast_content{
						width: 100%;
						height: 0;
						flex: 1;
						background-color: #191919;
				    overflow: auto;
					}
				}
				>.code_editor_container{
					width: 0;
					flex: 1;
					height: 100%;
				}
			}
		}
	}
</style>