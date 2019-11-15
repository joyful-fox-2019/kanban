<template>
   <div class="d-flex flex-column w-25 mx-3">
      <boardTitle  :cardColor="cardColor" :title="title" />
      <div class="board-container">
          <draggable class="list-group" :list="tasks" group="people" @change="log">
            <task v-for="(task, index) in tasks" :key="index" :task="task" :cardColor="cardColor"/>
         </draggable>
      </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import boardTitle from '../components/board-title.vue'
import task from '@/components/task.vue'
import db from '@/config/fireStore.js'

export default {
  name: 'board',
  components: {
    boardTitle,
    task,
    draggable
  },
  data () {
    return {
      tasks: []
    }
  },
  props: ['title', 'cardColor'],
  methods: {
    getTask () {
      db.collection('task').where('status', '==', this.title)
        .onSnapshot(doc => {
          let result = []
          doc.docs.forEach(el => {
            let task = {
              id: el.id,
              title: el.data().title,
              description: el.data().description,
              status: el.data().status
            }
            result.push(task)
          })
          this.tasks = result
        })
    },
    log: function (evt) {
      window.console.log(evt)
    }
  },
  created () {
    this.getTask()
  },
  watch: {
    tasks: function () {
      this.tasks.forEach(task => {
        if (task.status !== this.title) {
          db.collection('task')
            .doc(task.id)
            .update({
              status: this.title
            })
            .then(() => {
              console.log('success update')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }

}
</script>

<style>

.board-container {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 15px;
    min-height: 100px;
}

</style>
