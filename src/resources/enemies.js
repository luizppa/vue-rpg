var dices = require('./dices.js')

module.exports = {
  enemies: [
    {
      level: 1,
      name: 'Skelleton',
      damageCalc: dices.d8,
      hp: 70,
      maxHp: 70,
      weakness: 0 // Holy
    },
    {
      level: 2,
      name: 'Bandit Captain',
      damageCalc: dices.d8,
      hp: 100,
      maxHp: 100,
      weakness: 1 // Fire
    },
    {
      level: 3,
      name: 'Werewolf',
      damageCalc: dices.d10,
      hp: 115,
      maxHp: 115,
      weakness: 2 // Silver
    },
    {
      level: 4,
      name: 'Behemoth',
      damageCalc: function(){return dices.d8() + dices.d8()},
      hp: 140,
      maxHp: 140,
      weakness: 3 // Ice
    },
    {
      level: 5,
      name: 'Orc Leader',
      damageCalc: function(){return dices.d12() + dices.d8()},
      hp: 150,
      maxHp: 150,
      weakness: 1 // Fire
    },
    {
      level: 6,
      name: 'Dragon Priest',
      damageCalc: function(){return dices.d10() + dices.d20()},
      hp: 160,
      maxHp: 160,
      weakness: 0 // Holy
    },
    {
      level: 7,
      name: 'Giant',
      damageCalc: function(){return dices.d20() + dices.d20()},
      hp: 180,
      maxHp: 180,
      weakness: 3 // Ice
    }
  ]
}
