import Vuex from 'vuex'
import Vue from 'vue'
import collections from './modules/collections'

// Load Vuex

Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules:{
        collections
    }
})