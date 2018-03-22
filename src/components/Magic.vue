<template>
  <div class="col-md-3" v-if="player">
    <p align="center" class="title">Magic</p>
    <!-- eslint-disable-next-line -->
    <div class="slot" v-for="(details, magic) of player.magic" @click="cast(magic)">
      <button type="button" :disabled="details.cost > player.mp || !playerTurn" class="btn btn-primary">{{ magic }}: {{ details.cost }}</button>
    </div>
  </div>
</template>

<script>
import { actions } from '../main'
import { master } from '../main'
import Magics from '../resources/magics'

export default {
  props: ['player', 'enemy', 'logs', 'playerTurn'],
  created(){
    master.$on('enemyDefeated', () => {
      this.reward()
    })
  },
  methods: {
    cast(magic){
      actions.$emit('magicCasted', magic)
    },
    attach(magic, details){
      this.player.magic[magic] = {
        cost: details.cost,
        action: details.action
      }
      this.player.magic.cure.cost -= 1
      this.player.magic.cure.cost += 1
    },
    reward(){
      switch (this.enemy.level) {
        case 1:
          this.player.maxMp += 10
          break
        case 2:
          this.attach('cura', Magics.cura)
          this.logs.unshift('Cura learned')
          break
        case 3:
          this.player.maxMp += 10
          break
        case 4:
          this.player.maxMp += 10
          break
        case 5:
          this.attach('curaga', Magics.curaga)
            this.logs.unshift('Curaga learned')
          break
        case 6:
          this.player.maxMp += 20
          break
        case 7:
          this.player.maxMp += 20
          this.attach('drain', Magics.drain)
          this.logs.unshift('Drain learned')
          break
        case 8:
          this.player.maxMp += 20
          break
        case 9:
          this.attach('curaja', Magics.curaja)
          this.logs.unshift('Curaja learned')
          break
      }
    }
  }
}
</script>

<style scoped>
  .title{
    font-family: 'Ewert', cursive;
    font-size: 30px;
  }
  .slot{
    display: block;
    /* box-shadow: 0px 0px 5px #A2A2A2; */
    /* padding: 2% 3% 2% 3%; */
    margin: 2%;
    /* cursor: pointer; */
  }
  .item{
  }
  @import'~bootstrap/dist/css/bootstrap.css';
</style>
