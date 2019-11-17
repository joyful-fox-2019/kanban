<template>
  <b-card class="text-wrap">
    <b-card-title class="mb-0">
      <i class="fas fa-paperclip"></i>&nbsp; &nbsp;
      <strong>{{taskTitle}}</strong>
    </b-card-title>
    <b-card-text class="mb-0">{{taskAssigned}}</b-card-text>
    <b-card-text class="mb-0">{{taskCreated}}</b-card-text>
    <div class="d-flex justify-content-end">
      <b-button variant="btn-block" @click.prevent="remove(task.id)">
        <i class="fas fa-trash-alt"></i>
      </b-button>
    </div>
  </b-card>
</template>

<script>
import Swal from 'sweetalert2'
import db from '@/configs/firebase'

export default {
  name: 'Card',
  props: {
    task: Object
  },
  methods: {
    remove (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          db.collection('tasks')
            .doc(id)
            .delete()
            .then(result => {
              console.log(result)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },
  computed: {
    taskTitle () {
      return this.task.title
    },
    taskAssigned () {
      return `Assigned: ${this.task.assigned_to}`
    },
    taskCreated () {
      return `Created: ${this.task.created_at}`
    },
    taskId () {
      return this.task.id
    }
  }
}
</script>

<style>
</style>
