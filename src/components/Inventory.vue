<template>
  <div>
    <p align="center" class="title">Inventory</p>
    <!-- eslint-disable-next-line -->
    <div class="slot" v-for="(details, item) of inventory" @click="use(item)">
      <button v-if="details.amount > 0" type="button" class="btn btn-primary">{{ item }}: {{ details.amount }}</button>
    </div>
  </div>
</template>

<script>
import { actions } from '../main'

export default {
  created(){
  },
  props: ['inventory'],
  methods: {
    use(item){
      actions.$emit('itemUsed', item)
    }
  }
}
</script>

<style scoped>
  .title{
    font-family: 'Ewert', cursive;
    font-size: 30px;
  }
  .slot{
    display: inline-block;
    /* box-shadow: 0px 0px 5px #A2A2A2; */
    /* padding: 2% 3% 2% 3%; */
    margin: 2%;
    /* cursor: pointer; */
  }
  .item{
  }
  @import'~bootstrap/dist/css/bootstrap.css';
</style>
