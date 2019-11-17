<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-container fluid class="justify-content-center">
        <b-row>
          <b-col>
            <b-button id="addTask" v-b-modal.add variant="dark">
              <b-navbar-brand>
                <i class="fas fa-clipboard-list"></i>
                 &nbsp; Add Task
              </b-navbar-brand>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>

    <!--Modal -->
    <b-modal
      id="add"
      title="Add task"
      ok-title="Create"
      ok-variant="primary"
      cancel-variant="danger"
      @ok="create"
    >
      <b-form-group label="Task Title">
        <b-form-textarea v-model="title" required placeholder="Enter Task"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Assigned To:">
        <b-form-input v-model="name" required placeholder="Enter Assignee"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import db from '../configs/firebase'

export default {
  name: 'Navbar',
  data: function () {
    return {
      title: '',
      name: ''
    }
  },
  methods: {
    create () {
      db.collection('tasks')
        .add({
          title: this.title,
          assigned_to: this.name,
          created_at: new Date().toDateString(),
          status: 'backlog'
        })
        .then(result => {
          this.title = ''
          this.name = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
