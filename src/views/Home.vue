<template>
  <div>
    <NavBar></NavBar>
    <div style="display:flex;">
      <Board v-for="(board, i) in boards" :key="i" :board="board" class="w-25 p-3"></Board>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Board from '../components/Board'
import db from '../config/db'

export default {
  name: 'Home',
  data () {
    return {
      boards: [
        {
          status: 'Back-Log',
          header: 'danger',
          tasks: []
        },
        {
          status: 'To-Do',
          header: 'warning',
          tasks: []
        },
        {
          status: 'Doing',
          header: 'primary',
          tasks: []
        },
        {
          status: 'Done',
          header: 'success',
          tasks: []
        }]
    }
  },
  components: {
    NavBar,
    Board
  },
  created () {
    db.collection('tasks').onSnapshot((querySnapshot) => {
      // Reset tasks in each boards
      this.boards.forEach((el) => {
        el.tasks = []
      })
      // Generate each task and grouping them by status
      querySnapshot.forEach((doc) => {
        let task = {
          id: doc.id,
          ...doc.data()
        }
        this.boards.forEach((el) => {
          if (el.status === doc.data().status) {
            el.tasks.push(task)
          }
        })
      })
    })
  }
}
</script>
