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
import ItemActions from './resources/items'

export default {
  props: ['enemy', 'player', 'logs'],
  data: function(){
    return {
    }
  },
  created() {
    master.$on('enemyDefeated', () => {
      this.reward()
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
      if (row >= 19){
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
      else if (row > this.player.ca) {
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
    },
    reward(){
      switch (this.enemy.level) {
        case 1:
          this.player.inventory['potion'].amount += 3
          this.player.maxHp += Math.floor(this.player.hp/5)
          this.logs.unshift('3 potions acquired')
          break
        case 2:
          this.player.inventory['potion'].amount += 5
          this.logs.unshift('5 potions acquired')
          this.player.inventory['silver shuriken'] = {
            amount: 2,
            action: ItemActions.silverShuriken
          }
          this.logs.unshift('2 silver shurikens acquired')
          this.player.damage = master.d12
          this.player.maxHp += Math.floor(this.player.hp/3)
          break
        case 3:
          this.player.inventory['potion'].amount += 5
          this.logs.unshift('5 potions acquired')
          this.player.inventory['hi-potion'] = {
            amount: 4,
            action: ItemActions.hiPotion
          }
          this.player.inventory['ice magicite'] = {
            amount: 3,
            action: ItemActions.iceMagicite
          }
          this.logs.unshift('3 ice magicites acquired')
          this.player.damage = function() {
            return master.d12() + master.d4()
          }
          this.player.maxHp += Math.floor(this.player.hp*1.5)
          break
        case 4:
          this.player.inventory['potion'].amount += 5
          this.player.inventory['hi-potion'].amount += 4
          this.player.inventory['behemoth skin'] = {
            amount: 1,
            action: ItemActions.behemothSkin
          }
          this.player.maxHp += Math.floor(this.player.hp)
          break
        case 5:
          this.player.inventory['life stone'] = {
            amount: 1,
            action: ItemActions.lifeStone
          },
          this.player.inventory['orchrish blade'] = {
            amount: 1,
            action: ItemActions.orchrishBlade
          }
          this.player.maxHp += Math.floor(this.player.hp/3)
          break
        case 6:
          this.player.inventory['hi-potion'].amount += 4
          this.player.inventory['revive'] = {
            amount: 1,
            action: ItemActions.revive
          }
          this.player.maxHp += Math.floor(this.player.hp/2)
          break
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
