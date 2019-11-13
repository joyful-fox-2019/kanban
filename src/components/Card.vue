<template>
    <div style="color:black; text-align:left; margin-bottom:10px;">
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h6 class="mb-0" style="width:100%; display:flex; justify-content:space-between;">
            <div>{{ task.title }}</div>
            <div @click="remove(task.id)"><i class="fas fa-times-circle" style="cursor:pointer;"></i></div>
          </h6>
        </template>
        <b-card-text style="margin-bottom:-10px;">
          {{ task.description }}
          <p><small>
            Point : {{ task.point }} <br/>
            Assigned to : {{ task.assigned }}
          </small></p>
        </b-card-text>
        <template v-slot:footer>
          <h6 class="mb-0" style="width:100%; display:flex; justify-content:space-between;">
            <div @click="back(task.id)" v-if="task.status !== 'Back-Log'"><i class="fas fa-arrow-left" style="cursor:pointer;"></i></div>
            <div v-if="task.status === 'Back-Log'"></div>
            <div @click="next(task.id)" v-if="task.status !== 'Done'"><i class="fas fa-arrow-right" style="cursor:pointer;"></i></div>
          </h6>
        </template>
      </b-card>
    </div>
</template>

<script>
import db from '../config/firebase'
import Swal from 'sweetalert2'

export default {
  name: 'Card',
  data () {
    return {
      //
    }
  },
  props: {
    task: {
      type: Object
    }
  },
  methods: {
    remove (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          db.collection('tasks').doc(id).delete()
          .then(function() {
              console.log("Document successfully deleted!");
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
          })
          .catch(function(error) {
              console.error("Error removing document: ", error);
          });
        }
      })
    },
    next (id) {
      switch (this.task.status) {
        case 'Back-Log':
          db.collection('tasks').doc(id).update({ status: 'To-Do' })
          break
        case 'To-Do':
          db.collection('tasks').doc(id).update({ status: 'Doing' })
          break
        case 'Doing':
          db.collection('tasks').doc(id).update({ status: 'Done' })
          break
      }
    },
    back (id) {
      switch (this.task.status) {
        case 'To-Do':
          db.collection('tasks').doc(id).update({ status: 'Back-Log' })
          break
        case 'Doing':
          db.collection('tasks').doc(id).update({ status: 'To-Do' })
          break
        case 'Done':
          db.collection('tasks').doc(id).update({ status: 'Doing' })
          break
      }
    }
  }
}
</script>

<style>

</style>
