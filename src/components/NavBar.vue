<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
            <img src="../assets/banner.png" alt="logo" style="width:100px; margin:-10px">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto"><br/>
            <b-button v-b-modal.modal-1 size="sm" class="my-2 my-sm-0 mr-3">
                <i class="fas fa-tasks" style="margin-right:5px;"></i>
                New Task
            </b-button><br/>
            <b-button @click="logout" size="sm">Logout</b-button>
            </b-navbar-nav>
        </b-collapse>
        </b-navbar>
        <b-modal id="modal-1" ref="modal-1" title="Add New Task" ok-only ok-variant="secondary" ok-title="Close" hide-header-close>
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
                <b-form-group id="input-group-1" label="Title : " label-for="input-1">
                    <b-form-input id="input-1" v-model="title" required placeholder="Task title"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Description : " label-for="input-2">
                    <b-form-input id="input-2" v-model="description" required placeholder="Task description"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" label="Point : " label-for="input-3">
                    <b-form-input id="input-3" v-model="point" type="number" min="0" max="100" required placeholder="Task point"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4" label="Assigned To : " label-for="input-4">
                    <b-form-input id="input-4" v-model="assigned" required placeholder="Assignee"></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" style="margin-right:10px;" id="">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'
import db from '../config/db'

export default {
  name: 'NavBar',
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assigned: '',
      show: true
    }
  },
  methods: {
    onSubmit () {
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assigned: this.assigned,
        status: 'Back-Log'
      })
        .then((docRef) => {
          this.onReset()
          this.hideModal()
        //   console.log(docRef)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onReset () {
      this.title = ''
      this.description = ''
      this.point = ''
      this.assigned = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    hideModal () {
      this.$refs['modal-1'].hide()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }
}
</script>

<style>

</style>
