<template>
	<section class="real-app">
		<input 
			type="text" 
			class='add-input' 
			autofocus="autofocus" 
			placeholder='接下去要做什么?' 
			v-on:keyup.enter='addTodo'
		/>
	    <item 
	    	v-for="todo in filteredTodos"
	    	v-bind:todo="todo" 
	    	v-bind:key="todo.id"  
	    	v-on:del="deleteTodo" 
	    />
	    <!--  v-bind:todo="todo"  将  props  todo 绑定到父组件的数据 todos.todo上，实现数据更新-->
	    <tabs 
	    	v-bind:filter="filter"
	    	v-bind:todos="todos"
	    	v-on:toggle="toggleFilter"
	    	v-on:clearAllCompleted="clearAllCompleted"
	    />
	</section> 
</template>
<script>
	import Item from './item.vue'
	import Tabs from './tabs.vue'
	let id=0
	export default{	
		//1  数据尽量放在顶层
		data(){
			return{
				todos:[],
				filter:'all'
			}
		},
		//2  两个子组件
		components:{
			Item,
			Tabs,
		},
		//3  计算属性
		computed:{
			//过滤 todos 数组
			filteredTodos:function(){
				if(this.filter==='all'){
					return this.todos;
				}
				const completed=this.filter === 'completed';//true/false
				return this.todos.filter(todo=>completed === todo.completed);
			}
		},
		//4  方法
		methods:{
			//添加事件
			addTodo:function(e){
				if(e.target.value.trim()== ''){
					alert('内容不能为空');
				}else{
					this.todos.unshift({
					id:id++,
					content:e.target.value.trim(),
					completed:false,
				    });
				    e.target.value='';
				}
			},
			//删除事件
			deleteTodo:function(id){
				this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1);
			},
			//切换显示状态
			toggleFilter:function(state){
				this.filter=state;
			},
			//清除完成的事件
			clearAllCompleted:function(){
				//筛选未完成的赋值给todos数组
				this.todos=this.todos.filter(todo=> todo.completed===false);
			}
			
		}
	}
</script>

<style scoped>
.real-app{
  width:600px;
  margin:0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>