import firebase from 'firebase'
import db from '@/firebase/init'

const state = {
    align: 'left'
}

const getters = {
    getSettings: state => state
}

const actions = {
    saveAlignment({commit}, alignment){
        commit('setAlignment', alignment)
    }
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment)
}

export default{
    state,
    actions,
    getters,
    mutations
}