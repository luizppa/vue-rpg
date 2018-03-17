<template>
  <div class="col-md-6">
    <p align="center">{{ enemy.name.toUpperCase() }}</p>
    <div class="bar">
      <div class="health" :style="{width: (enemy.hp/enemy.maxHp*100)+'%'}">
        <p class="status">{{ enemy.hp }}/{{ enemy.maxHp }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { master } from '../main'

export default {
  props: ['enemy', 'player', 'logs'],
  data: function(){
    return {
    }
  },
  created() {
    master.$on('enemyDefeated', () => {
      switch (this.enemy.level) {
        case 1:
          this.player.inventory.potions += 3
          this.player.maxHp += 10
          break
        case 2:
          this.player.inventory.potions += 5
          this.player.maxHp += 15
          break
      }
    })
    master.$on('enemyTurn', () => {
      this.startTurn()
    })
  },
  methods: {
    startTurn(){
      if(this.enemy.hp > 0){
        this.attack()
      }
    },
    attack(){
      let row = master.d20()
      let damageCalc = master.d2
      switch (this.enemy.level) {
        case 1:
          damageCalc = master.d8
          break;
        case 2:
          damageCalc = master.d10
      }
      if (row >= 19){
        let damage = damageCalc()+damageCalc()
        this.logs.unshift(this.enemy.name+' attacks dealing a critical damage of '+damage+'!')
        if(this.player.hp <= damage){
          this.player.hp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.player.hp -= damage
        }
      }
      else if (row >= 6) {
        let damage = damageCalc()
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
