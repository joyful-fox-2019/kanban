<template>
  <div>
    <div class="ml-5 mr-5">
      <b-row class="mr-10 ml-10">
        <BoardCard v-for="(detail, index) in details" :key="index" :detail="detail"></BoardCard>
      </b-row>
    </div>
  </div>
</template>

<script>
import BoardCard from "./BoardCard";

export default {
  name: "MainCard",
  components: {
    BoardCard
  },
  data() {
    return {
      details: {
        todo: {
          variant: "danger",
          status: "todo",
          header: "TO-DO"
        },
        doing: {
          variant: "warning",
          status: "doing",
          header: "Doing"
        },
        done: {
          variant: "primary",
          status: "done",
          header: "Done"
        }
      }
    };
  }
};
</script>
