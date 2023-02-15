<template>
  <div id="app"
      v-on:contextmenu.prevent>
    <router-view/>
  </div>
</template>

<script>
  export default {
    methods: {
      preventDefault(e){
        e.preventDefault();
      }
    },
    mounted(){
    },
    destroyed(){
    }
  }
</script>

<style lang="less">
html, body, #app {
  margin: 0;
  padding: 0;
  border-width: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 100px;
}
div, svg, pre, textarea, input, iframe, span, img, p, canvas
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
  border-width: 0;
  user-select: none;
  box-sizing: border-box;
  outline: none;
}
textarea, canvas, input{
  display: block;
}

// 一些方便使用的样式
.prevent_text_overflow{
	overflow: hidden;
	text-overflow: ellipsis; //文本溢出显示省略号
	white-space: nowrap; //文本不会换行
}
</style>
