<template>
  <div class="container">
      <link href="https://fonts.googleapis.com/css?family=Cabin&display=swap" rel="stylesheet">
      <div class="row">
          <div class="col-sm-12">
                <!-- card template -->
                <div class="card">
                    <div class="card-header text-white" :style="`background-color:${color}; font-family: 'Cabin', sans-serif;`">{{title}}</div>
                    <div class="card-body">
                        <todoItem :todoItems="tododata" @find-todo="findTodo"></todoItem>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import todoItem from '../components/todoItem'

export default {
  methods : {
    findTodo(id) {
      console.log('masuk parent 1' , id)
      this.$emit("find-todo-home",id)
    }
  },
  components: {
    todoItem
  },
  data () {
    return {
    }
  },
  created () {
  },

  props: ['title', 'color', 'tododata']
}
</script>

<style>
 .card-body {
    padding: 0.2rem !important
}
.col-sm-12 {
    padding: 0 rem !important
}
</style>
