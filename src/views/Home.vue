<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <Navbar />
    <b-container fluid>
      <b-row>
        <b-col md="3" v-for="(item, index) in kanban" :key="index">
          <List :header="item.header" :variant="item.variant" :list="item.list" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import List from "@/components/List.vue";
import db from "@/configs/firebase";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading,
    Navbar,
    List
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      kanbanStatus: ["backlog", "todo", "progress", "done"],
      kanban: [
        {
          header: "Backlog",
          variant: "warning",
          list: []
        },
        {
          header: "To-Do",
          variant: "info",
          list: []
        },
        {
          header: "In Progress",
          variant: "secondary",
          list: []
        },
        {
          header: "Done",
          variant: "success",
          list: []
        }
      ]
    };
  },
  methods: {
    getTasks() {
      db.collection("tasks").onSnapshot(snapshot => {
        for (let i = 0; i < this.kanban.length; i++) {
          this.kanban[i].list = [];
        }
        snapshot.forEach(doc => {
          let task = { id: doc.id, ...doc.data() };
          for (let i = 0; i < this.kanbanStatus.length; i++) {
            if (task.status === this.kanbanStatus[i]) {
              this.kanban[i].list.push(task);
            }
          }
        });
      });
    }
  },
  created() {
    this.isLoading = true;
    this.getTasks();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  watch: {
    kanban: {
      deep: true,
      handler() {
        for (let i = 0; i < this.kanbanStatus.length; i++) {
          for (let j = 0; j < this.kanban[i].list.length; j++) {
            if (this.kanban[i].list[j].status !== this.kanbanStatus[i]) {
              db.collection("tasks")
                .doc(this.kanban[i].list[j].id)
                .update({
                  status: this.kanbanStatus[i]
                })
                .then(result => {
                  this.getTasks();
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
