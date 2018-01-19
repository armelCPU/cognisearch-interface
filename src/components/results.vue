<template lang="html">
    <div class="container">
         <div class="mt-50">
             <h1>Résultats</h1>
         </div>
          <div class="row mb-70">
              <div class="col-sm-6">
                  <events-list :events="events"></events-list>
              </div>

              <div class="col-sm-6">
                  <result-map :events="events" :markers="markers"></result-map>
              </div>
          </div>
      </div>
</template>

<script>

/* On importe les composants de ce composant et ceux externe */
import eventsList from '@/components/events.vue'
import resultMapComponent from '@/components/result_map.vue'

export default {
    name: 'results',
    data () {
        return {
            markers: []
        }
    },
    components: {
            eventsList, resultMapComponent
    },

    computed : {
        events () {
            return this.$store.state.results
        },
    },

    watch : {
        events : function () {
            this.buildMarkers()
        }
    },

    mounted () {
    },


  methods: {
      buildMarkers() {
          this.markers = []
          let pos = 0
          this.events.forEach(el => {
              ++pos
              if (el.venue){
                  let marker = {
                      position:{
                          lat: parseFloat(el.venue.location.lat),
                          lng: parseFloat(el.venue.location.lon)
                      },
                      rank: '' +pos
                  }

                  this.markers.push(marker)
              }
          })
      }
  }
}
</script>

<style lang="css">
</style>
