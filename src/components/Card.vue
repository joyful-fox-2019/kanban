<template>
  <b-card
    :header="cardHeader"
    header-text-variant="white"
    header-tag="header"
    :header-bg-variant="cardColor"
    style="max-width: 20rem;"
  >
    <b-card-text>
        <Item v-if="tasks.length>0" @fetchAgain="fetchAgain" :tasks="tasks" :message="message" />
    </b-card-text>
  </b-card>
</template>

<script>
import Item from '@/components/Item.vue'

export default {
  name: 'Card',
  components: {
    Item
  },
  props: {
    cardColor: String,
    cardHeader: String,
    tasks: Array,
    message: String
  },
  methods: {
    fetchAgain () {
      this.$emit('fetchAgain')
    }
  }
}
</script>

<style>
</style>
