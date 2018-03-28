// eslint-disable-next-line
import { master } from '../main'
// eslint-disable-next-line
var dices = require('./dices')

export default {
  // eslint-disable-next-line
  bark(data, actor, enemy){
    actor.status.push('blood thirsty')
    data.logs.unshift(actor.name+' uses Bark and is now blood thirsty!')
  }
}
