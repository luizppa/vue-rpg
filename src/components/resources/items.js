import { master } from '../../main'

export default {
  potion(data){
    if (data.player.hp >= data.player.maxHp) {
      data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
    }
    else{
      let gain = master.d12()
      data.logs.unshift(data.player.name+' uses a potion restoring '+gain+' HP!')
      if (data.player.hp + gain > data.player.maxHp) {
        data.player.hp = data.player.maxHp
      }
      else{
        data.player.hp += gain
      }
    }
  },

  silverShuriken(data){
    if (data.enemy.hp <= 0) {
      data.logs.unshift(data.player.name+' uses silver shuriken but '+data.enemy.name+' was already dead!')
    }
    else{
      let damage
      if (data.enemy.weakness === 2) {
        damage = 6+master.d20()
      }
      else{
        damage = 6+master.d8()
      }
      data.logs.unshift(data.player.name+' uses a silver shuriken dealing dealing a damage of '+damage+'!')
      if (data.enemy.hp > damage) {
        data.enemy.hp -= damage
      }
      else{
        data.enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  },

  iceMagicite(data){
    if (data.enemy.hp <= 0) {
      data.logs.unshift(data.player.name+' uses ice magicite but '+data.enemy.name+' was already dead!')
    }
    else{
      let damage
      if (data.enemy.weakness === 3) {
        damage = 10+master.d10()+master.d10()
      }
      else{
        damage = 5+master.d10()
      }
      data.logs.unshift(data.player.name+' uses an ice magicite dealing a damage of '+damage+'!')
      if (data.enemy.hp > damage) {
        data.enemy.hp -= damage
      }
      else{
        data.enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  }
}
