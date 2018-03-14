<template lang="html">
  <div class="game">
    <div class="row">
      <div class="col-md-6">
        <p align="center">PLAYER</p>
        <div class="bar">
          <div class="health" :style="playerHealth">
            <p class="status">{{ playerHp }}/100</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <p align="center">MONSTER</p>
        <div class="bar">
          <div class="health" :style="monsterHealth">
            <p class="status">{{ monsterHp }}/100</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-mad-6">
        <p>Potions: {{ potions }}</p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-danger" :disabled="playerHp <= 0" @click="atack">ATACK</button>
        </div>
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-success" :disabled="playerHp <= 0" @click="heal">HEAL</button>
        </div>
        <div class="col-xs-4" align="center">
          <button type="button" class="btn btn-primary" @click="restart">RESTART</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-8 col-md-offset-2" align="center" v-for="log in logs">
        <p class="log">{{ log }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      playerHp: 100,
      monsterHp: 100,
      potions: 5,
      logs: []
    }
  },

  computed: {
    playerHealth: function(){
      return {
        width: this.playerHp+'%',
        backgroundColor: '#45EE00'
      }
    },
    monsterHealth: function(){
      return {
        width: this.monsterHp+'%',
        backgroundColor: '#F00'
      }
    }
  },

  methods: {
    restart(){
      this.monsterHp = 100
      this.playerHp = 100
      this.logs = []
    },
    monsterTurn(){
      this.monsterAtack()
    },
    atack(){
      if (this.monsterHp <= 0) {
        this.logs.unshift('The monster is already dead!')
      }
      else{
        let row = this.d20()
        if (row >= 19){
          let damage = this.d10()+this.d10()
          this.logs.unshift('Player atacks dealing a critical damage of '+damage+'!')
          if(this.monsterHp <= damage){
            this.monsterHp = 0
            this.logs.unshift('The monster is dead! Player wins!')
          }
          else{
            this.monsterHp -= damage
          }
        }
        else if (row >= 6) {
          let damage = this.d10()
          this.logs.unshift('Player atacks dealing a damage of '+damage+'!')
          if(this.monsterHp <= damage){
            this.monsterHp = 0
            this.logs.unshift('The monster is dead! Player wins!')
          }
          else{
            this.monsterHp -= damage
          }
        }
        else{
          this.logs.unshift('Player atacks but he miss!')
        }
      }
      if (this.monsterHp > 0) {
        this.monsterTurn()
      }
    },
    monsterAtack(){
      let row = this.d20()
      if (row >= 19){
        let damage = this.d10()+this.d10()
        this.logs.unshift('Monster atacks dealing a critical damage of '+damage+'!')
        if(this.playerHp <= damage){
          this.playerHp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.playerHp -= damage
        }
      }
      else if (row >= 6) {
        let damage = +this.d10()
        this.logs.unshift('Monster atacks dealing a damage of '+damage+'!')
        if(this.playerHp <= damage){
          this.playerHp = 0
          this.logs.unshift('You died :(')
        }
        else{
          this.playerHp -= damage
        }
      }
      else{
        this.logs.unshift('Monster atacks but he miss!')
      }
    },
    heal(){
      if (this.potions > 0) {
        this.potions -= 1
        if (this.playerHp >= 100) {
          this.logs.unshift('Player tries to heal but he is already on full health!')
        }
        else{
          let potion = this.d10()
          this.logs.unshift('Player uses a potion restoring '+potion+' HP!')
          if (this.playerHp + potion > 100) {
            this.playerHp = 100
          }
          else{
            this.playerHp += potion
          }
        }
      }
      else{
        this.logs.unshift('Player tries to heal but he has no potions left!')
      }
      if (this.monsterHp > 0) {
        this.monsterTurn()
      }
    },
    d20(){
      return this.rowDice(1, 20)
    },
    d10(){
      return this.rowDice(1, 6)
    },
    rowDice(min, max) {
      return Math.floor(Math.random() * ((max+1) - min)) + min
    }
  }
}
</script>

<style>
.game{
  font-family: 'Inknut Antiqua', serif;
}
.bar{
  height: 30px;
  width: 100%;
  border: 1px solid black;
}
.health{
  height: 100%;
}
.status{
  color: white;
  margin: 0;
  padding: 1%
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
