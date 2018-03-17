<template>
  <div id="app">
    <div class="container">
      <p class="title" align="center">RPG</p>
      <rpg-game></rpg-game>
    </div>
  </div>
</template>

<script>
import Game from './components/Game.vue'
  export default {
    data: function () {
      return {
      }
    },
    components: {
      'rpg-game': Game
    }
  }
</script>

<style scoped>
.title{
  font-size: 50px;
  /* font-family: 'Rye', cursive; */
  font-family: 'Ewert', cursive;
  /* font-family: 'Inknut Antiqua', serif; */
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
