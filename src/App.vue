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
// css 初始化统一样式
html, body, #app {
  margin: 0;
  padding: 0;
  border-width: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
html{
  font-size: 100px;
}
body{
  font-size: 0.2rem;
}
div, svg, pre, textarea, input, iframe, span, img, p, canvas
h1, h2, h3, h4, h5, h6 {
  display: block;
  margin: 0;
  padding: 0;
  border-width: 0;
  user-select: none;
  box-sizing: border-box;
  outline: none;
}
</style>
