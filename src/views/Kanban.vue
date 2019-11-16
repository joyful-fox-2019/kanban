<template>
  <div>
    <Navbar class="mb-4" @dataFromForm="addData"/>
    <p class="text-center">This application is realtime and has a drag and drop feature!</p>
    <b-container fluid class="">
      <b-row>
        <CardPlace
          v-for="dataX in masterData"
          :key="dataX.id"
          :dataArray="dataX.data"
          :variant="dataX.variant"
          :header="dataX.title">
          <Card v-for="(data,index) in dataX.data" :key="index" :data="data"></Card>
        </CardPlace>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardPlace from '@/components/CardPlace.vue'
import Card from '@/components/Card.vue'
import Navbar from '@/components/Navbar.vue'
import Swal from 'sweetalert2'

import db from '../api/firebase'
const task = db.collection('backlog')

export default {
  name: 'kanban',
  components: {
    Navbar,
    Card,
    CardPlace
  },
  data () {
    return {
      masterData: {
        list1: {
          data: [],
          variant: 'danger',
          title: 'Back-Log',
          id: 1
        },
        list2: {
          data: [],
          variant: 'warning',
          title: 'To-Do',
          id: 2
        },
        list3: {
          data: [],
          variant: 'primary',
          title: 'Doing',
          id: 3
        },
        list4: {
          data: [],
          variant: 'success',
          title: 'Done',
          id: 4
        }
      }
    }
  },
  methods: {
    addData (title, description, status) {
      task.add({ title, description, status, createdAt: new Date() })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    deleteData (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          task.doc(`${id}`).delete().then(function () {
            console.log('Document successfully deleted!')
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(function (error) {
            console.error('Error removing document: ', error)
            Swal.fire(
              'Awww!',
              'Somethin wrong. Please try again later.',
              'error'
            )
          })
        }
      })
    },
    fetchData () {
      Swal.showLoading()
      task.onSnapshot((doc) => {
        this.masterData.list1.data = []
        this.masterData.list2.data = []
        this.masterData.list3.data = []
        this.masterData.list4.data = []
        doc.docs.forEach(el => {
          let id = el.id
          let data = el.data()
          data.id = id
          if (el.data().status === 'backlog') {
            this.masterData.list1.data.push(data)
          } else if (el.data().status === 'todo') {
            this.masterData.list2.data.push(data)
          } else if (el.data().status === 'doing') {
            this.masterData.list3.data.push(data)
          } else if (el.data().status === 'done') {
            this.masterData.list4.data.push(data)
          }
          Swal.close()
        })
      })
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    'masterData.list1.data' () {
      for (let i = 0; i < this.masterData.list1.data.length; i++) {
        if (this.masterData.list1.data[i].status !== 'backlog') {
          task.doc(`${this.masterData.list1.data[i].id}`).update({
            status: 'backlog'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    'masterData.list2.data' () {
      for (let i = 0; i < this.masterData.list2.data.length; i++) {
        if (this.masterData.list2.data[i].status !== 'todo') {
          task.doc(`${this.masterData.list2.data[i].id}`).update({
            status: 'todo'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    'masterData.list3.data' () {
      for (let i = 0; i < this.masterData.list3.data.length; i++) {
        if (this.masterData.list3.data[i].status !== 'doing') {
          task.doc(`${this.masterData.list3.data[i].id}`).update({
            status: 'doing'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    },
    'masterData.list4.data' () {
      for (let i = 0; i < this.masterData.list4.data.length; i++) {
        if (this.masterData.list4.data[i].status !== 'done') {
          task.doc(`${this.masterData.list4.data[i].id}`).update({
            status: 'done'
          })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
      }
    }
  }
}
</script>

<style  scoped>

</style>
