<template lang="html">
  <div class="events-list">

      <div class="mt-20">
          <!-- On va charge une liste de composant item pour afficher chaque événement -->
          <event-item v-for="(e, index) in events" :event="e" :position="index"></event-item>
      </div>
  </div>
</template>

<script>
/* On importe les composants de ce composant et ceux externe */
import eventItem from './item.vue'

export default {
    name: 'events-list',
    props: ['events'],
    components: {
        eventItem
    },
    // Les données utilisées dans la page
    data () {
        return {
        }
    },
    // Ce qui se passe au chargement de la page
    mounted() {
        //console.log(this.events);
    },

    // Calcul de champs
    computed: {
        total () {
            return this.events.length
        },


    }
}
</script>

<style lang="scss">
.events-list {
    width:100%;
    height: calc(100vh - 70px);
    margin-top:20px;
    overflow: scroll;

    h4 {
        font-size: 20px;
        font-weight: 500;
        font-family: Athiti, 'Open Sans', Calibri, sans-serif;
    }
}

@media (max-width:768px) {
    .tutors-list {
        margin-top:10px;
    }
}
</style>
