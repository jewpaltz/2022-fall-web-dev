<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import HelloWorld from './components/HelloWorld.vue'
    import NavVue from './components/Nav.vue';
</script>

<template>
    
  <header>
    <NavVue />
  </header>

  <div class="container">
    <RouterView />
  </div>

</template>

<style scoped>

</style>
