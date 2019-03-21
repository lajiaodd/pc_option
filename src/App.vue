<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/font/iconfont.css';
html,body{
    height: 100%;
    overflow: hidden;
}
body {
    margin: 0;
    padding: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a{
    color: #ffffff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #ffffff;
  /* color: #605e5e; */
  min-height: 100vh;
  overflow: hidden;
  background: #000000;
}
</style>
