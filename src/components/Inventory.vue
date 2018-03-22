<template>
  <div class="col-sm-3" v-if="player">
    <p align="center" class="title">Inventory</p>
    <!-- eslint-disable-next-line -->
    <div class="slot" v-for="(details, item) of player.inventory" @click="use(item)">
      <button type="button" :disabled="details.amount === 0 || !playerTurn" class="btn btn-primary">{{ item }}: {{ details.amount }}</button>
    </div>
  </div>
</template>

<script>
import { actions } from '../main'
import { master } from '../main'
import Items from '../resources/items'

var dices = require('../resources/dices')

export default {
  created(){
    master.$on('enemyDefeated', () => {
      this.reward()
    })
  },
  props: ['player', 'enemy', 'logs', 'playerTurn'],
  methods: {
    use(item){
      actions.$emit('itemUsed', item)
    },
    attach(item, amount, action){
      this.player.inventory[item] = {
        amount: amount,
        action: action
      },
      this.player.inventory.potion.amount += 1
      this.player.inventory.potion.amount -= 1
    },
    collect(item, amount){
      this.player.inventory[item].amount += amount
      this.player.inventory.potion.amount += 1
      this.player.inventory.potion.amount -= 1
    },
    reward(){
      switch (this.enemy.level) {
        case 1:
          this.collect('potion', 2)
          this.logs.unshift('2 potions acquired')
          this.player.maxHp += Math.floor(this.player.hp/5)
          break
        case 2:
          this.collect('potion', 3)
          this.attach('silver shuriken', 2, Items.silverShuriken)
          this.logs.unshift('3 potions acquired')
          this.logs.unshift('2 silver shurikens acquired')
          this.player.damage = dices.d12
          this.player.maxHp += Math.floor(this.player.hp/5)
          break
        case 3:
          this.collect('potion', 5)
          this.attach('hi-potion', 3, Items.hiPotion)
          this.attach('ice magicite', 3, Items.iceMagicite)
          this.logs.unshift('5 potions acquired')
          this.logs.unshift('3 hi-potions acquired')
          this.logs.unshift('3 ice magicites acquired')
          this.player.damage = function() {
            return dices.d12() + dices.d4()
          }
          this.player.maxHp += Math.floor(this.player.hp/5)
          break
        case 4:
          this.collect('potion', 2)
          this.collect('hi-potion', 3)
          this.attach('behemoth skin', 1, Items.behemothSkin)
          this.logs.unshift('3 hi-potions acquired')
          this.logs.unshift('2 potions acquired')
          this.logs.unshift('Behemoth skin acquired')
          break
        case 5:
          this.attach('life stone', 1, Items.lifeStone)
          this.attach('orchrish blade', 1, Items.orchrishBlade)
          this.logs.unshift('Life stone acquired')
          this.logs.unshift('Orchrish Blade acquired')
          this.player.maxHp += Math.floor(this.player.hp/2.5)
          break
        case 6:
          this.collect('hi-potion', 4)
          this.attach('phoenix down', 1, Items.phoenixDown)
          this.logs.unshift('4 hi-potions acquired')
          this.logs.unshift('Phoenix Down acquired')
          this.player.maxHp += Math.floor(this.player.hp/5)
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
