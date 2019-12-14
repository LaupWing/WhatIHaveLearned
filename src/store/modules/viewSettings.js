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
    async updateLayout({commit}, {layout,location, data}){
        const updates = Object.keys(layout)
        const stateClone = {...state}
        delete stateClone.settingFor
        delete stateClone.editMode

        updates.forEach(update=>{
            stateClone[update] = layout[update]    
        })
        if(location.type === 'introduction'){
            await db
                    .collection('userNotes')
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        layout: stateClone
                    })
        }
        updates.forEach(update=>{
            commit('setSettings', {
                type: update,
                value: layout[update] 
            })
        })
    },
}

const mutations = {
    setAlignment: (state, alignment) =>(state.align = alignment),
    setEdit: (state, edit) => (state.editMode = edit),
    setMaxMinWidth: (state, obj) => (state[obj.type] = obj.value),
    settingIsFor: (state, section) => (state.settingFor = section),
    setSettings: (state, obj) => (state[obj.type] = obj.value)
}

export default{
    state,
    actions,
    getters,
    mutations
}