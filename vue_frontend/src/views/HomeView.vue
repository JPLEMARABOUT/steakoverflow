<template>
  <HelloWorld />
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

export default Vue.extend({
  name: 'HomeBase',

  components: {
    HelloWorld
  }
})
</script>
