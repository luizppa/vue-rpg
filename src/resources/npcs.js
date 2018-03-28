import items from './items'
// eslint-disable-next-line
import magics from './magics'
import techniques from './techniques'
var dices = require('./dices.js')

export default {
  enemies: [
    {
      level: 1,
      name: 'Skelleton',
      damageCalc: dices.d8,
      status: [],
      hp: 70,
      maxHp: 70,
      weakness: 0, // Holy
      action(data){
        data.attack()
      }
    },
    {
      level: 2,
      name: 'Bandit Captain',
      damageCalc: dices.d8,
      status: [],
      hp: 100,
      maxHp: 100,
      weakness: 1, // Fire
      inventory: {
        potion: {
          amount: 1,
          action: items.potion
        }
      },
      action(data){
        if (this.hp <= 20 && this.inventory.potion.amount > 0) {
          this.inventory.potion.amount--
          this.inventory.potion.action(data, this, data.player)
        }
        else data.attack()
      }
    },
    {
      level: 3,
      name: 'Werewolf',
      damageCalc: dices.d10,
      status: [],
      hp: 115,
      maxHp: 115,
      weakness: 2, // Silver
      action(data){
        if(this.hp < 40 && !this.status.includes('blood thirsty')) techniques.bark(data, this, this.player)
        else data.attack()
      }
    },
    {
      level: 4,
      name: 'Behemoth',
      damageCalc: function(){return dices.d8() + dices.d8()},
      status: [],
      hp: 130,
      maxHp: 130,
      weakness: 3, // Ice
      action(data){
        data.attack()
      }
    },
    {
      level: 5,
      name: 'Orc Leader',
      damageCalc: function(){return dices.d12() + dices.d8()},
      status: [],
      hp: 145,
      maxHp: 145,
      weakness: 1, // Fire
      action(data){
        data.attack()
      }
    },
    {
      level: 6,
      name: 'Troll',
      damageCalc: function(){return dices.d12() + dices.d20()},
      status: [],
      hp: 160,
      maxHp: 160,
      weakness: 3, // Ice
      action(data){
        data.attack()
      }
    },
    {
      level: 7,
      name: 'Dragon Priest',
      damageCalc: function(){return dices.d10() + dices.d20()},
      status: [],
      hp: 180,
      maxHp: 180,
      weakness: 0, // Holy
      action(data){
        data.attack()
      }
    },
    {
      level: 8,
      name: 'Giant',
      damageCalc: function(){return dices.d12() + dices.d12() + dices.d12()},
      status: [],
      hp: 190,
      maxHp: 190,
      weakness: 3, // Ice
      action(data){
        data.attack()
      }
    },
    {
      level: 9,
      name: 'Golem',
      damageCalc: function(){return dices.d20() + dices.d20()},
      status: [],
      hp: 210,
      maxHp: 210,
      weakness: 1, // Fire
      action(data){
        data.attack()
      }
    },
    {
      level: 10,
      name: 'Dragon',
      damageCalc: function(){return dices.d20() + dices.d20() + dices.d10()},
      status: [],
      hp: 230,
      maxHp: 230,
      weakness: 3, // Ice
      action(data){
        data.attack()
      }
    }
  ]
}
