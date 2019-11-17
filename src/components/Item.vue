<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="mb-2">
      <b-card>
        <b-card-text>
          <b>{{task.title}}</b>
          <br />
          Point: {{task.point}}
          <br />
          Assigned to: {{task.assignee}}
        </b-card-text>
        <b-button @click="sendInfo(task); $bvModal.show(task.status)" variant="primary">Show Detail</b-button>
      </b-card>
    </div>
    <!-- MODALS BACKLOG---------------------------------------------------------------------------------->
    <b-modal v-if="tasks[0].status === 'backlog'" id="backlog">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>{{selectedTask.title}}</h5>
      </template>

      <template v-slot:default="{}">
        <p>Detail: {{selectedTask.detail}}</p>
        <p>Point: {{selectedTask.point}}</p>
        <p>Assigned to: {{selectedTask.assignee}}</p>
      </template>

      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="dark" @click="deleteTask(selectedTask, 'backlog')">Delete</b-button>
        <b-button
          variant="warning text-light"
          @click="updateTask(selectedTask, 'todo', 'backlog')"
        >Todo</b-button>
      </template>
    </b-modal>
    <!-- MODALS TODO------------------------------------------------------------------------------->
    <b-modal v-if="tasks[0].status === 'todo'" id="todo">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>{{selectedTask.title}}</h5>
      </template>

      <template v-slot:default="{}">
        <p>Detail: {{selectedTask.detail}}</p>
        <p>Point: {{selectedTask.point}}</p>
        <p>Assigned to: {{selectedTask.assignee}}</p>
      </template>

      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          variant="danger text-light"
          @click="updateTask(selectedTask, 'backlog', 'todo')"
        >Backlog</b-button>
        <b-button variant="dark" @click="deleteTask(selectedTask, 'todo')">Delete</b-button>
        <b-button
          variant="success text-light"
          @click="updateTask(selectedTask, 'doing', 'todo')"
        >Doing</b-button>
      </template>
    </b-modal>
    <!-- MODALS DOING----------------------------------------------------------------------------------->
    <b-modal v-if="tasks[0].status === 'doing'" id="doing">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>{{selectedTask.title}}</h5>
      </template>

      <template v-slot:default="{}">
        <p>Detail: {{selectedTask.detail}}</p>
        <p>Point: {{selectedTask.point}}</p>
        <p>Assigned to: {{selectedTask.assignee}}</p>
      </template>

      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          variant="warning text-light"
          @click="updateTask(selectedTask, 'todo', 'doing')"
        >Todo</b-button>
        <b-button variant="dark" @click="deleteTask(selectedTask, 'doing')">Delete</b-button>
        <b-button variant="info text-light" @click="updateTask(selectedTask, 'done', 'doing')">Done</b-button>
      </template>
    </b-modal>
    <!-- MODALS DONE----------------------------------------------------------------------------------->
    <b-modal v-if="tasks[0].status === 'done'" id="done">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>{{selectedTask.title}}</h5>
      </template>

      <template v-slot:default="{}">
        <p>Detail: {{selectedTask.detail}}</p>
        <p>Point: {{selectedTask.point}}</p>
        <p>Assigned to: {{selectedTask.assignee}}</p>
      </template>

      <template v-slot:modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
          variant="success text-light"
          @click="updateTask(selectedTask, 'doing', 'done')"
        >Doing</b-button>
        <b-button variant="dark" @click="deleteTask(selectedTask, 'done')">Delete</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import db from '@/configs/firebase.js'

export default {
  name: 'Item',
  data () {
    return {
      selectedTask: {}
    }
  },
  props: {
    tasks: Array,
    message: String
  },
  methods: {
    sendInfo (task) {
      this.selectedTask = task
    },
    deleteTask (task, currentModal) {
      db.collection('tasks')
        .doc(task.id)
        .delete()
        .then(() => {
          this.$bvModal.hide(currentModal)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateTask (task, statusUpdate, currentModal) {
      let taskRef = db.collection('tasks').doc(task.id)
      taskRef
        .update({ status: statusUpdate })
        .then(() => {
          this.$bvModal.hide(currentModal)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAgain () {
      this.$emit('fetchAgain')
    }
  },
  created () {
  }
}
</script>

<style>
</style>
