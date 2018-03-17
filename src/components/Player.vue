<template>
  <div class="col-md-6">
    <p align="center">{{ player.name.toUpperCase() }}</p>
    <div class="bar">
      <div class="health" :style="{width: (player.hp/player.maxHp*100)+'%'}">
        <p class="status">{{ player.hp }}/{{ player.maxHp }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { master } from '../main'
import { actions } from '../main'

export default {
  props: ['enemy', 'logs'],
  data: function(){
    return {
      player: {
        name: 'Player',
        hp: 100,
        maxHp: 100,
        inventory: {
          potions: 5
        },
        magic: {

        }
      }
    }
  },
  created(){
    master.$emit('newPlayer', this.player)
    actions.$on('attack', this.attack)
    actions.$on('potion', this.potion)
  },
  methods: {
    attack(){
      if (this.enemy.hp <= 0) {
        this.logs.unshift(this.enemy.name+' is already dead!')
      }
      else{
        let row = master.d20()
        if (row >= 19){
          let damage = master.d10()+master.d10()
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
          let damage = master.d10()
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
    potion(){
      if (this.player.inventory.potions > 0) {
        this.player.inventory.potions -= 1
        if (this.player.hp >= this.player.maxHp) {
          this.logs.unshift(this.player.name+' tries to heal but he is already on full health!')
        }
        else{
          let gain = master.d12()
          this.logs.unshift(this.player.name+' uses a potion restoring '+gain+' HP!')
          if (this.player.hp + gain > this.player.maxHp) {
            this.player.hp = this.player.maxHp
          }
          else{
            this.player.hp += gain
          }
        }
      }
      else{
        this.logs.unshift(this.player.name+' tries to heal but he has no potions left!')
      }
      master.$emit('enemyTurn')
    },
  }
}
</script>

<style scoped>
  .health{
    height: 100%;
    background-color: #45EE00;
  }
</style>
