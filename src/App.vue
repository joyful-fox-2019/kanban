<template>
  <div id="app">
    <b-container class="mb-4" fluid>
      <b-row align-h="between">
        <b-col cols="4"></b-col>
        <b-col cols="2">
          <b-button @click='$bvModal.show("addTask")' variant="info">New Task</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col>
          <Card
            @fetchAgain="fetchAgain"
            cardColor="danger"
            :tasks="backlogTasks"
            cardHeader="Back-Log"
            :message="message"
          />
        </b-col>
        <b-col>
          <Card @fetchAgain="fetchAgain" cardColor="warning" :tasks="todoTasks" cardHeader="To-Do" />
        </b-col>
        <b-col>
          <Card
            @fetchAgain="fetchAgain"
            cardColor="success"
            :tasks="doingTasks"
            cardHeader="Doing"
          />
        </b-col>
        <b-col>
          <Card @fetchAgain="fetchAgain" cardColor="info" :tasks="doneTasks" cardHeader="Done" />
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="addTask">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>New Task</h5>
      </template>

      <template v-slot:default="{}">
        <b-form-input v-model="taskTitle" placeholder="title"></b-form-input><br>
        <b-form-input v-model="taskDetail" placeholder="detail"></b-form-input><br>
        <b-form-input v-model="taskPoint" placeholder="point"></b-form-input><br>
        <b-form-input v-model="taskAssignee" placeholder="assigned to"></b-form-input><br>
      </template>

      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="secondary" @click="cancel()">Cancel</b-button>
        <b-button variant="primary" @click="addTask()">Submit</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import db from '@/configs/firebase.js'
import Card from '@/components/Card.vue'

export default {
  name: 'app',
  components: {
    Card
  },
  data () {
    return {
      message: '',
      backlogTasks: [],
      todoTasks: [],
      doingTasks: [],
      doneTasks: [],
      taskTitle: '',
      taskDetail: '',
      taskPoint: '',
      taskAssignee: ''
    }
  },
  methods: {
    addTask () {
      db.collection('tasks')
        .add({
          title: this.taskTitle,
          detail: this.taskDetail,
          point: this.taskPoint,
          assignee: this.taskAssignee,
          status: 'backlog'
        })
        .then(ref => {
          this.$bvModal.hide('addTask')
        })
    },
    clearTasks () {
      this.backlogTasks = []
      this.todoTasks = []
      this.doingTasks = []
      this.doneTasks = []
    },
    fetchTask () {
      this.clearTasks()
      db.collection('tasks')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let obj = { id: doc.id, ...doc.data() }
            switch (obj.status) {
              case 'backlog':
                this.backlogTasks.push(obj)
                break
              case 'todo':
                this.todoTasks.push(obj)
                break
              case 'doing':
                this.doingTasks.push(obj)
                break
              case 'done':
                this.doneTasks.push(obj)
                break
              default:
                break
            }
          })
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    }
  },
  created () {
    // this.fetchTask()
    db.collection('tasks')
      .onSnapshot((querySnapshot) => {
        this.clearTasks()
        querySnapshot.forEach(doc => {
          let obj = { id: doc.id, ...doc.data() }
          switch (obj.status) {
            case 'backlog':
              this.backlogTasks.push(obj)
              break
            case 'todo':
              this.todoTasks.push(obj)
              break
            case 'doing':
              this.doingTasks.push(obj)
              break
            case 'done':
              this.doneTasks.push(obj)
              break
            default:
              break
          }
        })
      })
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
