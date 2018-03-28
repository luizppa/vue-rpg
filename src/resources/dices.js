module.exports = {
  rollDice(min, max) {
    return Math.floor(Math.random() * ((max+1) - min)) + min
  },
  d100(){
    return module.exports.rollDice(1, 100)
  },
  d20(){
    return module.exports.rollDice(1, 20)
  },
  d12(){
    return module.exports.rollDice(1, 12)
  },
  d10(){
    return module.exports.rollDice(1, 10)
  },
  d8(){
    return module.exports.rollDice(1, 8)
  },
  d6(){
    return module.exports.rollDice(1, 6)
  },
  d4(){
    return module.exports.rollDice(1, 4)
  },
  d3(){
    return module.exports.rollDice(1, 3)
  },
  d2(){
    return module.exports.rollDice(1, 2)
  }
}
