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
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width:100%;
    height:100%;
    font-size: 14px;
    color: #3B4162;
    overflow: hidden;
  }
  ul{list-style:none}
  a{text-decoration: none;}
  img{vertical-align:top;border:none}
</style>
