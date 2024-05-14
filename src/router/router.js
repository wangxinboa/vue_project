import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


export const paths = {
	index: '/index'
};


const routes = [

	{
		path: '/read_translation',
		component: () => import('../views/read_translation/read_translation.vue'),
	},
	{
		path: '/three_editor',
		component: () => import('../views/three_editor/three_editor.vue'),
	}
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

// router.beforeEach((to, from, next)=>{
// 	if( to.fullPath === '/' ){
// 		next(paths.index);
// 	}else{
// 		next();
// 	}
// });

export default router;