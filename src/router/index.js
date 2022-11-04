import Vue from 'vue'
import VueRouter from 'vue-router'
import getRoutes from './get_routes.js'

Vue.use(VueRouter);

const routes = [

	// 组件案例
	{
		path: '/components',
		component: () => import('../components/components.vue'),
		children: getRoutes([
			// 自己写的组件
			{
				component: (path)=> ()=> import(`../components/${path}/example.vue`),
				paths: ['scrollbar', 'context_menu', 'tree', 'message', 'side']
			},
			// element-ui 的组件
			{
				component: (path)=> ()=> import(`../components/${path}/index.vue`),
				paths: ['element-ui.copy/color-picker', 'element-ui.copy/tree']
			}
		])
	},

	{
		path: '/show_myself',
		component: () => import('../views/show_myself/show_myself.vue'),
	},

	{
		path: '/tex_to_image',//	图片格式的公式
		component: () => import('../tools/mathjax/tex_to_image.vue'),
	},
	{
		path: '/image_to_base64',//	展示图片 base64
		component: () => import('../tools/image/image_to_base64.vue'),
	},
	{
		path: '/learn_ast_node',//	学习 ast node 信息
		component: () => import('../views/learn_ast_node/learn_ast_node.vue'),
	},
	{
		path: '/paper',//	论文学习
		component: () => import('../views/paper/paper.vue'),
	},
	{
		path: '/code_document',// 	代码文档
		component: () => import('../views/code_document/code_document.vue'),
	},
	{
		path: '/learn_d3',//	d3 案例
		component: () => import('../views/learn_d3/learn_d3.vue')
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next)=>{
	if( to.fullPath === '/' ){
		next('/show_myself');
	}else{
		next();
	}
});

export default router
