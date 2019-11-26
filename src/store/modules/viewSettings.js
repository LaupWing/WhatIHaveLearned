import firebase from 'firebase'
import db from '@/firebase/init'

const state = {
    align: 'left',
    editMode: false,
    activePopup: null
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
    elActivePopup({commit},el){
        commit('setActivePopup', el)
    }
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment),
    setEdit: (state, edit) => (state.editMode = edit),
    setActivePopup: (state,el)=>(state.activePopup = el)
}

export default{
    state,
    actions,
    getters,
    mutations
}