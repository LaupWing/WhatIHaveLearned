import firebase from 'firebase'
import db from '@/firebase/init'

const state = {
    align: 'left',
    editMode: false
}

const getters = {
    getSettings: state => state,

}

const actions = {
    saveAlignment({commit}, alignment){
        commit('setAlignment', alignment)
    },
    toggleEdit({commit}){
        commit('setEdit', !state.editMode)
    }
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment),
    setEdit: (state, edit) => (state.editMode = edit)
}

export default{
    state,
    actions,
    getters,
    mutations
}