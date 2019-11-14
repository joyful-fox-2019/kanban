<template>
  <div class="container">
      <div class="row">
          <div class="col-sm-3">
              <todolist title='Back-log' color='red' :tododata="backlog" @find-todo-home="findTodo"></todolist>
          </div>
          <div class="col-sm-3">
              <todolist title='Todo' color='orange' :tododata="todo" @find-todo-home="findTodo"></todolist>
          </div>
          <div class="col-sm-3">
              <todolist title='Doing' color='blue' :tododata="doing" @find-todo-home="findTodo"></todolist>
          </div>
          <div class="col-sm-3">
              <todolist title='Done' color='green' :tododata="done" @find-todo-home="findTodo"></todolist>
          </div>
      </div>
    <detail :todo="todoItem"></detail>
  </div>
</template>

<script>
import todolist from '../components/todolist'
import db from '../config/firebase.js'
import detail from '../components/detail'

export default {
  components: {
    todolist,
    detail,
  },
  data () {
    return {
      backlog: [],
      todo : [],
      doing : [],
      done : [],
      dataCollected: false, 
      todoItem : {}     
    }
  },
  methods : {
    findTodo(id) {
      let todo = db.collection('tasks').doc(`${id}`);
        todo.get()
            .then((doc) => {
                this.todoItem = {...doc.data()}
        })
    }
  },
  created () {
    db.collection('tasks').onSnapshot((querySnapshot) => {
      this.backlog = [],
      this.todo  = [],
      this.doing = [],
      this.done = [],
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        if (doc.data().status === 'back-log') {
          this.backlog.push({ ...doc.data(), id: doc.id })  
        } else if (doc.data().status === 'todo') {
          this.todo.push({ ...doc.data(), id: doc.id })
        } else if (doc.data().status === 'doing') {
          this.doing.push({ ...doc.data(), id: doc.id })
        } else if (doc.data().status === 'done') {
          this.done.push({ ...doc.data(), id: doc.id })
        }                             
      })    
    })    
  }
}
</script>

<style scoped>

.container {
    padding : 0% !important;
}
</style>
