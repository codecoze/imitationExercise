<template>
  <main>
    <div class="container">
      <h1>欢迎使用 Feng 代办事项!</h1>
      <TodoAdd :tid="todos.length" @add-todo="addTodo" />
      <TodoFilter :selected="filter" @change-filter="filter = $event" />
      <TodoList  :todos="filteredTodo" />
    </div>
  </main>
</template>


<script setup>
import TodoAdd from "./components/TodoAdd.vue";
import TodoFilter from "./components/TodoFilter.vue";
import TodoList from "./components/TodoList.vue";
import useTodos from "./composable/useTodos";
import useFilteredTodos from "./composable/useFilteredTodos";

import { onMounted } from "vue";

const { todos, addTodo } = useTodos();
const { filter, filteredTodo}  = useFilteredTodos(todos);

const fetchTodos = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const rawTodos = await response.json();
    todos.value = rawTodos.map((todo) => ({
      id: todo.id,
      content: todo.title,
      completed: todo.completed,
    }));
  };
onMounted(()=>{
  fetchTodos();

})

</script>

<style >
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
 }

 main {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: rgba(203,210,240);
 }

.container {
  width: 60%;
  max-width: 400px;
  box-shadow: 0 0 24px rgba(0,0,0,0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgba(245,246,252);
}

h1 { 
  margin: 24px 0;
  font-size: 28px;
  color: #414873;
}

</style>
