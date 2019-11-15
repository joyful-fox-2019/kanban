<template>
   <div :style="`background-color: rgba(${cardColor}, 0.70);`" class="boardTitle">
      <h2>{{ title }}</h2>
    </div>
</template>

<script>

export default {
  name: 'board-title',
  props: ['title', 'cardColor'],
}
</script>

<style>
.boardTitle {
  color:white;
  box-shadow: 3px 11px 14px -5px rgba(0,0,0,0.20);
  height: 50px;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
}

.boardTitle h2 {
  font-size: 20px;
}
</style>
