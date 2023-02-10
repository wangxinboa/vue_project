<template>
	<div class="show_myself">
		<div class="header">
			<div class="title">
				<div class="iconfont icon-zhanshizhongxin"></div>
				<div class="text">个人展示中心</div>
			</div>
		</div>
		<div class="main">
			<div class="bar" v-for='data in showData'>
				<div :id="'show-'+data.id" class="name">{{data.name}}</div>
				<div class="entries">
					<div class="entry_container" v-for='entry in data.entries'>
						<div class="entry"
							v-on:mousedown='toEntry(entry.path)'>
							<div class="title prevent_text_overflow">{{entry.title}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router/index.js';
	import showData from './show_data.js';

	export default{
		data(){
			return {
				showData
			}
		},
		methods: {
			toEntry(path){
				if( path ){
					router.push(path)
				}
			}
		}
	}
</script>

<style lang="less">
	.show_myself{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		>.header{
			width: 100%;
			height: 0.5rem;
			background-color: #24292f;
			>.title{
				display: flex;
				padding-left: 0.1rem;
				height: 100%;
				>div{
					color: #ffffff;
					line-height: 0.5rem;
				}
				>.iconfont{
					font-size: 0.16rem;
				}
				>.iconfont:before{
					cursor: pointer;
				}
				>.text{
					padding-left: 0.08rem;
					font-size: 0.14rem;
				}
			}
		}
		>.main{
			width: 100%;
			flex: 1;
			overflow: auto;
			>.bar{
				padding: 0.2rem;
				width: 100%;
				>.name{
					padding: 0 0 0.2rem 0.1rem;
					font-size: 0.24rem;
				}
				>.entries{
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					>.entry_container{
						width: 20%;
						height: 0.8rem;
						padding: 0.14rem;
						>.entry{
							width: 100%;
							height: 100%;
							padding: 0.1rem;
							border-radius: 0.03rem;
							border: 0.01rem solid #e5e5e5;
							cursor: pointer;
							transition: box-shadow .3s;
							>.title{
								width: 100%;
								height: 0.3rem;
								line-height: 0.3rem;
								text-align: center;
								font-size: 0.16rem;
							}
						}
						>.entry:hover{
							box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
						}
					}
					@media only screen and (max-width:1024px){
						>.entry_container{
							width: 25%;
						}
					}
					@media only screen and (max-width:880px){
						>.entry_container{
							width: 33%;
						}
					}
					@media only screen and (max-width:660px){
						>.entry_container{
							width: 50%;
						}
					}
					@media only screen and (max-width:430px){
						>.entry_container{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>