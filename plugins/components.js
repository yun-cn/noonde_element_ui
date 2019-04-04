import Vue from 'vue';
import CImg from '@/components/c-img.vue';
import CSvgIcon from '@/components/c-svg-icon.vue';
import CRoomMap from '@/components/c-room-map.vue';
import CUserHeader from '@/components/c-user-header.vue';
import CRoomListMap from '@/components/c-room-list-map.vue';
import CPublicHeader from '@/components/c-public-header.vue';

Vue.component('c-img', CImg);
Vue.component('c-svg-icon', CSvgIcon);
Vue.component('c-room-map', CRoomMap);
Vue.component('c-user-header', CUserHeader);
Vue.component('c-public-header', CPublicHeader);
Vue.component('c-room-list-map', CRoomListMap);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('~/assets/svg', false, /\.svg$/);
requireAll(req);
