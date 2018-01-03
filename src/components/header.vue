<template lang="html">
    <section class="home-search">
           <div class="container">
               <div class="mt-20">
                   <h1>Critères de recherche</h1>
               </div>
               <div class="search-container">
                   <form class="form" @submit.prevent="verifications()">
                       <div class="quick-search">

                           <div class="search">
                               <!-- Ligne Catégorie et lieu -->

                               <div class="row mt-20">
                                   <div class="col-md-5 input-holder no-drop">
                                       <label>Lieu</label>
                                       <multiselect
                                           v-model="place"
                                           placeholder="Entrez le lieu"
                                           :multiple="true"
                                           open-direction="bottom"
                                           :searchable="true"
                                           label="name"
                                           :loading="isLoading"
                                           :internal-search="false"
                                           :clear-on-select="true"
                                           :close-on-select="false"
                                           :options-limit="300"
                                           :limit="5"
                                           :limit-text="limitText"
                                           :max-height="600"
                                           :show-no-results="false"
                                           @search-change="findPlaces"
                                           track-by="id"
                                           :options="places">

                                           <template slot="clear" scope="props">
                                               <div class="multiselect__clear" v-if="categories.length" @mousedown.prevent.stop="clearAll()"></div>
                                           </template>
                                           <span slot="noResult">Oops! Aucun résultat</span>

                                       </multiselect>

                                   </div>

                                    <div class="col-md-6 input-holder no-drop">
                                        <label>Catégorie</label>
                                        <multiselect
                                            v-model="category"
                                            placeholder="Entrez le(s) type(s) d'événements"
                                            :multiple="true"
                                            open-direction="bottom"
                                            :searchable="true"
                                            label="name"
                                            :loading="isLoading"
                                            :internal-search="false"
                                            :clear-on-select="true"
                                            :close-on-select="false"
                                            :options-limit="300"
                                            :limit="5"
                                            :limit-text="limitText"
                                            :max-height="600"
                                            :show-no-results="false"
                                            @search-change="findCategories"
                                            track-by="id"
                                            :options="categories">

                                            <template slot="clear" scope="props">
                                                <div class="multiselect__clear" v-if="categories.length" @mousedown.prevent.stop="clearAll()"></div>
                                            </template>
                                            <span slot="noResult">Oops! Aucun résultat</span>

                                        </multiselect>

                                    </div>

                                </div>

                               <!-- Ligne Intervenant et date -->
                               <div class="row mt-20">
                                    <div class="col-md-5 input-holder no-drop">
                                        <label>Date</label>
                                        <datepicker
                                        v-model="state.date"
                                        :value="state.date"
                                        :input-class="'form-control input-lg input-white'">
                                        </datepicker>
                                    </div>

                                    <div class="col-md-6 input-holder no-drop">
                                        <label>Intervenants</label>
                                        <multiselect
                                            v-model="performer"
                                            placeholder="Entrez le(s) intervenant(s) ciblés"
                                            :multiple="true"
                                            open-direction="bottom"
                                            :searchable="true"
                                            label="name"
                                            :loading="isLoading"
                                            :internal-search="false"
                                            :clear-on-select="true"
                                            :close-on-select="false"
                                            :options-limit="300"
                                            :limit="5"
                                            :limit-text="limitText"
                                            :max-height="600"
                                            :show-no-results="false"
                                            @search-change="findPerformers"
                                            track-by="id"
                                            :options="performers">

                                            <template slot="clear" scope="props">
                                                <div class="multiselect__clear" v-if="categories.length" @mousedown.prevent.stop="clearAll()"></div>
                                            </template>
                                            <span slot="noResult">Oops! Aucun résultat</span>

                                        </multiselect>

                                    </div>
                                </div>
                           </div>
                                                      <!-- Recherche et options -->
                           <div class="row mt-20">
                               <div class="col-sm-4 col-md-4">
                                   <button type="submit" class="btn btn-block btn-lg btn-green">
                                       Rechercher
                                   </button>
                               </div>

                               <div class="col-sm-4 col-md-4">
                                   <a class="btn btn-lg btn-blue" @click="showMore = !showMore">
                                       <i class="flaticon-down hidden-sm"></i> Critères Avancés
                                   </a>
                               </div>
                           </div>
                       </div>
                   </form>
               </div>

           </div>
       </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Home',
  data () {
    return {
      search: {},
      showMore: true,
      isLoading: false,
      categories: [],
      allCategories: [],
      category: [],
      places: [],
      allPlaces: [],
      performer: [],
      performers: [],
      allPerformers: [],
      place: [],
      showMore: false,
      state: {},
    }
  },

  components: { Multiselect, Datepicker },

  methods: {
      asyncFind (query) {
         if (query.length > 1) {
             this.isLoading = true
             axios.get('/api/categories?keywords=' + query)
             .then(response => {
                 this.categories = response.data
                 this.isLoading = false
             })
             .catch(error => {
                 console.log(error)
                 this.isLoading = false
             })
         }
     },

     /**
      * Filtre les catégories pour ne selectionner que celles qui contiennent query
      * @param  {[type]} query [description]
      * @return {[type]}       [description]
      */
     findCategories (query) {
         this.categories = this.allCategories.filter(c => {
             return c.name.toLowerCase().includes(query)
         })
     },

     findPlaces (query) {
         this.places = this.allPlaces.filter(c => {
             return c.name.toLowerCase().includes(query)
         })
     },

     findPerformers (query) {
         this.performers = this.allPerformers.filter(c => {
             return c.name.toLowerCase().includes(query)
         })
     },

     clearAll () {
         this.categories = []
     },

     limitText (count) {
         return `${count} encore plus`
     },

     verifications () {

     },
 },

 mounted () {
     this.search = {

     }

     this.state = {
         date: new Date(2016, 9,  16)
     }

     this.allCategories = [
         {id: 1, name: 'Concerts', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Concert'},
         {id: 2, name: 'Théâtre', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Theatre'},
         {id: 3, name: 'Festival', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#FestivalDanse'},
         {id: 4, name: 'Musique Classique', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Classique'}
     ]

     this.categories = this.allCategories.splice()

     this.allPlaces = [
         {id: 1, name: 'Paris'},
         {id: 2, name: 'Pau'},
         {id: 3, name: 'Bataclan'},
         {id: 4, name: 'Théâtre Magado'}
     ]

     this.places = this.allPlaces.splice()

     this.allPerformers = [
         {id: 1, name: 'Eddy Malou'},
         {id: 2, name: 'DJ Cerveau'},
         {id: 3, name: 'Soprano'},
         {id: 4, name: 'Equipe des cinglés du Dimanche'}
     ]

     this.performers = this.allPerformers.splice()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
