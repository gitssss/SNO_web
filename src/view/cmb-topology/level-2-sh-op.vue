
<template>
  <Topology :elements="elements" :layout="layout"></Topology>
</template>

<script>
  import Topology from '@/components/topology/topology.vue'
  import elements from "./elements/level-2-sh-op.js";
  import layout from './configs/layout2'

  export default {
    components: {
      Topology
    },
    data () {
      return {
        elements: elements,
        layout: layout,
      }
    },
    created: function () {
      //
    },
    mounted () {
      
    },
    methods: {
      
    },
    
  }
</script>

<style>

</style>