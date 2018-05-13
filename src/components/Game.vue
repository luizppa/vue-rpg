<template lang="html">
  <div class="row game">
    <inventory :player="player" :enemy="enemies[round]" :logs="logs" :playerTurn="playerTurn"></inventory>
    <div class="col-sm-6">
      <div class="row">
        <player :logs="logs" :enemy="enemies[round]"></player>
        <enemy :logs="logs" :enemy="enemies[round]" :player="player"></enemy>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12" v-if="player">
          <div class="col-xs-6" align="center">
            <button type="button" class="btn btn-danger" :disabled="player.hp <= 0 || !playerTurn" @click="attack">ATTACK</button>
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
        <div class="col-md-8 col-md-offset-2 toggle" align="center">
          <button type="button" class="btn btn-primary" name="button" @click="toggleLogs">{{ logAll ? 'Recent Only' : 'Full Log' }}</button>
        </div>
        <!-- eslint-disable-next-line -->
        <div class="col-md-8 col-md-offset-2" align="center" v-for="log in logs.slice(0, logAmount)">
          <p class="log">{{ log }}</p>
          <hr>
        </div>
      </div>
    </div>
    <magic :player="player" :enemy="enemies[round]" :logs="logs"  :playerTurn="playerTurn"></magic>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'
import Items from '../resources/items'
import Magics  from '../resources/magics'
import Player from './Player.vue'
import Enemy from './Enemy.vue'
import Inventory from './Inventory.vue'
import Magic from './Magic.vue'
import NPC from '../resources/npcs'

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
      logAmount: 5,
      playerTurn: true
    }
  },
  created(){
    console.log('Game created')
    master.$on('newPlayer', (player) => {
      this.player = player
    })
    master.$on('playerTurn', () => {
      this.playerTurn = true
    })
    master.$on('enemyTurn', () => {
      this.playerTurn = false
    })
  },
  methods: {
    restart(){
      this.logs = []
      this.player.maxHp = 100
      this.player.hp = this.player.maxHp
      this.player.maxMp = 60
      this.player.mp = this.player.maxMp
      this.player.status = []
      this.player.inventory = {
        potion: {
          amount: 1,
          action: Items.potion
        }
      }
      this.player.magic = {
        cure: Magics.cure,
        fire: Magics.fire,
        water: Magics.water,
        thunder: Magics.thunder,
        air: Magics.air,
        blizzard: Magics.blizzard
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
    player: Player,
    enemy: Enemy,
    inventory: Inventory,
    magic: Magic
  }
}
</script>

<style>
.toggle{
  margin-bottom: 20px;
}
.game{
  font-family: 'Inknut Antiqua', serif;
}
.hp-bar{
  height: 30px;
  width: 100%;
  border: 1px solid black;
}
.mp-bar{
  margin-top: 3px;
  height: 8px;
  width: 100%;
  border: 1px solid black;
}
.hp-status{
  color: white;
  margin: 0;
  padding: 1%
}
.mp-status{
  font-size: 10px;
  color: white;
  margin: 0;
  padding: 1%
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
