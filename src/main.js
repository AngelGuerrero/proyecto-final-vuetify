import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './assets/css/global.css'

import './assets/css/rangeSlider.css'
import './assets/css/rangeSliderSkin.css'
import './assets/js/rangeSlider.js'

//
// Global components
import BaseComponent from '@/components/Helpers/BaseModelComponent'

Vue.component('BaseComponent', BaseComponent)

Vue.config.productionTip = false

new Vue({
  //
  // Global mixin
  vuetify,
  render: h => h(App)
}).$mount('#app')
