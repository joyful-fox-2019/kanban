<template>
  <div style="padding-top:100px">
    <div class="card">
      <div style="display: flex; justify-content: center">
          <img src="../assets/banner.png" alt="logo" style="width:200px; margin:0px auto; margin-bottom:30px;">
      </div>
      <form>
          <b-input v-model="email" type="email" placeholder="Email address" maxlength="30"></b-input><br/>
          <b-input v-model="password" type="password" placeholder="*******"></b-input>
          <div class="buttons">
              <b-button @click.prevent="login" class="s-login-btn" variant="primary" id="login-btn">
                  <i class="fas fa-sign-in-alt" style="margin-right:10px;"></i>
                  Sign In
              </b-button>
              <b-button @click.prevent="socialLogin" class="g-login-btn" variant="primary" id="g-login-btn">
                  <i class="fab fa-google" style="margin-right:10px;"></i>
                  Google Sign In
              </b-button>
          </div>
          <small>Don't have an account? <router-link to="/register">Sign up here.</router-link></small>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('home')
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch((err) => {
        Swal.fire({
          icon: 'errror',
          title: 'Error!',
          text: err.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    socialLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('home')
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch((err) => {
        Swal.fire({
          icon: 'errror',
          title: 'Error!',
          text: err.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .card {
      background-color: whitesmoke;
      width: 30%;
      margin: 0px auto;
      padding: 30px;
      border-radius: 10px;
  }
  .buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 30px auto;
  }
  .login-btn {
      width: 40%;
      margin-top: 10px;
  }
</style>
