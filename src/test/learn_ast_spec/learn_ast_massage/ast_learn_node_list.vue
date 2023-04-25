<template>
	<div class="ast_learn_node_list">
		<div class="header">操作</div>
		<div class="content">
			<div class="ast_learn_node"
				v-for="astLN in astLearnGraph.nodes"
				:key="astLN.type">
				<div class="prevent_text_overflow padding header">{{astLN.type}}</div>
				<div class="padding entry column property"
					v-for="property in astLN.properties">
					<div class="prevent_text_overflow property header">
						<div class="title">{{property.key}}:</div>
						<div class="tab" v-for="(prim, index) in property.primitive">
						 	{{prim}}
						</div>
					</div>
					<div class="property content">
						<div class="tab"
							v-for="(astLN, index) in property.astLearnNodes">
						 	<span class="text">{{astLN.type}}</span>
						 	<span class="partition" v-if="index < property.astLearnNodes.length - 1">|</span>
						</div>
						 <div class="array pre" v-if="property.astLNArray.length > 0">{{'Array<'}}</div>
						<div class="tab"
							v-for="(astLN, index) in property.astLNArray">
						 	<span class="text">{{astLN.type}}</span>
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
		props: {
			astLearnGraph: {
				type: Object,
				default: null
			}
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
			padding: 0.06rem 0;
			width: 100%;
			color: #ffffff;
		}
		>.content{
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
					width: 100%;
					color: #ffffff;
					font-size: 0.14rem;
					line-height: 0.2rem;
					background-color: #5b5b5b;
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
					>.property.content{
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