<template>
  <div id="app">
  	<div id="cover"></div>
  	<Header></Header>
  	<todo></todo>
  	<Footer></Footer>
  </div>
</template>

<script>
	import Header from './todo/header.vue'
	import Footer from './todo/footer.jsx'
	import Todo from './todo/todo.vue'
	//为模块指定默认输出
	export default{
		components:{
			Header,
			Footer,
			Todo
		}
	}
</script>

<style lang="scss" scoped>
#app{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
#cover{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color:#999;
  opacity:0.9;
  z-index:-1;
}
</style>