<template>
    <div>
      <!-- MODAL -->
      <div class="modal fade" :id="taskItem.id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="">Add Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <form id="detailTask">
                    <p>Title : {{taskItem.title}}</p>
                    <br>
                     <p>Description : {{taskItem.description}}</p>
                    <br>
                    <p>point: {{taskItem.point}}</p>
                    <br>
                    <p>assigned to:{{taskItem.assigned}} </p>
                    <br>
                    <div class="justify-content-between">
                     <button id="backLogButton" v-if="taskItem.status != 'backLog'" @click.prevent="changeBackLog" class="btn btn-danger mx-2" type="submit" data-dismiss="modal">Change backLog</button>
                     <button id="toDoButton" v-if="taskItem.status != 'toDo'" @click.prevent="changeToDo" class="btn btn-warning mx-2" style="backgroundColor:orange" type="submit" data-dismiss="modal">Change toDo</button>
                     <button id="doingButton" v-if="taskItem.status != 'doing'" @click.prevent="changeDoing" class="btn btn-warning mx-2" style="backgroundColor:yellow" type="submit" data-dismiss="modal">Change doing</button>
                     <button id="doneButton" v-if="taskItem.status != 'done'" @click.prevent="changeDone" class="btn btn-success mx-2" style="backgroundColor:green" type="submit" data-dismiss="modal">Change done</button>
                    </div>
                    <button @click.prevent="deleteTask" class="btn btn-danger my-2" type="submit" data-dismiss="modal" value="delete">Delete</button>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pt-5 d-flex justify-content-around">
          <CategoryComponent
          v-for="(category,index) in categories" :key="index"
          :all="category"
          :category="category.title"
          :dataParent="category.data"
          :warna="category.style"
          @taskDetail="taskDetail"
          />
      </div>
    </div>
</template>

<script>
import CategoryComponent from '../components/CategoryComponent'
import db from '../../config/firestore'
export default {
  data () {
    return {
      tasks: [],
      taskItem : '',
      categories: [
        { title: 'Back-Log', data: [], style: 'red' },
        { title: 'ToDo', data: [], style: 'orange' },
        { title: 'Doing', data: [], style: 'yellow' },
        { title: 'Done', data: [], style: 'green' }
      ]
    }
  },
  components: {
    CategoryComponent
  },
  methods: {
    fetchData () {
      db.collection('tasks')
        .onSnapshot(doc => {
          this.tasks = []
          doc.forEach(task => {
            let id = task.id
            let allData = task.data()
            allData.id = id
            this.tasks.unshift(allData)
            this.backLogMethod()
            this.toDoMethod()
            this.doingMethod()
            this.doneMethod()
          })
        })
    },
    backLogMethod () {
      const backLog = []
      this.tasks.forEach(task => {
        if (task.status === 'backLog') {
          backLog.push(task)
        }
      })
      this.categories[0].data = backLog
    },
    toDoMethod () {
      const toDo = []
      this.tasks.forEach(task => {
        if (task.status === 'toDo') {
          toDo.push(task)
        }
      })
      this.categories[1].data = toDo
    },
    doingMethod () {
      const doing = []
      this.tasks.forEach(task => {
        if (task.status === 'doing') {
          doing.push(task)
        }
      })
      this.categories[2].data = doing
    },
    doneMethod () {
      const done = []
      this.tasks.forEach(task => {
        if (task.status === 'done') {
          done.push(task)
        }
      })
      this.categories[3].data = done
    },
    deleteTask () {
      db.collection('tasks').doc(`${this.taskItem.id}`).delete().then(_ => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    changeBackLog () {
      db.collection('tasks').doc(`${this.taskItem.id}`)
        .update({
          status: 'backLog'
        })
    },
    changeToDo () {
      db.collection('tasks').doc(`${this.taskItem.id}`)
        .update({
          status: 'toDo'
        })
    },
    changeDoing () {
      db.collection('tasks').doc(`${this.taskItem.id}`)
        .update({
          status: 'doing'
        })
    },
    changeDone () {
      db.collection('tasks').doc(`${this.taskItem.id}`)
        .update({
          status: 'done'
        })
    },
    taskDetail(payload){
      this.taskItem = payload
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
