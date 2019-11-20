<template>
  <v-app id="app">
    <div class="main-header d-flex">
      <h1>Kanbanify</h1>
    </div>

    <FormAddTask @add-task="addTask" />

    <div class="kanban-container row">
      <div class="col">
        <KanbanBacklog @delete-task="deleteTask" @move-task="moveTask" :backlogs="backlogs" />
      </div>
      <div class="col">
        <KanbanTodo @delete-task="deleteTask" @move-task="moveTask" :todos="todos" />
      </div>
      <div class="col">
        <KanbanDoing @delete-task="deleteTask" @move-task="moveTask" :doings="doings" />
      </div>
      <div class="col">
        <KanbanDone @delete-task="deleteTask" @move-task="moveTask" :dones="dones" />
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import FormAddTask from "./components/FormAddTask";
import KanbanBacklog from "./components/KanbanBacklog";
import KanbanTodo from "./components/KanbanTodo";
import KanbanDoing from "./components/KanbanDoing";
import KanbanDone from "./components/KanbanDone";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  name: "App",

  mounted() {
    this.getData();
  },

  data: () => ({
    backlogs: [],
    todos: [],
    doings: [],
    dones: []
  }),

  methods: {
    deleteTask: function(id) {
      db.collection("tasks")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },

    moveTask: function(payload) {
      db.collection("tasks")
        .doc(payload.taskId)
        .update({
          category: payload.category
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },

    addTask: function(payload) {
      const input = {
        category: "backlog",
        ...payload
      };
      console.log("ini input", input);

      db.collection("tasks")
        .add(input)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  },

  computed: {
    getData: function() {
      db.collection("tasks").onSnapshot(querySnapshot => {
        
        let backlogs = [], todos = [], doings = [], dones = []

        querySnapshot.forEach(task => {
          const id = task.id;
          const innerData = task.data();
          const taskData = { id, ...innerData };

          switch (taskData.category.toLowerCase()) {
            case "backlog": {
              backlogs.push(taskData);
              break;
            }
            case "todo": {
              todos.push(taskData);
              break;
            }
            case "doing": {
              doings.push(taskData);
              break;
            }
            case "done": {
              dones.push(taskData);
              break;
            }
          }
        });
        this.backlogs = backlogs
        this.todos = todos
        this.doings = doings
        this.dones = dones
      });
    }
  },

  components: {
    FormAddTask,
    KanbanBacklog,
    KanbanTodo,
    KanbanDoing,
    KanbanDone
  }
};
</script>

<style>
body {
  height: 100vh;
}

.main-header {
  background-color: white;
  padding-top: 1%;
  padding-left: 2%;
  padding-bottom: 1%;
  align-items: flex-start;
  flex-direction: column;
}

/* v-content {
  background-color: white;
} */

.kanban-container {
  padding: 10px 50px;
  background-color: white;
}

.col {
  padding: 10px 25px;
}
/* .v-application .align-center {
  align-items: none !important;
} */
</style>
