# 简介
&emsp;项目入口: [https://officialbusiness.github.io/vue_project/dist/index.html](https://officialbusiness.github.io/vue_project/dist/index.html)

&emsp;项目规范: [http://alloyteam.github.io/CodeGuide/](http://alloyteam.github.io/CodeGuide/)

&emsp;使用vue脚手架 @vue/cli@4.5.13 创建

## 脚手架自带依赖
* core-js
* vue
* vue-router
* vuex
* @vue/cli-plugin-babel
* @vue/cli-plugin-router
* @vue/cli-plugin-vuex
* @vue/cli-service
* less
* less-loader
* vue-template-compiler

## 下载依赖
### dependencies:

* monaco-editor: vscode 编辑器的效果

### devDependencies:

* monaco-editor-webpack-plugin: 用于解决 monaco-editor 的报错情况


## 内部添加(直接添加到代码中使用)的第三方框架
* [@babel/parser](https://www.npmjs.com/package/@babel/parser): 用于将 javascript 代码转化为 ast 节点，[从 npm 拿到](https://www.npmjs.com/package/@babel/parser?activeTab=code)
* [jszip](https://github.com/Stuk/jszip): 用于压缩文件到 zip 压缩包，[从 npm 拿到](https://www.npmjs.com/package/jszip?activeTab=code)
* [diff](https://github.com/kpdecker/jsdiff): [从 npm 拿到](https://www.npmjs.com/package/diff?activeTab=readme)

## 外部添加(index.html中添加全局使用)的第三方框架
* [MathJax-src](https://github.com/mathjax/Mathjax-src/): 用于生成数学符号，网上获取
* [ace](https://github.com/ajaxorg/ace): 用于构建浏览器在线代码编辑器，github 获取


