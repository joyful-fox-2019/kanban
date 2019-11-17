<template>
  <div class="flex-column m-2 p-4 shadow-lg bg-white">
    <div class="p-2 m-4" :class="cardColor">{{category.name.toUpperCase()}}</div>
    <TaskCard v-for="task in category.tasks" :key="task.id" :task="task"></TaskCard>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
export default {
  name: 'taskContainer',
  components: {
    TaskCard
  },
  props: ['category'],
  computed: {
    cardColor () {
      let result = ''
      switch (this.category.name) {
        case 'backlog':
          result = 'bg-red-400'
          break
        case 'todo':
          result = 'bg-yellow-400'
          break
        case 'doing':
          result = 'bg-blue-400'
          break
        case 'done':
          result = 'bg-green-400'
          break
      }
      return result
    }
  }
}
</script>

<style>

</style>
