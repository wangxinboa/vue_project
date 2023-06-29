<template>
	<div class="ast_learn_node_list">
		<div class="header">
			<div class="icon-btn-s bc iconfont icon-add"
				v-on:mousedown="startAddAstLN"></div>
			<div class="icon-btn-s bc iconfont icon-fanhui"
				v-if="astLearnNode !== null"
				v-on:mousedown="operationBack"></div>
		</div>
		<div class="body">
			<div class="ast_learn_node"
				v-for="astLN in astLNList"
				:key="astLN.type">
				<div class="prevent_text_overflow padding header">
					<span class="text"
						v-on:mousedown="selectAstLN(astLN)">{{astLN.type}}</span>
					<div class="btns">
						<div class="icon-btn-s fc iconfont icon-shuoming"></div>
					</div>
				</div>
				<div class="padding entry column property"
					v-for="property in astLN.properties">

					<div class="prevent_text_overflow property header">
						<div class="title">{{property.key}}:</div>
						<div class="tab" v-for="(prim, index) in property.primitive">
						 	{{prim}}
						</div>
					</div>

					<div class="property body">

						<div class="tab"
							v-for="(astLN, index) in property.astLearnNodes">
						 	<span class="text"
						 		v-on:mousedown="selectAstLN(astLN)">{{astLN.type}}</span>
						 	<span class="partition" v-if="index < property.astLearnNodes.length - 1">|</span>
						</div>

						 <div class="array pre" v-if="property.astLNArray.length > 0">{{'Array<'}}</div>
						<div class="tab"
							v-for="(astLN, index) in property.astLNArray">
						 	<span class="text"
						 		v-on:mousedown="selectAstLN(astLN)">{{astLN.type}}</span>
						 	<span class="partition" v-if="index < property.astLNArray.length - 1">|</span>
						</div>
						 <div class="array suf" v-if="property.astLNArray.length > 0">{{'>'}}</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['astLearnGraph', 'astLearnNode'],
		data(){
			return {
				events: {
					selectnode: 'selectnode',
					startaddnode: 'startaddnode',
				},
				astLNList: this.astLearnGraph.nodes,
			}
		},
		watch: {
			astLearnNode(newVal, oldVal){
				this.setList();
			}
		},
		methods: {
			setList(){
				if( this.astLearnNode !== null ){
					this.astLNList = [this.astLearnNode];
				}else{
					this.astLNList = this.astLearnGraph.nodes;
				}
			},
			startAddAstLN(){
				this.$emit(this.events.startaddnode);
			},
			operationBack(){
				this.$emit(this.events.selectnode, null);
			},
			selectAstLN(astLN){
				this.$emit(this.events.selectnode, astLN);
			},
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	.ast_learn_node_list{
		display: flex;
		flex-direction: column;
		padding: 0 0.06rem 0 0.06rem;
		width: 100%;
		height: 100%;
		>.header{
			display: flex;
			justify-content: flex-end;
			padding: 0.06rem 0;
			width: 100%;
			height: 0.32rem;
			color: #ffffff;
			font-size: 0.14rem;
		}
		>.body{
			width: 100%;
			height: 0;
			flex: 1;
			overflow: auto;
			>.ast_learn_node{
				margin: 0 0 0.06rem;
				padding: 0 0 0.04rem 0;
				width: 100%;
				background-color: #434343;
		    border-radius: 0.02rem;
		    >.padding{
					padding: 0 0.04rem;
		    }
				>.header{
					position: relative;
					width: 100%;
					color: #ffffff;
					font-size: 0.14rem;
					line-height: 0.2rem;
					background-color: #6d6d6d;
			    >.text{
			    	padding: 0 0.04rem;
				    border-radius: 0.02rem;
						cursor: pointer;
				    transition: color .3s;
			    }
					>.text:hover{
						color: #000000;
					}
					>.btns{
				    position: absolute;
						top: 0;
						right: 0;
						display: flex;
						height: 100%;
					}
				}
				>.entry{
					width: 100%;
					font-size: 0.14rem;
					line-height: 0.2rem;
					color: #CCCCCC;
					>.property.header{
						display: flex;
				    flex-wrap: wrap;
						width: 100%;
						>.title{
							padding: 0 0.04rem 0 0;
							color: #99CC99;
						}
					}
					>.property.body{
						display: flex;
				    flex-wrap: wrap;
						padding: 0 0 0 0.1rem;
						>.array{
							color: #0088ff;
						}
					}
					>.property{
						>.tab{
					    >.text{
					    	padding: 0 0.04rem;
								color: #F99157;
						    border-radius: 0.02rem;
								cursor: pointer;
						    transition: background-color .3s;
					    }
							>.text:hover{
								background-color: #262626;
							}
					    >.partition{
					    	padding: 0 0.02rem;
					    }
						}
					}
				}
				>.entry.column{
					flex-direction: column;
				}
				>.property{
					padding: 0 0 0 0.1rem;
				}
			}
		}
	}
</style>