<template>
  <div class="col-md-3">
    <div class="card">
      <div :class="classProps">
        <div class="card-text">
          <h4 class="card-title">{{ nameProps }}</h4>
        </div>
      </div>
      <div class="card-body">
        <div class="card" style="width: 100%;" v-for="task in tasks" :key="task.id">
          <div class="card-body">
            <h4 class="card-title">{{ task.title }}</h4>
            <h5>
              Point: {{ task.point }}
              <br />
              Author: {{ task.author }}
            </h5>

            <a
              href="#0"
              class="card-link"
              data-toggle="modal"
              :data-target="'#' + task.id"
            >Show Detail</a>

            <div class="modal" :id="task.id" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">task detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h3>title: {{ task.title }}</h3>
                    <h3>description: {{ task.description }}</h3>
                    <h3>point: {{ task.point }}</h3>
                    <h3>author: {{ task.author }}</h3>
                  </div>
                  <div
                    class="modal-footer d-flex justify-content-around"
                    v-if="nameProps === 'BackLog'"
                  >
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      @click="deleteEvent(task.id)"
                    >Delete</button>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-dismiss="modal"
                      @click="eventStatus('Todo', task.id, task.title, task.description, task.point, task.author)"
                    >Todo</button>
                  </div>

                  <div
                    class="modal-footer d-flex justify-content-around"
                    v-if="nameProps === 'Todo'"
                  >
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-dismiss="modal"
                      @click="eventStatus('BackLog', task.id, task.title, task.description, task.point, task.author)"
                    >BackLog</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="deleteEvent(task.id)"
                    >Delete</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="eventStatus('Doing', task.id, task.title, task.description, task.point, task.author)"
                    >Doing</button>
                  </div>

                  <div
                    class="modal-footer d-flex justify-content-around"
                    v-if="nameProps === 'Doing'"
                  >
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-dismiss="modal"
                      @click="eventStatus('Todo', task.id, task.title, task.description, task.point, task.author)"
                    >Todo</button>
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                      @click="deleteEvent(task.id)"
                    >Delete</button>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-dismiss="modal"
                      @click="eventStatus('Done', task.id, task.title, task.description, task.point, task.author)"
                    >Done</button>
                  </div>

                  <div
                    class="modal-footer d-flex justify-content-around"
                    v-if="nameProps === 'Done'"
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="eventStatus('Doing', task.id, task.title, task.description, task.point, task.author)"
                    >Doing</button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="deleteEvent(task.id)"
                      data-dismiss="modal"
                    >Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nameProps", "classProps", "tasks"],
  methods: {
    eventStatus(status, id, title, description, point, author) {
      this.$emit("eventStatus", status, id, title, description, point, author);
    },
    deleteEvent(id) {
      this.$emit("deleteEvent", id);
    }
  }
};
</script>

<style></style>
