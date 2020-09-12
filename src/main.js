import Vue from 'vue'
import Wedding from './Wedding.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(Wedding)
})