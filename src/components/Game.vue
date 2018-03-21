<template lang="html">
  <div class="row game">
    <div class="col-sm-3" v-if="player">
      <inventory :player="player" :enemy="enemies[round]" :logs="logs" v-if="showInventory"></inventory>
    </div>
    <div class="col-sm-6">
      <div class="row">
        <player :logs="logs" :enemy="enemies[round]"></player>
        <enemy :logs="logs" :enemy="enemies[round]" :player="player"></enemy>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12" v-if="player">
          <div class="col-xs-6" align="center">
            <button type="button" class="btn btn-danger" v-if="player.hp > 0" @click="attack">ATTACK</button>
          </div>
      <div class="col-xs-6" align="center">
        <button type="button" class="btn btn-danger" v-if="player.hp === 0" @click="restart">RESTART</button>
        <button type="button" class="btn btn-success" v-else-if="enemies[round].hp === 0" @click="round += 1" :disabled="round === enemies.length-1">ADVANCE</button>
        <button type="button" class="btn btn-danger" v-else @click="restart">FORFEIT</button>
      </div>
    </div>
  </div>
  <hr>
  <div class="row">
    <!-- eslint-disable-next-line -->
    <div class="col-md-8 col-md-offset-2" align="center" v-for="log in logs.slice(0, logAmount)">
      <p class="log">{{ log }}</p>
      <hr>
    </div>
    <div class="col-md-8 col-md-offset-2" align="center">
      <button type="button" class="btn btn-primary" name="button" @click="toggleLogs">{{ logAll ? 'Recent Only' : 'Full Log' }}</button>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'
import ItemActions from '../resources/items'
import Player from './Player.vue'
import Enemy from './Enemy.vue'
import Inventory from './Inventory.vue'

var NPC = require('../resources/enemies')

export default {
  data: function(){
    return {
      showInventory: true,
      showMagic: true,
      player: null,
      round: 0,
      enemies: NPC.enemies,
      logs: [],
      logAll: false,
      logAmount: 5
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
      this.player.inventory = {
        potion: {
          amount: 1,
          action: ItemActions.potion
        }
      }
      this.enemies.forEach(function(enemy){
        enemy.hp = enemy.maxHp
      })
      this.round = 0
    },
    attack(){
      actions.$emit('attack')
    },
    potion(){
      actions.$emit('potion')
    },
    toggleLogs(){
      if (this.logAll) {
        this.logAll = false
        this.logAmount = 5
      }
      else{
        this.logAll = true
        this.logAmount = this.logs.length
      }
    }
  },
  components: {
    'player': Player,
    'enemy': Enemy,
    'inventory': Inventory
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
