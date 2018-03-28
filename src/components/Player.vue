<template>
  <div class="col-md-6">
    <p align="center">{{ player.name.toUpperCase() }}</p>
    <div class="hp-bar">
      <div class="health" :style="{width: (player.hp/player.maxHp*100)+'%'}">
        <p class="hp-status">{{ player.hp }}/{{ player.maxHp }}</p>
      </div>
    </div>
    <div class="mp-bar">
      <div class="mana" :style="{width: (player.mp/player.maxMp*100)+'%'}">
        <!-- <p class="mp-status">{{ player.mp }}/{{ player.maxMp }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'
import Items from '../resources/items'
import Magics from '../resources/magics'

var dices = require('../resources/dices')

export default {
  props: ['enemy', 'logs'],
  data: function(){
    return {
      player: {
        name: 'Player',
        ca: 5,
        hp: 100,
        maxHp: 100,
        mp: 60,
        maxMp: 60,
        damage: dices.d10,
        inventory: {
          potion: {
            amount: 1,
            action: Items.potion
          }
        },
        magic: {
          cure: Magics.cure,
          fire: Magics.fire,
          water: Magics.water,
          thunder: Magics.thunder,
          air: Magics.air,
          blizzard: Magics.blizzard
        }
      }
    }
  },
  created(){
    console.log('Player created')
    master.$emit('newPlayer', this.player)
    actions.$on('attack', this.attack)
    actions.$on('itemUsed', this.use)
    actions.$on('magicCasted', this.cast)
  },
  methods: {
    attack(){
      if (this.enemy.hp <= 0) {
        this.logs.unshift(this.enemy.name+' is already dead!')
      }
      else{
        let row = dices.d20()
        if (row >= 19){
          let damage = this.player.damage()+this.player.damage()
          let mpGain = Math.floor(damage/2)
          if (this.player.mp + mpGain > this.player.maxMp) this.player.mp = this.player.maxMp
          else this.player.mp += mpGain
          this.logs.unshift(this.player.name+' attacks dealing a critical damage of '+damage+'!')
          if(this.enemy.hp <= damage){
            this.enemy.hp = 0
            this.logs.unshift(this.enemy.name+' is dead! '+this.player.name+' wins!')
            master.$emit('enemyDefeated')
          }
          else{
            this.enemy.hp -= damage
          }
        }
        else if (row >= 6) {
          let damage = this.player.damage()
          let mpGain = Math.floor(damage/2)
          if (this.player.mp + mpGain > this.player.maxMp) this.player.mp = this.player.maxMp
          else this.player.mp += mpGain
          this.logs.unshift(this.player.name+' attacks dealing a damage of '+damage+'!')
          if(this.enemy.hp <= damage){
            this.enemy.hp = 0
            this.logs.unshift(this.enemy.name+' is dead! '+this.player.name+' wins!')
            master.$emit('enemyDefeated')
          }
          else{
            this.enemy.hp -= damage
          }
        }
        else{
          this.logs.unshift(this.player.name+' attacks but he miss!')
        }
      }
      master.$emit('enemyTurn')
    },
    use(item){
      if (this.player.hp > 0 || item === 'phoenix down') {
        if (this.player.inventory[item].amount > 0) {
          this.player.inventory[item].amount -= 1
          this.player.inventory.potion.amount += 1
          this.player.inventory.potion.amount -= 1
          this.player.inventory[item].action(this, this.player, this.enemy)
        }
        else this.logs.unshift(this.player.name+' tries to use '+item+' but he has none left!')
        master.$emit('enemyTurn')
      }
    },
    cast(magic){
      if (this.player.hp > 0) {
        if (this.player.mp >= this.player.magic[magic].cost) {
          this.player.mp -= this.player.magic[magic].cost
          this.player.magic[magic].action(this, this.player, this.enemy)
        }
        else this.logs.unshift(this.player.name+' tries use '+magic+' but he has not enough MP!')
        master.$emit('enemyTurn')
      }
    }
  }
}
</script>

<style scoped>
  .health{
    height: 100%;
    background-color: #45EE00;
  }
  .mana{
    height: 100%;
    background-color: #0075BF;
  }
</style>
