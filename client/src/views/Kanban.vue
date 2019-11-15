<template>
 <div>
   <h1 class="display-3 mt-4">Not-Kanban</h1>
    <a href="" class="btn btn-primary addBtn" data-toggle="modal" data-target="#addFrom">Add New Task </a>
    <addForm />
    <div class="d-flex mx-3">
    <board v-for="(title, index) in boardTitle" :key="index" :title="title" :cardColor="cardColor[index]"/>
  </div>
 </div>
</template>

<script>
import board from '@/components/board'
import addForm from '@/components/add'

export default {
  components: {
    board,
    addForm
  },
  data () {
    return {
      boardTitle: ['Back-log', 'Todo', 'In Progres', 'Testing', 'Done',],
      cardColor: ['252, 3, 223', '242, 244, 5', '53, 166, 222', '255, 0, 92', '53, 200, 67']
    }
  }
}
</script>

<style>

.addBtn{
  width: 200px;
  font-size: 12px;
  margin-bottom: 30px;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 0px rgba(66, 134, 244, 0.575);

}


</style>
