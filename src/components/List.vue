<template>
  <b-card
    no-body
    :header="header"
    :header-bg-variant="variant"
    header-text-variant="light"
    header-tag="header"
    header-class="text-center"
  >
    <draggable :list="list" :sortable="false" group="kanban">
      <Card
        v-for="task in list" :key="task.id" :task="task"
      />
    </draggable>
  </b-card>
</template>

<script>
import Card from '@/components/Card'
import draggable from 'vuedraggable'

export default {
  name: 'List',
  components: {
    Card,
    draggable
  },
  props: {
    header: String,
    variant: String,
    list: Array
  }
}
</script>

<style>
</style>
