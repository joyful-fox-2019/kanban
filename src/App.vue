<template>
  <div id="app">
      <navbar></navbar>
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
import db from '../src/config/firebase.js'
import navbar from './components/navbar'
import Home from '@/views/Home'

export default {
  components: {
    navbar,
    Home
  }
}
</script>>
