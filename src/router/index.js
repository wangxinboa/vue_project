import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const paths = {
	index: '/index',
	texToImage: '/tex_to_image',
	imageToBase64: '/image_to_base64',
	codeAnalyzer: '/code_analyzer'
}

const routes = [

	// 基本通过，可以对外进行展示
	{
		path: paths.index,
		component: () => import('../views/index.vue'),
	},
	{
		path: paths.texToImage,//	图片格式的公式
		component: () => import('../views/tools/mathtex_to_image/mathtex_to_image.vue'),
	},
	{
		path: paths.imageToBase64,//	图片转 base64
		component: () => import('../views/tools/image_to_base64/image_to_base64.vue'),
	},
	{
		path: paths.codeAnalyzer,//	图片转 base64
		component: () => import('../views/tools/code_analyzer/code_analyzer.vue'),
	},


]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next)=>{
	if( to.fullPath === '/' ){
		next(paths.index);
	}else{
		next();
	}
});

export default router
