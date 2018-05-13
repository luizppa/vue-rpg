import { master } from '../main'
var dices = require('./dices')

export default {
  cure: {
    cost: 15,
    action(data, actor, target){
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
    action(data, actor, target){
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
    action(data, actor, target){
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
    action(data, actor, target){
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
    action(data, actor, target){
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
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses drain but '+target.name+' was already dead!')
      }
      else{
        let damage = 8+dices.d12()
        if (target.weakness === 0) {
          data.logs.unshift(actor.name+' uses drain but '+target.name+' is an undead and his life essence is poisonous!')
          if (target.maxHp - target.hp > damage) target.hp += damage
          else{
            target.hp = target.maxHp
          }
          if(actor.hp > damage) actor.hp -= damage
          else {
            actor.hp = 0
            data.logs.unshift('You died :(')
          }
        }
        else{
          data.logs.unshift(actor.name+' uses drain stealing '+damage+' HP from '+target.name+'!')
          if (target.hp > damage) target.hp -= damage
          else{
            target.hp = 0
            master.$emit('targetDefeated')
          }
          if(actor.maxHp - actor.hp > damage) actor.hp += damage
          else actor.hp = actor.maxHp
        }
      }
    }
  },

  blizzard: {
    cost: 16,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses blizzard but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness === 3) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses blizzard dealing a damage of '+damage+'!')
        if (target.hp > damage) {
          target.hp -= damage
        }
        else{
          target.hp = 0
          master.$emit('targetDefeated')
        }
      }
    }
  },

  fire: {
    cost: 16,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses fire but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness === 1) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses fire dealing a damage of '+damage+'!')
        if (target.hp > damage) {
          target.hp -= damage
        }
        else{
          target.hp = 0
          master.$emit('targetDefeated')
        }
      }
    }
  },

  thunder: {
    cost: 16,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses thunder but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness === 4) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses thunder dealing a damage of '+damage+'!')
        if (target.hp > damage) {
          target.hp -= damage
        }
        else{
          target.hp = 0
          master.$emit('targetDefeated')
        }
      }
    }
  },

  air: {
    cost: 16,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses air but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness === 5) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses air dealing a damage of '+damage+'!')
        if (target.hp > damage) {
          target.hp -= damage
        }
        else{
          target.hp = 0
          master.$emit('targetDefeated')
        }
      }
    }
  },

  water: {
    cost: 16,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses water but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness === 6) {
          damage = 10+dices.d10()+dices.d10()+dices.d10()
        }
        else{
          damage = dices.d12()+dices.d10()
        }
        data.logs.unshift(actor.name+' uses water dealing a damage of '+damage+'!')
        if (target.hp > damage) {
          target.hp -= damage
        }
        else{
          target.hp = 0
          master.$emit('targetDefeated')
        }
      }
    }
  },

  inferno: {
    cost: 36,
    action(data, actor, target){
      if (target.hp <= 0) {
        data.logs.unshift(actor.name+' uses inferno but '+target.name+' was already dead!')
      }
      else{
        let damage
        if (target.weakness == 1) damage = 50+dices.d20()+dices.d20()+dices.d20()
        else damage = 30+dices.d20()+dices.d20()
        if (dices.d2() > 1) {
          data.logs.unshift(actor.name+' unleashes inferno upon '+target.name+' causing a giant amount of damage!')
          if (target.hp > damage) {
            target.hp -= damage
          }
          else{
            target.hp = 0
          }
        }
        else{
          data.logs.unshift(actor.name+' unleashes inferno upon '+target.name+' but he is unlucky and its not very effective!')
          if (target.hp > 8) {
            target.hp -= 8
          }
          else{
            target.hp = 0
            if(target == data.player) master.$emit('targetDefeated')
          }
        }
      }
    }
  }
}
