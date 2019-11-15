<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

body{
  font-family: 'Comfortaa', cursive;
  background-color: #76eaf5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%2376eaf5' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%2398eff7' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23b5f3f9' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23cff7fb' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23e8fbfd' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23ffffff' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
