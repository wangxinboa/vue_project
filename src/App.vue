<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    methods: {
      preventDefault(e){
        e.preventDefault();
      },
      preventMacJump(e){// 会影响子节点的滚动效果
        let target = e.currentTarget;
        // 如果这个事件看起来要滚动到元素的边界之外，要阻止它
        // 其中一个是滚动到最左边，一个是滚动到最右边
        if (
            target.scrollLeft + e.deltaX < 0 || 
            target.scrollLeft + e.deltaX > target.scrollWidth - target.offsetWidth ) {
          // 阻止事件
          e.preventDefault();
        }
      }
    },
    mounted(){
      document.addEventListener('contextmenu', this.preventDefault);
    },
    destroyed(){
    }
  }
</script>