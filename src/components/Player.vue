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
import ItemActions from '../resources/items'

export default {
  props: ['enemy', 'logs'],
  data: function(){
    return {
      player: {
        name: 'Player',
        ca: 5,
        hp: 100,
        maxHp: 100,
        damage: master.d10,
        inventory: {
          potion: {
            amount: 1,
            action: ItemActions.potion
          }
        },
        magic: {

        }
      }
    }
  },
  created(){
    master.$emit('newPlayer', this.player)
    actions.$on('attack', this.attack)
    actions.$on('itemUsed', this.use)
  },
  methods: {
    attack(){
      if (this.enemy.hp <= 0) {
        this.logs.unshift(this.enemy.name+' is already dead!')
      }
      else{
        let row = master.d20()
        if (row >= 19){
          let damage = this.player.damage()+this.player.damage()
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
          this.player.inventory[item].action(this)
        }
        else{
          this.logs.unshift(this.player.name+' tries to use '+item+' but he has none left!')
        }
        master.$emit('enemyTurn')
      }
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
