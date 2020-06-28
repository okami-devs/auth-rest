<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view class="container pt-2"/>
  </div>
</template>

<script>
import navBar from './components/navBar.vue';

export default {
  components: {
    navBar,
  },
};
</script>

<style>

</style>
