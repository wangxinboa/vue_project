<template>
	<div id="show_myself">
		<v-header
			class="header"
			icon="zhanshizhongxin"
			title="个人展示中心"/>
		<div class="main show_data">
			<div class="data"
				v-for="data in showData">
				<div class="type">{{data.type}}</div>
				<div class="items">
					<div class="item_container"
						v-for="item in data.items"
						:title="item.title">
						<div class="item"
							v-on:mousedown='toShow(item.path)'>
							<!-- <div class=""></div> -->
							<div class="title">{{item.title}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import router, { paths } from '@/router/index.js';
	// import data from './'

	export default {
		data(){
			return {
				showData: [
					{
						type: '工具',
						items: [
							{ title: '代码解析器', path: paths.codeParser },
							{ title: '数学公式 mathjax', path: paths.texToImage },
							{ title: '图片转换 base64', path: paths.imageToBase64 },
						]
					},
					// {
					// 	type: '组件',
					// 	items: [
					// 		{ title: '树', path: '' },
					// 		{ title: '内容菜单', path: '' },
					// 		{ title: '下拉菜单', path: '' },
					// 		{ title: '文字提示', path: '' },
					// 		{ title: '消息提示', path: '' },
					// 		{ title: '分页', path: '' },
					// 		{ title: '日历', path: '' },
					// 	]
					// },
					{
						type: '代码学习',
						items: [

						]
					}

				]
			}
		},
		methods: {
			toShow(path){
				router.push(path)
			}
		}
	}
</script>


<style lang="less">
	#show_myself{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: 0.3rem;
		overflow: hidden;
		>.main{
			padding: 0.1rem;
			width: 100%;
			height: 0;
			flex: 1;
			overflow-y: auto;
			>.data{
				padding: 0.1rem;
				width: 100%;
				>.type{
					padding: 0 0 0.1rem 0.1rem;
					font-size: 0.24rem;
				}
				>.items{
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					>.item_container{
						padding: 0.1rem;
						width: 20%;
						>.item{
							border-radius: 0.03rem;
							border: 0.01rem solid #e5e5e5;
							cursor: pointer;
							transition: box-shadow .3s;
							>.title{
								padding: 0 0.1rem;
								width: 100%;
								height: 0.5rem;
								line-height: 0.5rem;
								text-align: center;
								font-size: 0.16rem;
								white-space: nowrap; //文本强制不换行
								text-overflow: ellipsis; //文本溢出显示省略号
								overflow: hidden; //溢出的部分隐藏
							}
						}
						>.item:hover{
							box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
						}
					}
					@media only screen and (max-width:1024px){
						>.item_container{
							width: 25%;
						}
					}
					@media only screen and (max-width:880px){
						>.item_container{
							width: 33%;
						}
					}
					@media only screen and (max-width:660px){
						>.item_container{
							width: 50%;
						}
					}
					@media only screen and (max-width:430px){
						>.item_container{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>