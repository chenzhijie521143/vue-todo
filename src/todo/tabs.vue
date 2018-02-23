<template>
	<div class="helper">
		<span class='left'>{{unFinishedTodoLength}}items left</span>
		<span class='tabs'>
			<span 
				v-for="state in states"
			    v-bind:key="state"
			    v-bind:class="[state,filter === state? 'actived' : '']" 
			    v-on:click="toggleFilter(state)"
			>
			{{state}}
			</span>
		</span>
		<span 
			class='clear' 
			v-on:click="clearAllCompleted"
			>Clear completed
		</span>
	</div>
</template>

<script>
export default{
	//子组件所需要的数据
	data(){
		return{
			states:['all','active','completed']
		}
	},
	//接收父组件传递的数据
	props:{
		filter:{
			type:String,
			required:true,
		},
		todos:{
			type:Array,
			required:true,
		}
	},
	//计算属性
	computed:{
		//未完成的事件数量
		unFinishedTodoLength:function(){
			return this.todos.filter(todo=>!todo.completed).length;
		}
	},
	methods:{
		//触发父组件的toggle事件，并向父组件传递数据
		toggleFilter:function(state){
			this.$emit('toggle',state);
		},
		//触发父组件的clearAllCompleted事件
		clearAllCompleted:function(){
			this.$emit('clearAllCompleted');
		}
	},
}
</script>

<style lang="scss" scoped>
.helper{
  font-weight: 100;
  display :flex;
  justify-content :space-between;
  padding:5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size :14px;
  font-smoothing: antialiased;
}
.left, .clear, .tabs{
  padding: 0 10px;
  box-sizing: border-box;
}
.left, .clear{
  width:150px;
}
.left{
  text-align: left;
}
.clear{
  text-align :right;
  cursor: pointer;
}
.tabs{
  width :200px;
  display: flex;
  justify-content: space-around;
  *{
    display: inline-block;
    padding: 0 10px;
    cursor :pointer;
    border :1px solid rgba(175,47,47,0);
    &.actived{
      border-color: rgba(175,47,47,0.4);
      border-radius :5px;
    }
  }
}
</style>