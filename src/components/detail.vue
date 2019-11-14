<template>
  <div>
      <b-modal id="modal-1" title="Kanban Details">
        <ul class="list-group list-group-flush text-center">
          <p class="my-4">Title: {{todo.title}}</p>
          <p>Description : {{todo.description}}</p>
          <p>Assign To : {{todo.assign_to}}</p>
          <p>Point : {{todo.point}}</p>
        </ul>
     </b-modal>
  </div>
</template>

<script>
export default {
  props : ['todo'],  
}
</script>

<style scoped>

p {
  padding: 0px !important;
}

</style>