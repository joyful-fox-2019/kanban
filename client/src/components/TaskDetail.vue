<template>
  <div>
      <b-card class="p-3 my-1 text-wrap" v-for="(item) in test" v-bind:key="item.id">
          <!-- {{item.status}} -->
        <b-card-title v-if="item.status == 'ToDo'" id="ToDoHead">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
            </svg>
            <h2>{{ item.title }}</h2>
            <br>
            <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
            <br>
            <b-card-body>Details :{{ item.description }}</b-card-body>
            <br>
            <b-card-body>Point Task :{{ item.point }}</b-card-body>
            <b-button variant="danger" class="btn" @click.prevent="removeItem(item.id)">Delete</b-button>
            <b-button variant="light" class="btn btn-default" @click.prevent="onProgress(item.id)">On Progress</b-button>
        </b-card-title>
        <b-card-title v-else-if="item.status == 'OnProgress'" id="OnProgressHead" >
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
            </svg>
            <h2>{{ item.title }}</h2>
            <br>
            <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
            <br>
            <b-card-body>Details :{{ item.description }}</b-card-body>
            <br>
            <b-card-body>Point Task :{{ item.point }}</b-card-body>
            <b-button variant="danger" @click.prevent="removeItem(item.id)">Delete</b-button>
            <b-button variant="light" class="btn btn-default" @click.prevent="ToDo(item.id)">ToDo</b-button>
            <b-button variant="light" class="btn btn-default" @click.prevent="Done(item.id)">Done</b-button>
        </b-card-title>
        <b-card-title v-else-if="item.status == 'Done'" id="DoneHead">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <image xlink:href='http://simpleicon.com/wp-content/uploads/pin.png' alt="symbol" height="40" width="40"/>
            </svg>
            <h2>{{ item.title }}</h2>
            <br>
            <b-card-body>Assigned To :{{ item.assigned}}</b-card-body>
            <br>
            <b-card-body>Details :{{ item.description }}</b-card-body>
            <br>
            <b-card-body>Point Task :{{ item.point }}</b-card-body>
            <b-button variant="danger" class="btn" @click.prevent="removeItem(item.id)">Delete</b-button>
            <b-button variant="light" class="btn btn-default" @click.prevent="onProgress(item.id)">On Progress</b-button>
        </b-card-title>
    </b-card>
  </div>
</template>

<script>
import db from '../config/firestore'
export default {
  name: 'TaskDetail',
  props: ['arrAll', 'status'],
  data () {
    return {
      arrDetails: []

    }
  },
  watch: {
    arrAll (val) {
      this.arrDetails = val
    }
  },
  computed: {
    test () {
      let arrTest = []
      for (let i = 0; i < this.arrAll.length; i++) {
        if (this.arrAll[i].status === this.status) {
          arrTest.push(this.arrAll[i])
        } else if (this.arrAll[i].status === this.status) {
          arrTest.push(this.arrAll[i])
        } else if (this.arrAll[i].status === this.status) {
          arrTest.push(this.arrAll[i])
        }
      }
      return arrTest
    }
  },
  created () {
    this.arrDetails = this.arrAll
    // this.arrDetails = this.onProgressList
  },
  methods: {
    onProgress (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'OnProgress'
        })
    },
    Done (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'Done'
        })
    },
    ToDo (id) {
      db.collection('lists').doc(id)
        .update({
          status: 'ToDo'
        })
    },
    removeItem (id) {
      db.collection('lists').doc(id)
        .delete()
    }
  }
}
</script>

<style>

</style>
