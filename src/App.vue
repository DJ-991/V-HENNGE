<template>
  <div id="app">
    <Hennge/>
  </div>
</template>

<script>
import Hennge from './components/Hennge.vue';

export default {
  name: 'App',
  components: {
    Hennge,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
