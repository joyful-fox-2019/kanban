<template>
    <div >

    <!-- CARDS -->
      <div  class="card-body">
        <h3  class="card-title pricing-card-title"> <strong> {{taskItem.title}} </strong> </h3>
          <p>point : {{taskItem.point}}</p>
          <p>assigned to : {{taskItem.assigned}}</p>
        <button
        @click.prevent="setDetail(taskItem.id, taskItem.title, taskItem.description, taskItem.point, taskItem.assigned, taskItem.status)"
        type="button" class="btn btn-lg btn-block btn-outline-primary"
        data-toggle="modal" :data-target="`#${taskItem.id}`" >Show Detail
        </button>
      </div>

    </div>
</template>

<script>
import db from '../../config/firestore'
export default {
  props: ['taskItem'],
  data () {
    return {

    }
  },
  methods: {
    setDetail (id, title, description, point, assigned, status) {
      let payload = {
        id,
        title,
        description,
        point,
        assigned,
        status
      }
      this.$emit('taskDetail', payload)
    },
  }
}
</script>

<style>

</style>
