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
      rooms: {
        type: Array,
        default () {
          return []
        }
      },
      hoveredRoom: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    data () {
      return {
        map: null,
        MarkerWithLabel: null,
        infoWindow: null,
        markers: [],
        zoom: 15,
        mapFullyLoaded: false,
      }
    },
    watch: {
      rooms () {
        this.addMarkers()
      },
      hoveredRoom: {
        deep: true,
        handler: 'handleHoveredRoom',
      },
      center: {
        deep: true,
        handler: 'resetCenter'
      },
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
      this.addMarkers()
    },
    methods: {

      addMarkers () {
        this.markers = this.rooms.map(room => {
          let { lat, lng } = room;
          lat = parseFloat(lat);
          lng = parseFloat(lng);
          const marker = new this.MarkerWithLabel(this.getMarkerLabelOptions({ lat, lng }, room, this.map));
          marker.room = room;
          return marker
        })
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
          icon: ' ',
          draggable: false,
          raiseOnDrag: true,
          labelContent: `<div class="${lableContentClass}"><span>${
            room.price_range
            }</span></div>`,
          labelClass: 'map-price-container'
        }
      },

      resetLabelClass (marker, lableClass) {
        marker.labelClass = lableClass;
        marker.label.setStyles()
      },

      handleHoveredRoom () {
        this.markers.forEach(marker => {
          if (this.hoveredRoom === null) {
            return (~marker.labelClass.indexOf('hovered') && this.resetLabelClass(marker, 'map-price-container'))
          }
          if (marker.room.id === this.hoveredRoom.id) {
            let lat = this.hoveredRoom.lat;
            let lng = this.hoveredRoom.lng;
            lat = parseFloat(lat);
            lng = parseFloat(lng);
            this.map.setCenter(new this.$googlemap.LatLng(lat,lng));
            return this.resetLabelClass(marker, 'map-price-container-hovered')
          }
          ~marker.labelClass.indexOf('hovered') && this.resetLabelClass(marker, 'map-price-container')
        })
      },

      resetCenter () {
        this.mapFullyLoaded = false;
        this.map.setCenter(this.$googlemap.LatLng(this.center))
      },
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  .map-price-container {
    overflow: visible !important;
    .map-price-marker {
      background-color: white;
      color: black;
    }
  }
  .map-price-container-hovered {
    overflow: visible !important;
    .map-price-marker {
      background-color: rgb(0, 132, 137);
      color: white;
    }
  }
  .map-price-marker {
    position: absolute;
    left: -37px;
    top: -25px;
    width: 168px;
    height: 25px;
    border-radius: 3px;
    line-height: 15px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.07);
    font-size: 10px;
    border: 1px solid rgba(0,0,0,.75);
    z-index: 1;
    padding: 4px;
    &::after {
      position: absolute;
      content: "";
      border-style: solid;
      left: 60px;
      top: 24px;
      border-width: 5px;
      border-color: white transparent transparent;
      border-top: 10px solid #0081cf;
      border-right: 20px solid transparent;
      border-left: 20px solid transparent;
    }
  }
</style>
