import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user=>{
  new Vue({
    render: h => h(App),
  }).$mount('#app')
})
