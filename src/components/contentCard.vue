<template>
    <div>
        <b-card :header="title" class="text-center mt-2" style="color:black;">
            <b-card-text>Point: {{point}}</b-card-text>
            <b-card-text>Assigned To: {{assignee}}</b-card-text>
            <b-button @click="show=true" variant="primary">Show Modal</b-button>
        </b-card>
        <b-modal
        v-model="show"
        :title="title"
        ref="modalDesc"
        >
        <b-container fluid>
            <b-row class="mb-1" style="display:flex; flex-direction: column;">
                <h6>Task Description : </h6>
                <p>{{description}}</p>
            </b-row>

            <b-row class="mb-1" style="display:flex; flex-direction: column;">
                <h6>Point : </h6>
                
                <p>{{point}}</p>
            </b-row>

            <b-row class="mb-1" style="display:flex; flex-direction: column;">
                <h6>Status : </h6>
                
                <p>{{status}}</p>
            </b-row>
        </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
            <b-button
            variant="primary"
            size="sm"
            class="float-left"
            v-if="status !== 'backlog'"
            @click="revertStatus"
          >
            Back
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            style="margin-left: 35%;"
            @click="deleteContent"
          >
            Delete
          </b-button>
          <b-button
            variant="success"
            size="sm"
            class="float-right"
            v-if="status !== 'done'"
            @click="continueStatus"
          >
            Continue
          </b-button>
        </div>
      </template>
    </b-modal>
    </div>
</template>

<script>
import db from '../config/firebase'

export default {
    props: {
        title: String,
        description: String,
        status: String,
        point: String,
        assignee: String,
        id:String
    },
    data(){
        return {
            show: false,
            statusNow : this.status
        }
    },
    methods:{
        continueStatus(){
            switch(this.status){
                case 'backlog':
                    this.statusNow = 'todo'
                    break
                case 'todo':
                    this.statusNow = 'doing'
                    break
                case 'doing':
                    this.statusNow = 'done'
                    break
            }
            db.collection('kanvanboard').doc(this.id).update({status:this.statusNow})
            .then(()=>{
                this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
            })
            .catch(err =>{
                this.$dlg.toast("Error updating document: "+err,{messageType:'error'});
            })
        },
        deleteContent(){
            this.$dlg.alert('You can\'t revert the data once you delete it,are you sure you want to continue ?',()=>{
                db.collection('kanvanboard').doc(this.id).delete()
                .then(() => {
                    this.$dlg.toast("Document successfully deleted!",{messageType:'success',closeTime: 2});
                }).catch((error) => {
                    this.$dlg.toast("Error deleting document: "+err,{messageType:'error'});
                })
            },{messageType:'confirm'})
        },
        revertStatus(){
             switch(this.status){
                case 'todo':
                    this.statusNow = 'backlog'
                    break
                case 'doing':
                    this.statusNow = 'todo'
                    break
                case 'done':
                    this.statusNow = 'doing'
                    break
            }
            db.collection('kanvanboard').doc(this.id).update({status:this.statusNow})
            .then(()=>{
                this.$dlg.toast("Document successfully updated!",{messageType:'success',closeTime: 2});
            })
            .catch(err =>{
                this.$dlg.toast("Error updating document: "+err,{messageType:'error'});
            })
        }
    }
}
</script>

<style>

</style>
