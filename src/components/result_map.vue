<template>
    <div class="maps">
        <gmap-map
          :center="center"
          :zoom="6"
          style="width: 100%; height: 100%;"
        >
            <gmap-cluster>
              <gmap-marker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :label="m.rank"
                  :clickable="true"
                  :draggable="false"
                  @click="show(m)"
              ></gmap-marker>
           </gmap-cluster>
       </gmap-map>
    </div>

</template>

<script>

  export default {
    name: 'result-map',
    props: ['events', 'markers'],
    data () {
      return {
        center: {lat: 47.319, lng: 1.0734},

      }
  },

  mounted () {
  }
 }

</script>


<style lang="scss" scoped>
.maps {
    width: 100%;
    height: calc(100vh - 70px);
    margin-top:20px;
    font-size: 14px;

    .map-info {
        width: 270px;

        .logo {
            width: 70px;
            height: 70px;
            float: left;
            margin-right: 10px;
            img {width: 100%}
        }

        .title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
            color: #3c475b;

            span {
                color: #7f8692;
                font-size: 13px;
                font-weight: 400;
            }
        }

        ul.metas {
            margin: 0;

            li {
                padding: 0;
                margin-right: 5px;
                margin: 0;
                font-weight: 600;
                font-size: 14px;

                &.right {
                    width: 100%;
                    text-align: right;
                }
            }
        }
    }
}

@media (max-width:768px) {
    .maps {
        margin-top:10px;
    }
}

</style>
