<template>
    <div>
      <b-card :header-bg-variant="board.header" :header="board.status" class="text-center" style="font-weight:bold; color:white;">
        <Card v-for="task in board.tasks" :key="task.id" :task="task"></Card>
      </b-card>
    </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Board',
  data () {
    return {
      //
    }
  },
  props: {
    board: {
      type: Object
    }
  },
  components: {
    Card
  }
}
</script>

<style>

</style>
