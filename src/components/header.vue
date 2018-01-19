<template lang="html">
    <section class="home-search">
           <div class="container">
               <div class="mt-20">
                   <h1>Critères de recherche</h1>
               </div>
               <div class="search-container">
                   <form class="form">
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
                                   <button type="submit" class="btn btn-block btn-lg btn-green" @click="asyncSearch()">
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
import axios from 'axios';

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
     asyncGetCategories(){
         axios.get('http://localhost:8181/models/categories')
         .then(response => {
             this.allCategories = response.data.results;
             this.categories = this.allCategories.splice()
         })
         .catch(error => {
            console.log('Error ' + error);
         })
     },

     asyncGetPerformers(){
         axios.get('http://localhost:8181/models/performers')
         .then(response => {
             this.allPerformers = response.data.results;
             this.performers = this.allPerformers.splice()
         })
         .catch(error => {
            console.log('Error ' + error);
         })
     },

     asyncGetPlaces(){
         axios.get('http://localhost:8181/models/places')
         .then(response => {
             this.allPlaces = response.data.results;
             this.places = this.allPlaces.splice()
         })
         .catch(error => {
            console.log('Error ' + error);
         })
     },

     asyncSearch(){
         this.buildParams()
         axios.get(this.buildURL('http://localhost:8181/search/simple'))
         .then(response => {
             this.$store.commit('SET_RESULTS', response.data.results)
         })
         .catch(error => {
            console.log('Error ' + error);
        })
     },

     /**
      * Filtre les catégories pour ne selectionner que celles qui contiennent query
      * @param  {[type]} query [description]
      * @return {[type]}       [description]
      */
     findCategories (query) {
         this.categories = this.allCategories.filter(c => {
             return c.name.toLowerCase().includes(query.toLowerCase())
         })
     },

     findPlaces (query) {
         this.places = this.allPlaces.filter(c => {
             return c.name.toLowerCase().includes(query.toLowerCase())
         })
     },

     findPerformers (query) {
         this.performers = this.allPerformers.filter(c => {
             return c.name.toLowerCase().includes(query.toLowerCase())
         })
     },

     clearAll () {
         this.categories = []
     },

     limitText (count) {
         return `${count} encore plus`
     },

    buildParams() {
        /* Building the venue parameter */
        if(this.place.length > 0) {
            let v = ''
            if (this.place[0].points.length <= 1) {
                v += (this.place[0].points[0].lat + 'M' + this.place[0].points[0].lon);
            }
            else {
                for( let i = 0; i < this.place[0].points.length -1 ; i++){
                    v+= (this.place[0].points[i].lat + 'M' + this.place[0].points[i].lon + '@');
                }
                v += (this.place[0].points[this.place[0].points.length -1].lat + 'M' + this.place[0].points[this.place[0].points.length -1].lon);
            }
            this.search.venue = v;
        }

        /* Building the category parameter */
        if (this.category.length > 0) {
            let cat = ''
            for(let i=0; i < this.category.length - 1; i++) {
                cat += (this.category[i].uri.replace('#', '$') + '@')
            }
            cat += this.category[this.category.length - 1].uri.replace('#', '$')
            this.search.category = cat
        }

        /* Building the performers parameter */
        if (this.performer.length > 0) {
            let perf = ''
            for(let i=0; i < this.performer.length - 1; i++) {
                perf += (this.performer[i].name + '@')
            }
            perf += this.performer[this.performer.length - 1].name
            this.search.performers = perf
        }

        /* Building the date parameter */
        if (this.state.date.getUTCFullYear() >= 2018){
            let day = this.state.date.getDate() < 10 ? '0' + this.state.date.getDate() : this.state.date.getDate()
            let month = (this.state.date.getMonth() + 1) < 10 ? '0' + (this.state.date.getMonth() + 1) : (this.state.date.getMonth() + 1)
            this.search.date = this.state.date.getUTCFullYear() + '-' + month + '-' + day
        }
    },

    buildURL(baseURL){
        let url = baseURL
        let keys = Object.keys(this.search)

        if ( keys.length == 0)
            return baseURL

        url +='?'
        keys.forEach( e => {
            url += (e + '=' + this.search[e] + '&')
        })
        // removing the last &
        return url.substring(0, url.length-1)
    }
 },

 mounted () {
     this.search = {

     }

     this.state = {
         date: new Date(2017, 12,  16)
     }

     /*
         {id: 1, name: 'Concerts', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Concert'},
         {id: 2, name: 'Théâtre', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Theatre'},
         {id: 3, name: 'Festival', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#FestivalDanse'},
         {id: 4, name: 'Musique Classique', uri: 'http://www.owl-ontologies.com/categoriesEvt.owl#Classique'}
     ]
     */

     this.asyncGetCategories()
    // copie du tableau

     /*this.allPlaces = [
         {id: 1, name: 'Paris'},
         {id: 2, name: 'Pau'},
         {id: 3, name: 'Bataclan'},
         {id: 4, name: 'Théâtre Magado'}
     ]*/
     this.asyncGetPlaces()

     /*this.allPerformers = [
         {id: 1, name: 'Eddy Malou'},
         {id: 2, name: 'DJ Cerveau'},
         {id: 3, name: 'Soprano'},
         {id: 4, name: 'Equipe des cinglés du Dimanche'}
     ]*/

     this.asyncGetPerformers()
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
