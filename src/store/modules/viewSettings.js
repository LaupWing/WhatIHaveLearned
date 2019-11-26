import firebase from 'firebase'
import db from '@/firebase/init'

const state = {
    align: 'left',
    editMode: false,
    maxWidth: 800,
    minWidth: 500
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
    },
    valueMaxMinWidth({commit}, obj){
        commit('setMaxMinWidth', obj)
    }
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment),
    setEdit: (state, edit) => (state.editMode = edit),
    setMaxMinWidth: (state, obj) => (state[obj.type] = obj.value),
}

export default{
    state,
    actions,
    getters,
    mutations
}