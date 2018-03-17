<template lang="html">
  <div class="game">
    <div class="row">
      <player :logs="logs" :enemy="enemies[round]"></player>
      <enemy :logs="logs" :enemy="enemies[round]" :player="player"></enemy>
    </div>
    <hr>
    <div class="row" v-if="player">
      <div class="col-mad-6">
        <p>Potions: {{ player.inventory.potions }}</p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12" v-if="player">
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-danger" v-if="player.hp > 0" @click="attack">ATTACK</button>
        </div>
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-primary" v-if="player.hp === 0" @click="restart">RESTART</button>
          <button type="button" class="btn btn-primary" v-else-if="enemies[round].hp === 0" @click="round += 1">ADVANCE</button>
          <button type="button" class="btn btn-primary" v-else @click="restart">FORFEIT</button>
        </div>
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-success" v-if="player.hp > 0" @click="potion">POTION</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-8 col-md-offset-2" align="center" v-for="log in logs">
        <p class="log">{{ log }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'
import Player from './Player.vue'
import Enemy from './Enemy.vue'

export default {
  data: function(){
    return {
      player: null,
      round: 0,
      enemies: [
        {
          level: 1,
          name: 'Skelleton',
          hp: 70,
          maxHp: 70
        },
        {
          level: 2,
          name: 'Werewolf',
          hp: 100,
          maxHp: 100
        }
      ],
      logs: []
    }
  },
  created(){
    master.$on('newPlayer', (player) => {
      this.player = player
    })
  },
  methods: {
    restart(){
      this.logs = []
      this.player.maxHp = 100
      this.player.hp = this.player.maxHp
      this.player.inventory.potions = 5
      this.enemies.forEach(function(enemy, index){
        enemy.hp = enemy.maxHp
      })
      this.round = 0
    },
    attack(){
      actions.$emit('attack')
    },
    potion(){
      actions.$emit('potion')
    }
  },
  components: {
    'player': Player,
    'enemy': Enemy
  }
}
</script>

<style>
.game{
  font-family: 'Inknut Antiqua', serif;
}
.bar{
  height: 30px;
  width: 100%;
  border: 1px solid black;
}
.status{
  color: white;
  margin: 0;
  padding: 1%
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
