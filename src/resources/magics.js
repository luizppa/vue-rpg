import { master } from '../main'
var dices = require('./dices')

export default {
  cure: {
    cost: 15,
    action(data, actor, enemy){
      if (actor.hp >= actor.maxHp) {
        data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 9 + dices.d8()
        data.logs.unshift(actor.name+' uses cure restoring '+gain+' HP!')
        if (actor.hp + gain > actor.maxHp) {
          actor.hp = actor.maxHp
        }
        else{
          actor.hp += gain
        }
      }
    }
  },

  cura: {
    cost: 23,
    action(data, actor, enemy){
      if (actor.hp >= actor.maxHp) {
        data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 18 + dices.d10()
        data.logs.unshift(actor.name+' uses cura restoring '+gain+' HP!')
        if (actor.hp + gain > actor.maxHp) {
          actor.hp = actor.maxHp
        }
        else{
          actor.hp += gain
        }
      }
    }
  },

  curaga: {
    cost: 28,
    action(data, actor, enemy){
      if (actor.hp >= actor.maxHp) {
        data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 23 + dices.d12()
        data.logs.unshift(actor.name+' uses curaga restoring '+gain+' HP!')
        if (actor.hp + gain > actor.maxHp) {
          actor.hp = actor.maxHp
        }
        else{
          actor.hp += gain
        }
      }
    }
  },

  curaja: {
    cost: 36,
    action(data, actor, enemy){
      if (actor.hp >= actor.maxHp) {
        data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = 28 + dices.d12()
        data.logs.unshift(actor.name+' uses curaja restoring '+gain+' HP!')
        if (actor.hp + gain > actor.maxHp) {
          actor.hp = actor.maxHp
        }
        else{
          actor.hp += gain
        }
      }
    }
  },

  renew: {
    cost: 100,
    action(data, actor, enemy){
      if (actor.hp >= actor.maxHp) {
        data.logs.unshift(actor.name+' tries to heal but he is already on full health!')
      }
      else{
        let gain = dices.d20() + dices.d20()
        data.logs.unshift(actor.name+' uses cura restoring '+gain+' HP!')
        if (actor.hp + gain > actor.maxHp) {
          actor.hp = actor.maxHp
        }
        else{
          actor.hp += gain
        }
      }
    }
  },

  drain: {
    cost: 25,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses drain but '+enemy.name+' was already dead!')
      }
      else{
        let damage = 8+dices.d12()
        if (enemy.weakness === 0) {
          data.logs.unshift(actor.name+' uses drain but '+enemy.name+' is an undead and his life essence is poisonous!')
          if (enemy.maxHp - enemy.hp > damage) enemy.hp += damage
          else{
            enemy.hp = enemy.maxHp
          }
          if(actor.hp > damage) actor.hp -= damage
          else {
            actor.hp = 0
            data.logs.unshift('You died :(')
          }
        }
        else{
          data.logs.unshift(actor.name+' uses drain stealing '+damage+' HP from '+enemy.name+'!')
          if (enemy.hp > damage) enemy.hp -= damage
          else{
            enemy.hp = 0
            master.$emit('enemyDefeated')
          }
          if(actor.maxHp - actor.hp > damage) actor.hp += damage
          else actor.hp = actor.maxHp
        }
      }
    }
  },

  blizzard: {
    cost: 16,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses blizzard but '+enemy.name+' was already dead!')
      }
      else{
        let damage
        if (enemy.weakness === 3) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses blizzard dealing a damage of '+damage+'!')
        if (enemy.hp > damage) {
          enemy.hp -= damage
        }
        else{
          enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  fire: {
    cost: 16,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses fire but '+enemy.name+' was already dead!')
      }
      else{
        let damage
        if (enemy.weakness === 1) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses fire dealing a damage of '+damage+'!')
        if (enemy.hp > damage) {
          enemy.hp -= damage
        }
        else{
          enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  thunder: {
    cost: 16,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses thunder but '+enemy.name+' was already dead!')
      }
      else{
        let damage
        if (enemy.weakness === 4) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses thunder dealing a damage of '+damage+'!')
        if (enemy.hp > damage) {
          enemy.hp -= damage
        }
        else{
          enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  air: {
    cost: 16,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses air but '+enemy.name+' was already dead!')
      }
      else{
        let damage
        if (enemy.weakness === 5) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses air dealing a damage of '+damage+'!')
        if (enemy.hp > damage) {
          enemy.hp -= damage
        }
        else{
          enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },

  water: {
    cost: 16,
    action(data, actor, enemy){
      if (enemy.hp <= 0) {
        data.logs.unshift(actor.name+' uses water but '+enemy.name+' was already dead!')
      }
      else{
        let damage
        if (enemy.weakness === 6) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses water dealing a damage of '+damage+'!')
        if (enemy.hp > damage) {
          enemy.hp -= damage
        }
        else{
          enemy.hp = 0
          master.$emit('enemyDefeated')
        }
      }
    }
  },
}
