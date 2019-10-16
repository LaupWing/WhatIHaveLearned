import firebase from 'firebase'
import db from '@/firebase/init' 
import sortByName from '@/helpers/sortName.js'

const state = {
    collections: [],
    user: null
}

const getters = {
    allCollections: state => state.collections
}

const actions = {
    async getCollections({commit}){
        const data = await db.collection('userNotes').doc(state.user.uid).get()
        let collections 
        if(data.exists){
            collections = data.data().collections.sort(sortByName('collection'))
        }else{
            collections = []
        }
        commit('setCollections', collections)
    },
    getUser({commit}){
        const user = firebase.auth().currentUser
        commit('setUser', user)
    }
}

const mutations = {
    setCollections: (state, collections)=>(state.collections = collections),
    setUser: (state, user)=>(state.user = user)
}

export default{
    state,
    actions,
    getters,
    mutations
}