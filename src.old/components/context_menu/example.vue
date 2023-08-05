<template>
	<div id="myContextMenuExample">
		<div class="demo1">
			<context-menu
				:menu='menu2'
				/>
		</div>
		<div class="demo2">
			<context-menu
				:menu='menu3'
				/>
		</div>
		<context-menu
			:menu='menu1'
			/>
	</div>
</template>

<script>
	import contextMenu from './context_menu.vue'

	export default {
		data(){
			return {
				event: null,
				menu: [],
				menu1: [
					{
						name: '菜单按钮一',
						event: ()=>{
							console.log('菜单按钮一')
						},
					},
					{
						name: '菜单按钮二',
						event: ()=>{
							console.log('菜单按钮二')
						}
					}
				],
				menu2: [
					{
						name: '菜单按钮1',
						event: ()=>{
							console.log('菜单按钮1');
						}
					},
					{
						name: '菜单按钮1',
						event: ()=>{
							console.log('菜单按钮2');
						}
					}
				],
				menu3: [
					{
						name: '1',
						event: ()=>{
							console.log('1');
						}
					},
					{
						name: '2',
						event: ()=>{
							console.log('2');
						}
					}
				],
				hasChange: false,
			}
		},
		components: {
			'context-menu': contextMenu
		},
		methods: {
			setMenu1(){

			},
			setMenu2(){

			},
			setMenu3(){

			}
		}
	}

</script>

<style lang="less">
	#myContextMenuExample{
		width: 100%;
		height: 100%;
		background-color: #000000;
		>.demo1{
			margin-left: 200px;
			width: 400px;
			height: 400px;
			background-color: #ff0000;
		}
		>.demo2{
			margin-top: 10px;
			margin-left: 200px;
			width: 100px;
			height: 100px;
			background-color: #ffff00;
		}

	}
</style>