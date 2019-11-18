<template>
  <div class="flex-column items-start shadow m-2 p-2 bg-gray-200">
    <form @submit.prevent="addTask" class="flex-column">
      <label class="w-full">Add New Task</label>
      <input type="text" placeholder="Task name" v-model="name" minlength="5" class="p-2 w-4/5 m-2 mt-4">
      <input type="submit" value="add" class="py-2 px-4 m-2 bg-green-400">
    </form>
  </div>
</template>

<script>
import db from '../config/firebase'
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    addTask () {
      const newTask = { name: this.name, status: 'backlog' }
      db.collection('tasks').add(newTask)
        .then(function (docRef) {
          console.log(`Document written with ID ${docRef.id}`)
        })
        .catch(console.log)
        this.name = ''
    }
  }
}
</script>

<style>

</style>
