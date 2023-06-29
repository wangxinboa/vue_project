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