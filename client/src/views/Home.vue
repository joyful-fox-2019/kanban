<template>
  <div class="home">
    <div class="flex justify-center items-center p-2">
      <AddTask></AddTask>
    </div>
    <div class="flex flex-wrap mx-auto p-10 justify-around">
      <TaskContainer v-for="category in categories" :key="category.name" :category="category"></TaskContainer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskContainer from '../components/TaskContainer'
import AddTask from '../components/AddTask'
import db from '../config/firebase'
export default {
  name: 'home',
  data () {
    return {
      categories: [
        {
          name: 'backlog',
          tasks: []
        },
        {
          name: 'todo',
          tasks: []
        },
        {
          name: 'doing',
          tasks: []
        },
        {
          name: 'done',
          tasks: []
        }
      ]
    }
  },
  components: {
    TaskContainer, AddTask
  },
  methods: {
    fetchTasks () {
      db.collection('tasks')
        .onSnapshot((querySnapshot) => {
          this.categories.forEach(category => {
            category.tasks = []
          })
          querySnapshot.forEach((doc) => {
            let index = this.categories.findIndex(category => category.name === doc.data().status)
            const payload = { id: doc.id, ...doc.data() }
            this.categories[index].tasks.push(payload)
          })
        })
    }
  },
  created () {
    this.fetchTasks()
  }
}
</script>
