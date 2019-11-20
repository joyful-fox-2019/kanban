<template>
  <div class="d-flex justify-content-center flex-wrap">
      <b-col sm="8" md="4">
          <div id="ToDo" class="ml-1 mt-1">
          <b-card>
            <h1 style="align-text: center;">ToDo</h1>
              <task-detail :arrAll='arrAll' :status='statusToDo'></task-detail>
          </b-card>
      </div>
      </b-col>
      <b-col sm="8" md="4">
        <div id="OnProgress" class="ml-1 mt-1">
           <b-card>
             <h1 style="align-text: center;">OnProgress</h1>
              <task-detail :arrAll='arrAll' :status='statusOnProgress'></task-detail>
          </b-card>
        </div>
      </b-col>
      <b-col sm="8" md="4">
        <div id="Done" class="ml-1 mt-1">
          <b-card>
            <h1 style="align-text: center;">Done</h1>
              <task-detail :arrAll='arrAll' :status='statusDone'></task-detail>
          </b-card>
        </div>
      </b-col>

  </div>
</template>

<script>
import db from '../config/firestore'
import TaskDetail from './TaskDetail'
export default {
  components: {
    TaskDetail
  },
  data: () => {
    return {
      arrAll: [],
      statusToDo: 'ToDo',
      statusOnProgress: 'OnProgress',
      statusDone: 'Done'
    }
  },
  created () {
    db.collection('lists').onSnapshot(querySnapshot => {
      this.arrAll = []
      querySnapshot.forEach(doc => {
        let id = doc.id
        let temp = doc.data()
        this.arrAll.unshift({
          id,
          title: temp.title,
          description: temp.description,
          assigned: temp.assigned,
          status: temp.status,
          point: temp.point
        })
      })
    })
  }
}
</script>

<style>
.btn {
    margin: 5px;
    padding: 10px;
}
#ToDo {
  background-color: rgba(247, 20, 20, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#ToDoHead {
  background-color:  rgba(236, 197, 197, 0.89) ;
  margin: 10px;
  padding: 10px;
}
#OnProgress{
  background-color: rgba(228, 224, 15, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#OnProgressHead {
  background-color:  rgba(219, 223, 172, 0.89) ;
  margin: 10px;
  padding: 10px;
}
#Done{
  background-color: rgba(82, 228, 15, 0.89) ;
  margin: 10px;
  padding: 5px;
}
#DoneHead {
  background-color:  rgba(201, 223, 172, 0.89) ;
  margin: 10px;
  padding: 10px;
}
</style>
