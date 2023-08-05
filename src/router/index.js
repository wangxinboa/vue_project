import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const paths = {
	index: '/index',
	mathtexToImage: '/tools/mathtex_to_image',
	imageToBase64: '/tools/image_to_base64',
	codeAnalyzer: '/code_analyzer',

	learnAstSpec: '/test/learn_ast_spec',
	astGraph: '/test/ast_graph',
	diffFiles: '/test/diff_files'
}

const routes = [
	// 测试中
	{
		path: paths.diffFiles,		//	代码文件对比
		component: () => import('../test/diff_files/diff_files.vue'),
	},
	{
		path: paths.learnAstSpec,		//	ast 规范学习
		component: () => import('../test/learn_ast_spec/learn_ast_spec.vue'),
	},
	{
		path: paths.astGraph,		//	ast 节点规范关系图
		component: () => import('../test/ast_graph/ast_graph.vue'),
	},

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
