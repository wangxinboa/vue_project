import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const paths = {
	index: '/index',
	mathtexToImage: '/tools/mathtex_to_image',
	imageToBase64: '/tools/image_to_base64',
	codeAnalyzer: '/code_analyzer',

	specAst: '/test/spec_ast',
}

const routes = [

	// 基本通过，可以对外进行展示
	{
		path: paths.index,
		component: () => import('../views/pages/index.vue'),
	},
	{
		path: paths.mathtexToImage,			//	图片格式的公式
		component: () => import('../views/pages/tools/mathtex_to_image/mathtex_to_image.vue'),
	},
	{
		path: paths.imageToBase64,	//	图片转 base64
		component: () => import('../views/pages/tools/image_to_base64/image_to_base64.vue'),
	},
	{
		path: paths.codeAnalyzer,		//	代码解析工具
		component: () => import('../views/pages/code_analyzer/code_analyzer.vue'),
	},

	{
		path: paths.specAst,		//	代码解析工具
		component: () => import('../test/spec_ast/spec_ast.vue'),
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
