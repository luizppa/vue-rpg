import { master } from '../main'
var dices = require('./dices')

export default {
  cure: {
    cost: 15,
    action(data){
      if (data.player.hp >= data.player.maxHp) {
        data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 9 + dices.d8()
        data.logs.unshift(data.player.name+' uses cure restoring '+gain+' HP!')
        if (data.player.hp + gain > data.player.maxHp) {
          data.player.hp = data.player.maxHp
        }
        else{
          data.player.hp += gain
        }
      }
    }
  },

  cura: {
    cost: 23,
    action(data){
      if (data.player.hp >= data.player.maxHp) {
        data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 18 + dices.d10()
        data.logs.unshift(data.player.name+' uses cura restoring '+gain+' HP!')
        if (data.player.hp + gain > data.player.maxHp) {
          data.player.hp = data.player.maxHp
        }
        else{
          data.player.hp += gain
        }
      }
    }
  },

  curaga: {
    cost: 28,
    action(data){
      if (data.player.hp >= data.player.maxHp) {
        data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 23 + dices.d12()
        data.logs.unshift(data.player.name+' uses curaga restoring '+gain+' HP!')
        if (data.player.hp + gain > data.player.maxHp) {
          data.player.hp = data.player.maxHp
        }
        else{
          data.player.hp += gain
        }
      }
    }
  },

  curaja: {
    cost: 36,
    action(data){
      if (data.player.hp >= data.player.maxHp) {
        data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 28 + dices.d12()
        data.logs.unshift(data.player.name+' uses curaja restoring '+gain+' HP!')
        if (data.player.hp + gain > data.player.maxHp) {
          data.player.hp = data.player.maxHp
        }
        else{
          data.player.hp += gain
        }
      }
    }
  },

  renew: {
    cost: 100,
    action(data){
      if (data.player.hp >= data.player.maxHp) {
        data.logs.unshift(data.player.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = dices.d20() + dices.d20()
        data.logs.unshift(data.player.name+' uses cura restoring '+gain+' HP!')
        if (data.player.hp + gain > data.player.maxHp) {
          data.player.hp = data.player.maxHp
        }
        else{
          data.player.hp += gain
        }
      }
    }
  },

  drain: {
    cost: 25,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses drain but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage = 8+dices.d12()
        if (data.enemy.weakness === 0) {
          data.logs.unshift(data.player.name+' uses drain but '+data.enemy.name+' is an undead and his life essence is poisonous!')
          if (data.enemy.maxHp - data.enemy.hp > damage) data.enemy.hp += damage
          else{
            data.enemy.hp = data.enemy.maxHp
          }
          if(data.player.hp > damage) data.player.hp -= damage
          else {
            data.player.hp = 0
            data.logs.unshift('You died :(')
          }
        }
        else{
          data.logs.unshift(data.player.name+' uses drain stealing '+damage+' HP from '+data.enemy.name+'!')
          if (data.enemy.hp > damage) data.enemy.hp -= damage
          else{
            data.enemy.hp = 0
            master.$emit('enemyDefeated')
          }
          if(data.player.maxHp - data.player.hp > damage) data.player.hp += damage
          else data.player.hp = data.player.maxHp
        }
      }
    }
  },

  blizzard: {
    cost: 16,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses blizzard but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage
        if (data.enemy.weakness === 3) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(data.player.name+' uses blizzard dealing a damage of '+damage+'!')
        if (data.enemy.hp > damage) {
          data.enemy.hp -= damage
        }
        else{
          data.enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  fire: {
    cost: 16,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses fire but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage
        if (data.enemy.weakness === 1) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(data.player.name+' uses fire dealing a damage of '+damage+'!')
        if (data.enemy.hp > damage) {
          data.enemy.hp -= damage
        }
        else{
          data.enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  thunder: {
    cost: 16,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses thunder but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage
        if (data.enemy.weakness === 4) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(data.player.name+' uses thunder dealing a damage of '+damage+'!')
        if (data.enemy.hp > damage) {
          data.enemy.hp -= damage
        }
        else{
          data.enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  air: {
    cost: 16,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses air but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage
        if (data.enemy.weakness === 5) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(data.player.name+' uses air dealing a damage of '+damage+'!')
        if (data.enemy.hp > damage) {
          data.enemy.hp -= damage
        }
        else{
          data.enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  water: {
    cost: 16,
    action(data){
      if (data.enemy.hp <= 0) {
        data.logs.unshift(data.player.name+' uses water but '+data.enemy.name+' was already dead!')
      }
      else{
        let damage
        if (data.enemy.weakness === 6) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(data.player.name+' uses water dealing a damage of '+damage+'!')
        if (data.enemy.hp > damage) {
          data.enemy.hp -= damage
        }
        else{
          data.enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },
}
