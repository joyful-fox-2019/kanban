<template>
  <div class="todo">
     <b-card
    header="To-Do"
    header-text-variant="white"
    header-tag="header"
    header-bg-variant="primary"
    style="max-width: 20rem;"
  >
   <b-card-text v-for="data in dataTodo" :key="data.id">
       <b-card
      :header="data.title"
      header-tag="header"
    >
      <b-card-text>Point : {{ data.point }}</b-card-text>
      <b-card-text>Assigned To : {{ data.assigned }}</b-card-text>
      <b-button @click="showModal(data.id)" variant="primary">Show Detail</b-button>
    </b-card>
    </b-card-text>
     <b-modal ref="my-modal" hide-footer title="Detail :">
      <div class="d-block" v-for="(detail, i) in detailData" :key="i">
        <p><span>Task Description :</span></p>
        <p>{{ detail.description}}</p>
        <p><span>Point :</span></p>
        <p>{{ detail.point }}</p>
        <p><span>Status :</span></p>
        <p>{{ detail.status }}</p>
        <div style="display: flex; justify-content: space-between;">
          <b-button @click="goBack(detail.id)" variant="dark">Back Log</b-button>
          <b-button @click="remove(detail.id)" variant="danger">Delete</b-button>
          <b-button @click="goDoing(detail.id)" variant="success">Doing</b-button>
        </div>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
  </b-card>
  </div>
</template>

<script>
import db from '../config/firebase'
import Swal from 'sweetalert2'
export default {
  name: 'Todo',
  data () {
    return {
      dataTodo: [],
      idDetail: null
    }
  },
  methods: {
    readData () {
      Swal.showLoading()
      db.collection('listtodo').where('status', '==', 'todo')
        .onSnapshot((querySnapshot) => {
          Swal.close()
          this.dataTodo = []
          querySnapshot.forEach((doc) => {
            this.dataTodo.push({ id: doc.id, ...doc.data() })
          })
        })
    },
    showModal (id) {
      this.idDetail = id
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    remove (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          db.collection('listtodo').doc(id).delete()
            .then(function () {
              console.log('Document successfully deleted!')
            }).catch(function (error) {
              console.error('Error removing document: ', error)
            })
          this.hideModal()
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    },
    goDoing (id) {
      this.hideModal()
      db.collection('listtodo').doc(id).update({
        status: 'doing'
      })
        .then(_ => {
          console.log('success pidah')
        })
        .catch(err => {
          console.log(err)
        })
    },
    goBack (id) {
      this.hideModal()
      db.collection('listtodo').doc(id).update({
        status: 'backlog'
      })
        .then(_ => {
          console.log('success pidah')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    detailData () {
      return this.dataTodo.filter(data => {
        return data.id
          .includes(this.idDetail)
      })
    }
  },
  created () {
    this.readData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo {
    margin-top: 50px;
    margin-right: 20px;
  }
</style>
