<template>
    <div class="col-sm-12 py-2">
        <!-- card template -->
        <div class="card" v-for="todo in todoItems" :key="todo.id">
            <div class="card-header text-white" :style="`background-color:${'#'+(Math.random()*0xFFFFFF<<0).toString(16)}; font-family: 'Cabin', sans-serif;`">{{todo.title}}</div>
            <div class="card-body">
                <p class="card-text">Point : {{todo.point}}</p>
                <p class="card-text">Assign to : {{todo.assign_to}}</p>
                <a class="btn btn-outline-danger btn-block" @click.prevent="findTodo(todo.id)" v-b-modal.modal-1>Detail</a>
                <div class="d-flex flex-row justify-content-between pt-1">
                    <a class="btn" @click.prevent="back(todo.id)" :key="todo.id" ><i class="fa fa-backward"></i></a>
                    <a href="" class="btn" @click.prevent="deleteTodo(todo.id)" ><i class="fa fa-trash-o"></i></a>
                    <a class="btn" @click.prevent="next(todo.id)"><i class="fa fa-forward"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../config/firebase.js'
import Swal from 'sweetalert2'
import detail from '../components/detail'

export default {
  data() {
      return {
        //   todo : {}
      }
  },
  components : {
      detail
  },
  props: ['todoItems'],
  created () {
  },
  methods : {
    findTodo(id) {
        console.log('masuk', id)
        this.$emit('find-todo',id)        
    },  
    next(id) {
        let todo = db.collection('tasks').doc(`${id}`);
        todo.get()
            .then((doc) => {
                switch(doc.data().status) {
                    case 'back-log' :
                        todo.update({status : 'todo'});
                        break
                    case 'todo' :
                        todo.update({status : 'doing'})
                        break
                    case 'doing':
                        todo.update({status : 'done'})   
                        break;
                    case 'done' :
                        Swal.fire({
                            title: 'Opps ....',
                            text: 'You already at the edge',
                            icon: 'warning',                            
                            })
                        break;            
                }
                
            })        
      },
      back(id) {
          let todo = db.collection('tasks').doc(`${id}`);
          todo.get()
            .then((doc) => {
                switch(doc.data().status) {
                    case 'todo' :
                        todo.update({status : 'back-log'});
                        break
                    case 'doing' :
                        todo.update({status : 'todo'})
                        break
                    case 'done':
                        todo.update({status : 'doing'})
                        break;
                    case 'back-log' :
                        Swal.fire({
                            title: 'Opps ....',
                            text: 'You already at the edge',
                            icon: 'warning',                            
                            })
                        break; 

                }
                
            })  
      },
      deleteTodo(id) {
            Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this todo!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
            }).then((result) => {
            if (result.value) {
                db.collection('tasks').doc(id).delete()
                Swal.fire(
                'Deleted!',
                'Your todo has been deleted.',
                'success'
                )            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelled',
                'Your todo is safe :)',
                'error'
                )
            }
        })
      }
  }
}
</script>

<style scoped>
.card-body {
    padding: 0.2rem !important
}
.card-text, p {
    margin-bottom: 0 rem !important
}

a:hover {
    background-color: crimson
}
</style>
