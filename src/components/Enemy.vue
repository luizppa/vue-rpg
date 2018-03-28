<template>
  <div class="col-md-6">
    <p align="center">{{ enemy.name.toUpperCase() }}</p>
    <div class="hp-bar">
      <div class="health" :style="{width: (enemy.hp/enemy.maxHp*100)+'%'}">
        <p class="hp-status">{{ enemy.hp }}/{{ enemy.maxHp }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { master } from '../main'

var dices = require('../resources/dices')

export default {
  props: ['enemy', 'player', 'logs'],
  data: function(){
    return {
    }
  },
  created() {
    console.log('Enemy created')
    master.$on('enemyTurn', () => {
      if(this.enemy.hp > 0){
        // setTimeout(() => {
          this.startTurn()
          master.$emit('playerTurn')
        // } ,0)
      }
      else master.$emit('playerTurn')
    })
  },
  methods: {
    startTurn(){
      this.enemy.action(this)
    },
    attack(){
      let roll = dices.d20()
      if (roll >= 19){
        let damage = this.enemy.damageCalc()+this.enemy.damageCalc()
        this.logs.unshift(this.enemy.name+' attacks dealing a critical damage of '+damage+'!')
        if(this.player.hp <= damage){
          this.player.hp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.player.hp -= damage
        }
      }
      else if (roll > 12 && this.enemy.status.includes('blood thirsty')){
        let damage = this.enemy.damageCalc()+this.enemy.damageCalc()
        this.logs.unshift(this.enemy.name+' attacks dealing a critical damage of '+damage+'!')
        if(this.player.hp <= damage){
          this.player.hp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.player.hp -= damage
        }
      }
      else if (roll > this.player.ca) {
        let damage = this.enemy.damageCalc()
        this.logs.unshift(this.enemy.name+' attacks dealing a damage of '+damage+'!')
        if(this.player.hp <= damage){
          this.player.hp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.player.hp -= damage
        }
      }
      else{
        this.logs.unshift(this.enemy.name+' attacks but he miss!')
      }
    }
  }
}
</script>

<style scoped>
.health{
  height: 100%;
  background-color: #F50000;
}
</style>
