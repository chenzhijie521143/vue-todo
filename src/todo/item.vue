<template>
	<div 
		v-bind:class="['todo-item',todo.completed ? 'completed':'']"
	>
		<input 
			type="checkbox" 
			class='toggle' 
			v-model="todo.completed"
		/>
		<label>{{todo.content}}</label>
		<button 
			class='destory' 
			v-on:click='deleteTodo'
		>
		</button>
	</div>
</template>

<script>
	export default{
		//接收父组件向子组件传递数据
		props:{ 
			todo:{ //用 v-bind 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件
				type:Object,
			    required:true,
			}
		},
		methods:{
			deleteTodo:function(){
				//子组件触发   父组件监听的事件，向父组件传递数据 ，父组件再进行相关操作
				this.$emit('del',this.todo.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
.todo-item{
  position: relative;
  background-color :#fff;
  font-size :4px;
  border-bottom :1px solid rgba(0,0,0,0.06);
  &:hover{
    .destory:after{
      content: '×';
    }
  }
  label{
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-size:20px;
  }
}
.completed{
    label{
      color: #d9d9d9;
      text-decoration: line-through;
    }
}
.toggle{
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline :none;
  &:after{
    content :url('../assets/images/round.svg');
  }
  &:checked:after{
    content: url('../assets/images/done.svg');
  }
}
.destory{
  position: absolute;
  top: 0px;
  right: 10px;
  bottom: -8px;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor :pointer;
  outline :none;
}
</style>