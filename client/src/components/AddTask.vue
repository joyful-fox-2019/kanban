<template>
  <div class="flex-column items-start">
    <form @submit.prevent="addTask">
      <label class="w-full">Name</label>
      <input type="text" placeholder="Name" v-model="name" class="p-2 w-4/5">
      <input type="submit" value="add" class="py-2 px-4 m-2">
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
    }
  }
}
</script>

<style>

</style>
