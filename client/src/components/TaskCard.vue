<template>
  <div class="flex column">
    <div class="task-info">
      {{ task.name }}
      {{ task.status }}
    </div>
    <div class="task-action flex justify-center items-center">
      <select v-model="selected">
        <option v-for="status in statuses" :key="status" :value="status">{{status}}</option>
      </select>
      <button class="px-4 py-2 text-white bg-blue-700 hover:bg-blue-500" @click="updateStatus">Update</button>
    </div>
  </div>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'taskCard',
  data () {
    return {
      statuses: ['backlog', 'todo', 'doing', 'done'],
      selected: ''
    }
  },
  props: ['task'],
  methods: {
    updateStatus () {
      db.collection('tasks').doc(this.task.id).update({ status: this.selected })
    }
  }
}
</script>

<style>

</style>
