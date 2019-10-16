import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user=>{
  new Vue({
        store,
        render: h => h(App),
    }).$mount('#app')
})
