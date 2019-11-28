<template>
  <div class="content">
    <h3>{{task.task}}</h3>
    <h4>{{task.for}}</h4>

    <!-- btn  -->
    <div>
      <button @click="remove">delete</button>
    </div>
    <div>
      <button>back/forth</button>
    </div>
    <div>
      <button></button>
    </div>
  </div>
</template>

<script>
import db from '../configs/firebase'

export default {
  name: 'task',
  methods: {
    remove () {
      db.collection('tasks').doc(this.task.id).delete()
    }
  },
  props: ['task']
}
</script>

<style>

</style>
