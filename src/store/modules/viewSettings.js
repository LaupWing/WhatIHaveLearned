import firebase from 'firebase'
import db from '@/firebase/init'

const state = {
    settingFor: null,
    align: 'left',
    editMode: false,
    maxWidth: 800,
    minWidth: 500,
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
    },
    setSettingFor({commit}, section){
        commit('settingIsFor', section)
    },
    async updateLayout({commit}, {layout,location}){
        const updates = Object.keys(layout)
        const stateClone = {...state}
        delete stateClone.settingFor
        delete stateClone.editMode

        updates.forEach(update=>{
            stateClone[update] = updates[update]    
        })
        
        if(location === 'introduction'){
            db
                .collection('userNotes')
                .doc(firebase.auth().currentUser.uid)
                .update({
                    layout: stateClone
                })
        }
    },
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment),
    setEdit: (state, edit) => (state.editMode = edit),
    setMaxMinWidth: (state, obj) => (state[obj.type] = obj.value),
    settingIsFor: (state, section) => (state.settingFor = section),
}

export default{
    state,
    actions,
    getters,
    mutations
}