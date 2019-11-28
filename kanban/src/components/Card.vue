<template>
  <div>
    <div class="card">
      <h4 style="color: #D2BF7E">
        <div>
          {{card.tasks}}
          <h4 v-if="card.name == 'backlog' ">0%</h4>
          <h4 v-else-if="card.name == 'todo'">20%</h4>
          <h4 v-else-if="card.name == 'ongoing'">80%</h4>
          <h4 v-else-if="card.name == 'finished'">100%</h4>
        </div>
      </h4>
      <Task v-for="(task, index) in card.tasks" :key="index" :task="task" :title="card.tasks.title"></Task>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue'

export default {
  name: 'Card',
  components: {
    Task
  },
  props: ['card'],
  created () {
    console.log(this.card)
  }
}
</script>

<style scoped>
.card {
  background-color: #8d7533;
}
</style>
