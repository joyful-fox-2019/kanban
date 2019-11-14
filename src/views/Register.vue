<template>
  <div style="padding-top:100px">
    <div class="card">
      <div style="display: flex; justify-content: center">
          <img src="../assets/banner.png" alt="logo" style="width:200px; margin:0px auto; margin-bottom:30px;">
      </div>
      <form>
          <b-input v-model="email" type="email" placeholder="Email address" maxlength="30"></b-input><br/>
          <b-input v-model="password" type="password" placeholder="*******"></b-input>
          <div class="button">
              <b-button @click.prevent="signUp" class="s-login-btn" variant="primary" id="login-btn">
                  <i class="fas fa-user-plus" style="margin-right:10px;"></i>
                  Sign Up
              </b-button>
          </div>
          <small><router-link to="/login">← Back to login page</router-link></small>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home')
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (err) => {
          Swal.fire({
            icon: 'errror',
            title: 'Error!',
            text: err.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }
  }
}
</script>

 <style scoped>
    .card {
        background-color: whitesmoke;
        width: 30%;
        margin: 0px auto;
        padding: 30px;
        border-radius: 10px;
    }
    .button {
        width: 100%;
        margin: 30px auto;
    }
</style>
