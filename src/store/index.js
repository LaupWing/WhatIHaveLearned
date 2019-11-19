import Vuex from 'vuex'
import Vue from 'vue'
import collections from './modules/collections'
import firebase from 'firebase'

// Load Vuex

Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules:{
        collections
    }
})