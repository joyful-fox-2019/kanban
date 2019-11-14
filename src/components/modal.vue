<template>
  <div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Todo"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="title"
          label-for="title-input"
          invalid-feedback="title is required"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="description"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="assign to"
          label-for="assignto-input"
          invalid-feedback="assignto is required"
        >
          <b-form-input
            id="assignto-input"
            v-model="assignto"
            required
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="point"
          label-for="point-input"
          invalid-feedback="point is required"
        >
          <b-form-input
            id="point-input"
            v-model="point"
            required
            type="number"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '../config/firebase.js'

export default {
  created() {
    this.title = ''
    this.description =''
    this.point = ''
    this.assignto = ''
  },
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assignto: '',
      status : 'back-log'
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assign_to: this.assignto,
        status : this.status
      })
        .then((docRef) => {     
          console.log('masuk sini') 
          this.title = ''
          this.description =''
          this.point = ''
          this.assignto = ''    
          
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
