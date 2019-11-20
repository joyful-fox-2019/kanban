<template>
  <div>
    <!-----------------------------Form--------------------------->
    <div class="mt-3 form-add">
      <!-- Using value -->
      <a class="btnAdd" href="#" @click.prevent="show= !show">Create</a>
      <!-- The modal -->
      <b-modal v-model="show" ref="modalAdd" :hide-footer="true">
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Title :" label-for="input-1">
            <b-form-input
            v-model="title"
            id="input-1"
            type="text"
            required
            placeholder="Enter Title"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Description :" label-for="input-2">
            <b-form-input
            v-model="description"
            id="input-2"
            type="text"
            required
            placeholder="Enter Description"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Assignee:" label-for="input-3">
            <b-form-input
            v-model="assignee"
            id="input-3"
            type="text"
            required
            placeholder="Enter Assignee"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Point:" label-for="input-4">
            <b-form-input
            v-model="point"
            id="input-4"
            type="number"
            min="0"
            required
            placeholder="Enter Point"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-modal>
    </div>
    <!-- ==================================================================== -->

    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-card header-bg-variant="danger" text-variant="white" header="Back-Log" class="text-center parent" style="max-width: 18rem;">
            <draggable group="parentcard" :list="backLog" @start="drag=true" @end="drag=false">
              <contentCard class="children" v-for="dataLog in backLog" :key="dataLog.id" 
              :title="dataLog.title" 
              :status="dataLog.status"
              :assignee="dataLog.assignee"
              :point="dataLog.point"
              :description="dataLog.description"
              :id="dataLog.id"></contentCard>
            </draggable>
          </b-card>
        </b-col>
        <b-col>
          <b-card header-bg-variant="warning" text-variant="white" header="To-Do" class="text-center parent" style="max-width: 18rem;">
            <draggable group="parentcard" :list="toDo" @start="drag=true" @end="drag=false">
              <contentCard class="children" v-for="dataTodo in toDo" :key="dataTodo.id" 
              :title="dataTodo.title" 
              :status="dataTodo.status"
              :assignee="dataTodo.assignee"
              :point="dataTodo.point"
              :description="dataTodo.description"
              :id="dataTodo.id"></contentCard>
            </draggable>
          </b-card>
        </b-col>
        <b-col>
          <b-card header-bg-variant="primary" text-variant="white" header="Doing" class="text-center parent" style="max-width: 18rem;">
            <draggable group="parentcard" :list="doing" @start="drag=true" @end="drag=false">
              <contentCard class="children" v-for="dataDoing in doing" :key="dataDoing.id" 
              :title="dataDoing.title" 
              :status="dataDoing.status"
              :assignee="dataDoing.assignee"
              :point="dataDoing.point"
              :description="dataDoing.description"
              :id="dataDoing.id"></contentCard>
            </draggable>
          </b-card>
        </b-col>
        <b-col>
          <b-card header-bg-variant="success" text-variant="white" header="Done" class="text-center parent" style="max-width: 18rem;">
            <draggable group="parentcard" :list="done" @start="drag=true" @end="drag=false">
              <contentCard class="children" v-for="dataDone in done" :key="dataDone.id" 
              :title="dataDone.title" 
              :status="dataDone.status"
              :assignee="dataDone.assignee"
              :point="dataDone.point"
              :description="dataDone.description"
              :id="dataDone.id"></contentCard>
            </draggable>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '../config/firebase'
import contentCard from './contentCard'
import draggable from 'vuedraggable'

export default {
  name: 'parentcard',
  data() {
    return {
      show: false,
      title: '',
      description: '',
      assignee: '',
      point: '',
      backLog : [],
      toDo : [],
      doing: [],
      done: []
    }
  },
  components:{
    contentCard,
    draggable
  },
  methods: {
    getAllData(){
      db.collection("kanvanboard").orderBy('title')
        .onSnapshot((querySnapshot) => {
          this.backLog = []
          this.toDo = []
          this.doing = []
          this.done = []
          querySnapshot.forEach(element => {
            if(element.data().status === 'backlog'){
              this.backLog.push({id:element.id,...element.data()})
            }else if(element.data().status === 'todo'){
              this.toDo.push({id:element.id,...element.data()})
            }else if(element.data().status === 'doing'){
              this.doing.push({id:element.id,...element.data()})
            }else if(element.data().status === 'done'){
              this.done.push({id:element.id,...element.data()})
            }
          })
        })
    },
    onSubmit(){
      db.collection('kanvanboard').add({
        title: this.title,
        description: this.description,
        assignee: this.assignee,
        point: this.point,
        status: 'backlog'
      })
      .then((docRef) => {
        this.$dlg.toast("Document successfully created!",{messageType:'success',closeTime: 2});
        this.$refs['modalAdd'].hide()
      })
      .catch(function(error) {
        this.$dlg.toast("Error writing document: "+error,{messageType:'error'});
      })
    },
  },
  watch: {
    backLog(val){
      val.forEach(element => {
        if(element.status !== 'backlog'){
          db.collection('kanvanboard').doc(element.id).update({status: 'backlog'})
          .then(()=>{
            this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
          })
        }
      })
    },
    toDo(val){
      val.forEach(element => {
        if(element.status !== 'todo'){
          db.collection('kanvanboard').doc(element.id).update({status: 'todo'})
          .then(()=>{
            this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
          })
        }
      })
    },
    doing(val){
      val.forEach(element => {
        if(element.status !== 'doing'){
          db.collection('kanvanboard').doc(element.id).update({status: 'doing'})
          .then(()=>{
            this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
          })
        }
      })
    },
    done(val){
      val.forEach(element => {
        if(element.status !== 'done'){
          db.collection('kanvanboard').doc(element.id).update({status: 'done'})
          .then(()=>{
            this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
          })
        }
      })
    }
  },
  created() {
    this.getAllData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-add{
  margin-left: 89%;
}
.parent:hover, .children:hover{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
a{
  background: rgba(#fff, 0);
  border-bottom: 1px solid;
  color: black;
  line-height: 1.4;
  padding: .25em;
  text-decoration: none;
}
a:hover{
  color: grey;
  background: rgba(#fff,1)
}

.btnAdd{
  color: black;
  cursor: pointer;
  font-size:16px;
  font-weight: 400;
  max-width: 160px; 
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: 280ms ease-in-out;
  width: 100%; 
  letter-spacing: 0;
}

.btnAdd:hover,.btnAdd:active{
  letter-spacing: 5px;
  transition: 280ms ease-in-out;
  border-top: 1px solid;
}

</style>
