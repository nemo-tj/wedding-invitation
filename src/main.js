import Vue from 'vue'
import Wedding from './Wedding.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wx from 'weixin-js-sdk'

// 使用axios
Vue.use(VueAxios, axios)
// 使用swiper库
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
// 把微信sdk绑在原型链上
Vue.prototype.$wx = wx

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(Wedding)
})