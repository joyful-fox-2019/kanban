<template>
  <div class="container">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 shadow-sm">
        <div :style="{backgroundColor:warna}" class="card-header">
          <h4 class="my-0 font-weight-normal">{{category}}</h4>
        </div>
          <TaskComponent
          v-for="taskItem in dataParent" :key="taskItem.id"
          :taskItem="taskItem"
          @taskDetail="taskDetail"
          />
      </div>
    </div>
  </div>
</template>

<script>
import TaskComponent from '../components/TaskComponent'
export default {
  props: ['all', 'category', 'dataParent', 'warna'],
  components: {
    TaskComponent
  },
  methods :{
    taskDetail(payload){
      this.$emit('taskDetail', payload)
    }
  }
}
</script>

<style>

</style>
