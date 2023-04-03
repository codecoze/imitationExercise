<template>
    <!-- todo 列表 -->
    <div class="todo-list">
        <!-- todo 项目，外层容器用于显示背景、圆角边框 -->
        <TodoListItem v-for="todo in todos" :key="todo.id" :todo-item="todo"  @change-state="todo.completed = $event.target.checked"/>
      </div>
</template>

<script setup>
import { ref,defineProps,toRefs } from "vue"
import TodoListItem from './TodoListItem.vue';

const props = defineProps({
    todos: {
        type: Array,
        default: ()=>[]
    }
});

const { todos } = toRefs(props)


</script>

<style  scoped>

.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>