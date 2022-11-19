import Vue from 'vue'
import VueRouter from 'vue-router'
import getRoutes from './get_routes.js'

Vue.use(VueRouter);

const routes = [

	// 基本通过，可以对外进行展示
	{
		path: '/show_myself',
		component: () => import('../views/show_myself/show_myself.vue'),
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next)=>{
	console.log('to:', to);
	if( to.fullPath === '/' ){
		next('/show_myself');
	}else{
		next();
	}
});

export default router
