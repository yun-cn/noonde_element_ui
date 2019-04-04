<template lang="pug">
  div(class="map-container")
   div(class="map-class" id="map")
</template>

<!-- ============================================================================ -->
<script>
  import markWithLabel from '@/utils/marker-with-label.js';
  import infoWindowHelper from '../utils/room-map-infowindow'
    export default {
      props: {
        center: {
          type: Object,
          validator (value) {
            return ['lat', 'lng'].every(
              key => ~Object.keys(value).indexOf(key)
            )
          }
        },
        room: {
          type: Object,
          default () {
            return {}
          }
        }
      },
      data () {
        return {
          map: null,
          MarkerWithLabel: null,
          infoWindow: null,
          marker: null,
          zoom: 16,
          mapFullyLoaded: false,
        }
      },
      watch: {
        room () {
          this.addMarker()
        }
      },
      mounted() {
        const element = document.getElementById('map');
        const map = new this.$googlemap.Map(element, {
          zoom: this.zoom,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          // zoomControlOptions: { position: window.google.maps.ControlPosition.LEFT_TOP },
          center: this.center
        });
        this.map = map;
        this.MarkerWithLabel = markWithLabel(this.$googlemap);
        this.addMarker()
      },
      methods: {
        addMarker () {
          let { lat, lng } = this.room;
          lat = parseFloat(lat);
          lng = parseFloat(lng);
          const marker = new this.MarkerWithLabel(this.getMarkerLabelOptions({ lat, lng }, this.room, this.map));
          // marker.room = room;
          this.marker = marker
        },

        getMarkerLabelOptions (
          position,
          room,
          map,
          lableContentClass = 'map-price-marker'
        ) {
          return {
            map,
            position,
            icon: '/images/blue-cercle.png',
            draggable: false,
            raiseOnDrag: true,
            labelContent: ``,
            labelClass: 'map-price-container'
          }
        },
      }
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">

</style>
