<template>
  <div class="home">
    <ParentCard></ParentCard>
  </div>
</template>

<script>
// @ is an alias to /src
import ParentCard from '@/components/parentCard.vue'

export default {
  name: 'home',
  components: {
    ParentCard
  }
}
</script>
