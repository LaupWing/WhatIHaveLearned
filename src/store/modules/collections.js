import firebase from 'firebase'
import db from '@/firebase/init' 
import sortByName from '@/helpers/sortName.js'

const state = {
    collections: [],
    user: null,
    activeMain: null
}

const getters = {
    allCollections: state => state.collections,
    currentUser: state => state.user,
    activeMain: state => state.activeMain 
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
        console.log(user)
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