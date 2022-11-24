import Vue from 'vue'
import VueRouter from 'vue-router'
import getRoutes from './get_routes.js'

Vue.use(VueRouter);

const routes = [

	// 基本通过，可以对外进行展示
	{
		path: '/index',
		component: () => import('../views/index.vue'),
	},
	{
		path: '/tex_to_image',//	图片格式的公式
		component: () => import('../views/tools/tex_to_image.vue'),
	},
	{
		path: '/image_to_base64',//	图片转 base64
		component: () => import('../views/tools/image_to_base64.vue'),
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next)=>{
	if( to.fullPath === '/' ){
		next('/index');
	}else{
		next();
	}
});

export default router
