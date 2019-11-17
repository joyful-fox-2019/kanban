<template>
  <div class="flex-column shadow m-2 p-2 w-full mx-auto" :class="cardColor">
    <div class="task-info my-2 p-2 mx-auto">
      Name: {{ task.name }}
      <br>
      Status: {{ task.status }}
    </div>
    <hr>
    <div class="task-action flex justify-center items-center p-2 m-2">
      <select v-model="selected" class="p-2">
        <option v-for="status in statuses" :key="status" :value="status">{{status}}</option>
      </select>
      <button class="px-4 m-2 py-2 text-white bg-blue-700 hover:bg-blue-500" @click="updateStatus">Update</button>
    </div>
    <div class="p-2">
      <button class="px-4 py-2 m-2 text-white bg-red-700 hover:bg-red-500" @click="deleteTask">Delete</button>
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
    },
    deleteTask () {
      db.collection('tasks').doc(this.task.id).delete()
    }
  },
  computed: {
    cardColor () {
      let result = ''
      switch (this.task.status) {
        case 'backlog':
          result = 'bg-red-200'
          break
        case 'todo':
          result = 'bg-yellow-200'
          break
        case 'doing':
          result = 'bg-blue-200'
          break
        case 'done':
          result = 'bg-green-200'
          break
      }
      return result
    }
  },
}
</script>

<style>

</style>
