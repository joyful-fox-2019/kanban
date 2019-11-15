<template>

    <div class="task" :style="`background-color: rgba(${cardColor}, 0.65);`">
        <div class="d-flex justify-content-between mx-2">
          <i @click.prevent="deleteTask" class="mt-1 fas fa-minus-circle delete-btn"></i>
          <a class="text-white" href="" data-toggle="modal" :data-target="'#'+task.id"><i class="fas fa-pencil-alt"></i></a>
        </div>
        <edit :task="task"/>
      <div class="m-2">
        <h5 class="text-white">{{ task.title }}</h5>
      </div>
      <div class="p-3">
        <p class="desc">{{ task.description }}</p>
      </div>
    </div>

</template>

<script>
import db from '@/config/fireStore.js'
import edit from '@/components/edit.vue'
import Swal from 'sweetalert2'

export default {
  name: 'task',
  components: {
    edit
  },
  props: ['task', 'cardColor'],
  methods: {
    deleteTask () {
      Swal.fire({
        title: 'Delete this?',
        showCancelButton: true,
        confirmButtonColor: '#52D378',
        cancelButtonColor: '#ff005c',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          Swal.showLoading()
          db.collection('task')
            .doc(this.task.id)
            .delete()
            .then(() => {})
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style>
.task{
  min-height: 100px;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  cursor: -webkit-grab; 
  cursor: grab;
}

.desc{
  font-size: 12px;
  text-align: left;
  word-wrap: break-word;
}

.delete-btn{
  font-size: 11px;
  text-align: right;
  color: rgb(44, 44, 44);
  transition: 200ms;
}

.delete-btn:hover{
  color: white;
  cursor: pointer;
}

</style>
