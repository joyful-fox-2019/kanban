<template>
  <b-col md="4">
    <b-card
      class="boardCard"
      :border-variant="detail.variant"
      :header="detail.header"
      :header-bg-variant="detail.variant"
      header-text-variant="white"
    >
      <div>
        <SubCard :tasks="tasks" :status="detail.status"></SubCard>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import db from "../../config/firestore.js";
import SubCard from "./SubCard.vue";

export default {
  name: "BoardCard",
  props: ["detail"],
  components: {
    SubCard
  },
  data() {
    return {
      tasks: {
        todo: [],
        doing: [],
        done: []
      }
    };
  },
  methods: {
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    }
  },
  created() {
    db.collection("Task").onSnapshot(querySnapshot => {
      this.tasks = {
        todo: [],
        doing: [],
        done: []
      };
      let task = {};
      querySnapshot.forEach(doc => {
        task = doc.data();
        task.id = doc.id;
        if (task.status === "todo") {
          this.tasks.todo.push(task);
          task = {};
        } else if (task.status === "doing") {
          this.tasks.doing.push(task);
          task = {};
        } else if (task.status === "done") {
          this.tasks.done.push(task);
          task = {};
        }
      });
    });
  }
};
</script>
<style scoped>
.boardCard {
  min-height: 400px;
}
</style>