<template>
  <div class="home">
    <backlog-component />
    <todo-component />
    <doing-component />
    <done-component />
  </div>
</template>

<script>
import Backlog from '@/components/Backlog.vue'
import Todo from '@/components/Todo.vue'
import Doing from '@/components/Doing.vue'
import Done from '@/components/Done.vue'

export default {
  name: 'home',
  components: {
    'backlog-component': Backlog,
    'todo-component': Todo,
    'doing-component': Doing,
    'done-component': Done
  }
}
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
