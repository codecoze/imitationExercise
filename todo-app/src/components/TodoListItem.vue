<template>
    <div class="todo-item" :class="{ done: todoItem.completed}">
        <!-- 用 label 包裹后，点击里边任何一个元素都能触发 checkbox 的事件 -->
        <label>
        <input type="checkbox" :checked="todoItem.completed" @click="emits('change-state',$event)"/>
            {{ todoItem.content }}
        <!-- 自定义的复选按钮 -->
        <span class="check-button" ></span>
        </label>
    </div>
</template>

<script setup>
import { defineProps,toRefs,defineEmits } from 'vue';

const props = defineProps({
    todoItem: {
        type: Object,
        default: ()=>{}
    }
});

const emits= defineEmits(["change-state"]);

const { todoItem } = toRefs(props);


</script>

<style scoped>
.todo-item {
  background-color: #FFF;
  padding: 16px;
  border-radius: 8px;
  color: #626262;
}

.todo-item label {
  position: relative;
  display: flex;
  align-items: center;
}

.todo-item.done label {
    text-decoration: line-through;
    font-style: italic;
}


.todo-item label span.check-button {
  position: absolute;
  top: 0;
}


.todo-item label span.check-button::before,
.todo-item label span.check-button::after {
  content: "";
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.todo-item label span.check-button::before {
  border: 1px solid #b382f9;
}

.todo-item label span.check-button::after {
  transition: 0.3s;
  background: #b382f9;
  transform: translate(1px,1px) scale(0.8);
  opacity: 0;
}

.todo-item input {
  margin-right: 16px;
  opacity: 0;
}

.todo-item input:checked + span.check-button::after {
  opacity: 1;
}
</style>