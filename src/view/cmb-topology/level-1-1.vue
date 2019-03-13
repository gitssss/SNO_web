
<template>
  <Topology :elements="elements" :layout="layout"></Topology>
</template>

<script>
  import Topology from '@/components/topology/topology.vue'
  import elements from "./elements/level-1-1.js";
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
      this.cypush ()
    },
    methods: {
      cypush () {
        var currentEdgeIds = this.currentEdgeIds;
        this.$cytoscape.instance.then(cy => {
          var _this = this
          cy.on('tap', '#OP1', function () {
            _this.$router.push("/level-2-sz-op")
          });
          cy.on('tap', '#SZ7FA05U02-OP1-C7KA, #SZ7FA01U02-OP1-C7KB', function () {
            _this.$router.push("/level-2-sz-op")
          })
        })
      }
    },
    
  }
</script>

<style>

</style>