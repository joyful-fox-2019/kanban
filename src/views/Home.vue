<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <h1 class="ml-5">Kanban-app</h1>
      <button
        class="btn btn-info mr-5"
        style="width: 200px; height: 80px; font-size: 25px ;"
        data-toggle="modal"
        data-target="#newTask"
      >new task</button>
    </div>

    <div class="modal" id="newTask" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputtitle">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter title"
                  v-model="title"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputdescription">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputText"
                  placeholder="Enter Description"
                  v-model="description"
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPoint">Point</label>
                <input
                  type="number"
                  class="form-control"
                  id="point"
                  placeholder="Enter Point"
                  v-model="point"
                />
              </div>

              <div class="form-group">
                <label for="exampleInputAuthor">Author</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  placeholder="Enter Author"
                  v-model="author"
                />
              </div>

              <button type="button" class="btn btn-primary" @click="addTask">Add Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-5 mt-5">
      <Card
        nameProps="BackLog"
        classProps="card-header card-header-text card-header-danger"
        :tasks="backlog"
        @eventStatus="statusHandle"
        @deleteEvent="deleteEvent"
      ></Card>
      <Card
        nameProps="Todo"
        classProps="card-header card-header-text card-header-warning"
        :tasks="todo"
        @eventStatus="statusHandle"
        @deleteEvent="deleteEvent"
      ></Card>
      <Card
        nameProps="Doing"
        classProps="card-header card-header-text card-header-primary"
        :tasks="doing"
        @eventStatus="statusHandle"
        @deleteEvent="deleteEvent"
      ></Card>
      <Card
        nameProps="Done"
        classProps="card-header card-header-text card-header-success"
        :tasks="done"
        @eventStatus="statusHandle"
        @deleteEvent="deleteEvent"
      ></Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import db from "../config/firebase";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      objtest: "",
      title: "",
      description: "",
      point: "",
      author: ""
    };
  },
  components: {
    Card
  },
  methods: {
    // getData() {},

    addTask() {
      db.collection("Task")
        .doc(this.title)
        .set({
          title: this.title,
          description: this.description,
          point: this.point,
          author: this.author,
          status: "BackLog"
        })
        .then(() => {
          Swal.fire("Good job!", "Add Task Success", "success");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },

    statusHandle(status, id, title, description, point, author) {
      db.collection("Task")
        .doc(id)
        .set({
          title: title,
          description: description,
          point: point,
          author: author,
          status: status
        })
        .then(() => {})
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    deleteEvent(id) {
      Swal.fire({
        title: "Are you sure to Delete this task?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          return db
            .collection("Task")
            .doc(id)
            .delete()
            .then(() => {
              Swal.fire({
                title: "Success",
                text: "Task Deleted",
                icon: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  created() {
    // this.getData();

    db.collection("Task").onSnapshot(querySnapshot => {
      this.backlog = [];
      this.todo = [];
      this.doing = [];
      this.done = [];

      querySnapshot.forEach(doc => {
        let obj = {
          id: doc.id
        };
        obj.author = doc.data().author;
        obj.description = doc.data().description;
        obj.point = doc.data().point;
        obj.title = doc.data().title;
        obj.status = doc.data().status;

        if (obj.status === "BackLog") {
          this.backlog.push(obj);
        } else if (obj.status === "Todo") {
          this.todo.push(obj);
        } else if (obj.status === "Doing") {
          this.doing.push(obj);
        } else if (obj.status === "Done") {
          this.done.push(obj);
        }
      });
    });
  }
};
</script>
<style></style>
