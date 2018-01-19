<template lang="html">
     <div class="event-item">

         <div class="details">
             <div class="name" v-if="event.hasOwnProperty('name') && event.name != null">
                 {{ position +1 }} - {{ event.name }}
             </div>

             <div class="metas" v-if="event.hasOwnProperty('categories') && event.categories != null">
                 <ul class="list-inline">
                     <li><i class="ion-bag"></i></li>
                     <li v-for="cat in event.categories">{{ cat }},</li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('date') && event.date != null">
                 <ul class="list-inline">
                     <li><i class="ion-calendar"></i></li>
                     <li>{{ event.date }}</li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('venue') && event.venue != null">
                 <ul class="list-inline">
                     <li><i class="ion-android-locate"></i></li>
                     <li>{{ event.venue.name }}</li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('hour') && event.hour != null">
                 <ul class="list-inline">
                     <li><i class="ion-ios-clock-outline"></i></li>
                     <li>{{ event.hour }}</li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('performers') && event.performers != null">
                 <ul class="list-inline">
                     <li><i class="ion-person-stalker"></i></li>
                     <li v-for="p in event.performers"><a :href="p.uri">{{ p.name }},</a></li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('duration') && event.duration != null">
                 <ul class="list-inline">
                     <li><i class="ion-clock"></i></li>
                     <li>{{ event.duration }}</li>
                 </ul>
             </div>

             <div class="metas" v-if="event.hasOwnProperty('source') && event.source != null">
                 <ul class="list-inline">
                     <li><i class="ion-ios-cloud-outline"></i></li>
                     <li v-for="(s, i) in event.source"><a :href="s">Source N°{{ i+1 }},</a></li>
                 </ul>
             </div>
         </div>
     </div>
</template>

<script>
export default {
    name: 'event-item',
    props: ['event', 'position'],
    data () {
        return {
        }
    },

    mounted () {
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/utils/variables.scss";
@import "../assets/sass/utils/mixins.scss";


.event-item {
width: 100%;
background-color: white;
border: 1px solid #e6e9ed;
margin-bottom: 10px;
border-radius: 0px 2px 2px 0px;
cursor: pointer;

.featured {
    height: 40px;
    line-height: 40px;
    background-color: #263248;
    color: white;
    margin:0;
    padding: 0;
    padding-left: 20px;
    border-radius: 2px 2px 0 0;
    text-transform: uppercase;
    border: 1px solid #263248;
    font-weight: 500;
    font-size: 16px;
}

.image {
    float: left;
    width: 25%;
    height: 100%;

    img {
        width: 100%;
    }
}

.details {
    padding: 10px;
    padding-top:5px;
    width: 100%;
    padding-left:5%;
    word-wrap: break-word;

    .name {
        font-weight: 700;
        font-size: 20px;
        color: #3c475b;
        @include ellipsis();

        span {
            color: $color-teal;
            font-size: 14px;
            font-weight: 400;
        }
    }

    .address {
        color: $color-teal;
        font-size: 14px;
        font-weight: 400;
        margin-top:0px;
    }

    .level {
        color: $color-dark;
        font-weight: 500;
        font-size: 14px;
    }

    ul.metas,
    ul {
        color: #3c475b;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 0px;
        @include ellipsis();

        li {
            padding: 0;
            margin-right: 5px;
            margin-bottom: 0px;
            @include ellipsis();
            line-height: 16px;
        }

    }

    .metas {
        font-weight: bold;
        color: $color-purple;
        margin: 0;
        padding: 0;
    }

    i {
        font-size: 17px;
        color: $color-teal;
        margin-right: 3px;
        width: 100px !important;
    }
}
}
</style>
