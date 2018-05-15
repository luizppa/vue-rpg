/*
  This file describes techniques, mostly used by the enemy characters, thechniques
  must always be functions and the pattern is to get as arguments:
  data - reffer to the environment of the game (almost every variable is there)
  actor - the character that performs the action, use it to log names and execute actions
  target - the target of the technique (usually, the technique effects will be applied over this variable)
*/

// eslint-disable-next-line
import { master } from '../main'
// eslint-disable-next-line
var dices = require('./dices')

export default {
  // eslint-disable-next-line
  bark(data, actor, target){
    actor.status.push('blood thirsty')
    data.logs.unshift(actor.name+' uses Bark and is now blood thirsty!')
  },

  raid(data, actor, target){
    data.attack()
    target.status.push('stunned')
    data.logs.unshift(actor.name+' is taken by anger and unleashes a fierce attack causing '+target.name+' to be stunned!')
  },

  beserk(data, actor, target){
    actor.status.push('beserk')
    data.logs.unshift(actor.name+' uses beserk and will now attack more fiercely!')
  }
}
