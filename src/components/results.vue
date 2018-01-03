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
            events: [],
            markers: []
        }
    },
    components: {
            eventsList, resultMapComponent
    },

    mounted () {
        this.events = [
            {
                rank: '1',
                name: 'Bruno Mars à Paris',
                categories: ['Spectacle Musical', 'Rockn Roll'],
                date: '20 Novembre 2017',
                venue: {
                    name :'Bataclan - Paris',
                    location: {lat: 48.863, lng: 2.368}
                },
                hour: '20h00',
                performers: [
                    {
                        name: 'Jean Bruno',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Fingon Tralala',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Tagne Condom',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Willy de Paris',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Edoudoua Non Glacé',
                        uri: 'http://www.ontology.com/JB'
                    }
                ],
                duration: '45 min',
                source: ['http://www.source1.fr', 'http://www.source2.fr', 'http://www.source3.fr']
            },

            {
                rank: '2',
                name: 'Les vieilles Canailles cassent la Baraque !',
                categories: ['Tournée Musicale', 'Folk', 'Pop'],
                date: '08 Mars 2018',
                venue: {
                    name :'Bikini Toulouse',
                    location: {lat: 43.548, lng: 1.4834}
                },
                performers: [
                    {
                        name: 'Johnny Hallyday',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Eddy Mitchel',
                        uri: 'http://www.ontology.com/JB'
                    },
                    {
                        name: 'Jacques Dutronc',
                        uri: 'http://www.ontology.com/JB'
                    }
                ],
                source: ['http://www.source1.fr', 'http://www.source2.fr']
            },

            {
                rank: '3',
                name: 'Cirque de Gutemberg',
                venue: {
                    name :'Zénith Pau - Rue Suzanne Bacarisse, 64000 Pau',
                    location: {lat: 43.335524, lng: -0.364982}
                },
                source: ['http://www.source1.fr']
            }
        ]

        this.buildMarkers()
    },


  methods: {
      buildMarkers() {
          this.events.forEach(el => {
              if (el.venue){
                  let marker = {
                      position:{
                          lat: parseFloat(el.venue.location.lat),
                          lng: parseFloat(el.venue.location.lng)
                      },
                      rank: el.rank
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
