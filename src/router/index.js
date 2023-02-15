import Vue from 'vue'
import VueRouter from 'vue-router'
import getRoutes from './get_routes.js'

Vue.use(VueRouter);

export const paths = {
	index: '/index',
	texToImage: '/tex_to_image',
	imageToBase64: '/image_to_base64',
	codeParser: '/code_parser',
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
		component: () => import('../views/tools/image_to_base64.vue'),
	},
	{
		path: paths.codeParser,//	图片转 base64
		component: () => import('../views/tools/code_parser/code_parser.vue'),
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next)=>{
	if( to.fullPath === '/'){
		next(paths.index);
	}else{
		next();
	}
});

export default router
