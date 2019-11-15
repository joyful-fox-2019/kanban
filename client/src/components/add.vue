<template>
  <div class="modal fade" id="addFrom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Add New Task</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <input  v-model="title" type="text" id="defaultForm-email" class="form-control validate">
                <label data-error="wrong" data-success="right" for="defaultForm-email">Title</label>
              </div>

              <div class="md-form mb-4">
                <textarea v-model="description" style="border: none; border-bottom: 1px solid grey " type="text" id="defaultForm-pass" class="form-control validate" cols="20" rows="5"></textarea>
                <label class="" data-error="wrong" data-success="right" for="defaultForm-pass">Description</label>
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button @click.prevent="createTask" class="btn btn-primary w-75" data-dismiss="modal" aria-label="Close">Add</button>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
import db from '@/config/fireStore.js'

export default {
  name: 'add',
  data () {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    createTask () {
      db.collection('task').add({
        title: this.title,
        description: this.description,
        status: 'Back-log'
      })
        .then(docRef => {
          this.title = ''
          this.description = ''
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style>

</style>
