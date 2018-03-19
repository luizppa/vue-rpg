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
    <div class="col-md-8 col-md-offset-2" align="center" v-for="log in logs">
      <p class="log">{{ log }}</p>
      <hr>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'
import ItemActions from './resources/items'
import Player from './Player.vue'
import Enemy from './Enemy.vue'
import Inventory from './Inventory.vue'

export default {
  data: function(){
    return {
      showInventory: true,
      showMagic: true,
      player: null,
      round: 0,
      enemies: [
        {
          level: 1,
          name: 'Skelleton',
          damageCalc: master.d8,
          hp: 70,
          maxHp: 70,
          weakness: 0 // Holy
        },
        {
          level: 2,
          name: 'Bandit Captain',
          damageCalc: master.d8,
          hp: 100,
          maxHp: 100,
          weakness: 1 // Fire
        },
        {
          level: 3,
          name: 'Werewolf',
          damageCalc: master.d10,
          hp: 115,
          maxHp: 115,
          weakness: 2 // Silver
        },
        {
          level: 4,
          name: 'Behemoth',
          damageCalc: master.d12,
          hp: 140,
          maxHp: 140,
          weakness: 3 // Ice
        },
        {
          level: 5,
          name: 'Orc Leader',
          damageCalc: function(){return master.d8() + master.d8()},
          hp: 150,
          maxHp: 150,
          weakness: 1 // Fire
        },
        {
          level: 6,
          name: 'Dragon Priest',
          damageCalc: function(){return master.d10() + master.d10()},
          hp: 160,
          maxHp: 160,
          weakness: 0 // Holy
        },
        {
          level: 7,
          name: 'Giant',
          damageCalc: master.d20,
          hp: 180,
          maxHp: 180,
          weakness: 3 // Ice
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
