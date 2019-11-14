<template>
    <div>
        <div id="nav">
            <link href="https://fonts.googleapis.com/css?family=Oswald:500&display=swap" rel="stylesheet">
            <div class="sticky-top">
                <nav class="navbar navbar-expand-md navbar-light bg-white d-flex justify-content-between h1 p-0 border">
                    <div class="nav navbar d-flex justify-content-start">
                        <div class="">
                            <a class="nav-link text-danger" style="font-family: 'Oswald', sans-serif;">Kamvan-Tamvan</a>
                        </div>
                    </div>
                    <ul class="nav justify-content-end navbar-nav">
                        <li class="nav-item pr-3">
                            <b-button v-b-modal.modal-prevent-closing class="btn btn-outline-success  my-2 my-sm-0" href="" ><i class="fa fa-plus pr-1"></i>add task</b-button>
                            <modal></modal>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>        
    </div>
</template>

<script>
import modal from '../components/modal'

export default {
  components: {
    modal
  }
}
</script>

<style scoped>
a {
cursor: pointer;
}
.btn {
    background-color: white !important
}

.btn-outline-success:hover {
    background-color: green !important;
}
</style>
