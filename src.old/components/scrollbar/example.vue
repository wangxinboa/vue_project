<template>
	<div id="myScrollbarExample">
		<!-- <scrollbar-y /> -->
		<div class="demo1">
			<scrollbar_browser>
				<!-- <scrollbar-y/> -->
				<div v-for="(d, index) in data" class='d'>
					demo1 测试 {{index}}
				</div>
			</scrollbar_browser>
		</div>
		<div class="demo2">
			<!-- <scrollbar-y /> -->
			<div v-for="(d, index) in data" class='d'>
				demo2 测试 {{index}}
			</div>
		</div>
	</div>
</template>

<script>
	// import scrollbarY from './scrollbar.vue'
	import scrollbarBrowser from './scrollbar_browser.vue';

	export default {
		data(){
			return {
				data: [1,1,1,1,1,1,1,1,1,1]
			}
		},
		components: {
			// 'scrollbar-y': scrollbarY
			'scrollbar_browser': scrollbarBrowser,
		},

	}

</script>

<style lang="less">
	#myScrollbarExample{
		width: 100%;
		height: 100%;
		>.demo1{
			width: 100%;
			height: 60vh;
			background-color: red;
			.d{
				//width: 100%;
				height: 500px;
			}
		}
		>.demo2{
			width: 100%;
			height: 60vh;
			background-color: yellow;
			>.d{
				//width: 100%;
				height: 100px;
			}
		}
	}
</style>