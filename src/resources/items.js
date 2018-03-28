import { master } from '../main'
var dices = require('./dices')

export default {
  potion(data, actor, enemy){
    if (actor.hp >= actor.maxHp) {
      data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
    }
    else{
      let gain = 20
      data.logs.unshift(actor.name+' uses a potion restoring '+gain+' HP!')
      if (actor.hp + gain > actor.maxHp) {
        actor.hp = actor.maxHp
      }
      else{
        actor.hp += gain
      }
    }
  },

  hiPotion(data, actor, enemy){
    if (actor.hp >= actor.maxHp) {
      data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
    }
    else{
      let gain = 32
      data.logs.unshift(actor.name+' uses a hi-potion restoring '+gain+' HP!')
      if (actor.hp + gain > actor.maxHp) {
        actor.hp = actor.maxHp
      }
      else{
        actor.hp += gain
      }
    }
  },

  silverShuriken(data, actor, enemy){
    if (enemy.hp <= 0) {
      data.logs.unshift(actor.name+' uses silver shuriken but '+enemy.name+' was already dead!')
    }
    else{
      let damage
      if (enemy.weakness === 2) {
        damage = 12+dices.d20()
      }
      else{
        damage = 6+dices.d8()
      }
      data.logs.unshift(actor.name+' uses a silver shuriken dealing dealing a damage of '+damage+'!')
      if (enemy.hp > damage) {
        enemy.hp -= damage
      }
      else{
        enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  },

  iceMagicite(data, actor, enemy){
    if (enemy.hp <= 0) {
      data.logs.unshift(actor.name+' uses ice magicite but '+enemy.name+' was already dead!')
    }
    else{
      let damage
      if (enemy.weakness === 3) {
        damage = 15+dices.d10()+dices.d10()
      }
      else{
        damage = 5+dices.d10()
      }
      data.logs.unshift(actor.name+' uses an ice magicite dealing a damage of '+damage+'!')
      if (enemy.hp > damage) {
        enemy.hp -= damage
      }
      else{
        enemy.hp = 0
        master.$emit('enemyDefeated')
      }
    }
  },

  behemothSkin(data, actor, enemy){
    actor.ca += 2
    data.logs.unshift(actor.name+' is now wearing the Behemoth Skin!')
  },

  lifeStone(data, actor, enemy){
    actor.hp = actor.maxHp
    data.logs.unshift(actor.name+' used a Life Stone restoring his full health!')
  },

  orchrishBlade(data, actor, enemy){
    actor.damage = function() {return dices.d10()+dices.d10()}
    data.logs.unshift(actor.name+' is now using an orchrish blade!')
  },

  phoenixDown(data, actor, enemy){
    if (actor.hp === 0) {
      actor.hp = 100
      data.logs.unshift('Its a miracle! '+actor.name+' is back to life!')
    }
    else {
      data.logs.unshift(actor.name+' tried to use Phoenix Down but he miss!')
    }
  }
}
