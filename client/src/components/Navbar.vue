<template>
  <div>
    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="">Add Task</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
               <form id="addTask">
                   <input v-model="title" class="form-control" type="text" id="addTitle" placeholder="Title">
                   <br>
                    <input v-model="description" class="form-control" type="text" id="addDescription" placeholder="Description">
                   <br>
                   <input v-model="point"  class="form-control" type="text" id="addPoint" placeholder="Point">
                   <br>
                   <input v-model="assigned"  class="form-control" type="text" id="addAssigned" placeholder="Assigned To">
                   <br>
                   <input class="btn btn-primary" @click.prevent="addTask" type="submit" value="Add" data-dismiss="modal">
               </form>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
     </div>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand mr-auto" href="#">KANBAN</a>
      <button class="btn btn-light" data-toggle="modal" data-target="#modalAdd" > ADD TASK </button>
    </nav>
  </div>
</template>

<script>
import db from '../../config/firestore'
export default {
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assigned: ''
    }
  },
  methods: {
    addTask () {
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assigned: this.assigned,
        status: 'backLog'

      })
        .then(doc => {
          this.title = ''
          this.description = ''
          this.point = ''
          this.assigned = ''
          console.log('Document written with ID: ', doc.id)
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style>

</style>
