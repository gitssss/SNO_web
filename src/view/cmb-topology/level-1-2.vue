
<template>
  <Topology :elements="elements" :layout="layout"></Topology>
</template>

<script>
  import Topology from '@/components/topology/topology.vue'
  import elements from "./elements/level-1-2.js";
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
      // this.setElements ()
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
            _this.$router.push("/level-2-sh-op")
          });
          cy.on('tap', '#SZ7FC06U26-BB1-PE01-A9K, #SZ7FG06U09-BB1-PE02-A9K', function () {
            _this.$router.push("/level-2-sh-op")
          })
        })
      }
      // setElements () {
      //   let url = "./data/level-1-2.json"
      //   this.$axios.get(url).then(res=>{
      //     var elements = res.data;
      //     this.$store.commit('setElements', elements)
      //     console.log(this.$store.state.elements)
      //   })
      // }
    },
    // computed:{
    //   elements:function () {
    //     return this.$store.state.elements||''
    //   }
    // },
    
  }
</script>

<style>

</style>