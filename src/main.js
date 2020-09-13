import Vue from 'vue'
import Wedding from './Wedding.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 使用axios
Vue.use(VueAxios, axios)
// 使用swiper库
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(Wedding)
})