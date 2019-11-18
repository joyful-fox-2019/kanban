<template>
  <div class="card-column" style="display:flex; flex-direction:column;">
    <h2> {{ data.name }} </h2>
    <Task v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name" @getData="getData"></Task>
  </div>
</template>

<script>
import Task from '../components/Task.vue'
export default {
  props: {
    data: Object
  },
  methods: {
    getData () {
      this.$emit('getData')
    }
  },
  name: 'TaskList',
  components: {
    Task
  },
  created () {
  }
}
</script>

<style>
</style>
