<template>
  <div class="home">
    <section class="header">
      <Header></Header>
    </section>
    <div class="container">
      <div class="row">
        <div v-for="card in cards" :key="card.name" class="col-sm">
        <Card :card="card"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '../configs/firebase'
import Header from '@/components/Header.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  components: {
    Header,
    Card
  },
  data: function () {
    return {
      cards: [
        {
          name: 'backlog',
          tasks: []
        },
        {
          name: 'todo',
          tasks: []
        },
        {
          name: 'ongoing',
          tasks: []
        },
        {
          name: 'finished',
          tasks: []
        }
      ]
    }
  },
  methods: {
    getTasks () {
      // ngambil data task dari firebase
      db.collection('tasks').onSnapshot(snapshot => {
        this.cards[0].tasks = []
        this.cards[1].tasks = []
        this.cards[2].tasks = []
        this.cards[3].tasks = []
        snapshot.forEach(doc => {
          console.log(doc.id)
          let task = doc.data()
          task.id = doc.id
          if (doc.data().status === 'backlog') {
            this.cards[0].tasks.push(task)
          } else if (doc.data().status === 'todo') {
            this.cards[1].tasks.push(task)
          } else if (doc.data().status === 'ongoing') {
            this.cards[2].tasks.push(task)
          } else if (doc.data().status === 'finished') {
            this.cards[3].tasks.push(task)
          }
        })
      })
        // .then(snapshot => {
        //   console.log(snapshot, '===============')
        //   snapshot.forEach(doc => {
        //     console.log(doc.id)
        //     let task = doc.data()
        //     task.id = doc.id
        //     if (doc.data().status === 'backlog') {
        //       this.cards[0].tasks.push(task)
        //     } else if (doc.data().status === 'todo') {
        //       this.cards[1].tasks.push(task)
        //     } else if (doc.data().status === 'ongoing') {
        //       this.cards[2].tasks.push(task)
        //     } else if (doc.data().status === 'finished') {
        //       this.cards[3].tasks.push(task)
        //     }
        //   })
        // })
        .catch(err => {
          console.log(`Error getting documents`, err)
        })
    }
  },
  created () {
    this.getTasks()
  }
}
</script>
