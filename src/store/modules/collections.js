import firebase from 'firebase'
import db from '@/firebase/init' 
import sortByName from '@/helpers/sortName.js'

const state = {
    collections: [],
    user: null,
    mainContent: null,
    mainContentTransition: null,
    current: null
}

const getters = {
    allCollections: state => state.collections,
    currentUser: state => state.user,
    getMainContent: state => state.mainContent,
    getMainContentTransition: state => state.mainContentTransition,
    getCurrentLocation: state => state.current
}

const actions = {
    async getCollections({commit}){
        console.log('getting collection')
        const data = await db.collection('userNotes').doc(state.user.uid).get()
        let collections 
        if(data.exists){
            collections = data.data()
            collections.collections = collections.collections.sort(sortByName('collection'))
            console.log(collections)
        }else{
            collections = []
        }
        commit('setCollections', collections)
    },
    async updateCollections({dispatch},collection){
        const tempArray = state.collections.collections
        tempArray.push(collection)
        db
            .collection('userNotes')
            .doc(state.user.uid)
            .update({
                collections: tempArray
            })
            .then(()=>dispatch('getCollections'))
            .catch(()=>{
                db
                    .collection('userNotes')
                    .doc(state.user.uid)
                    .update({
                        collections: tempArray
                    })
                    .then(()=>dispatch('getCollections'))
            })
    },
    async updateCollection({commit}){
        const updatedCollections = state.collections.collections.map(collection=>{
            if(collection===state.current.collection){
                collection.introduction = state.mainContent
            }
            return collection
        })
        await db
            .collection('userNotes')
            .doc(state.user.uid)
            .update({
                collections: updatedCollections
            })
            
    },  
    async updateIntroduction({commit}, introduction){
        await db.collection('userNotes').doc(state.user.uid).update({
            introduction
        })
        commit('setCollections', {...state.collections, introduction})
    },
    async addSectionToCollection({dispatch}, {newSection, collection}){
        console.log(state.collections)
        const tempArray = state.collections.collections
            .map(c=>{
                if(c.collection === collection){
                    c.sections.push({
                        section: newSection,
                        chapters: []
                    })
                }   
                return c
            })
        console.log('adding')
        // console.log(state, tempArray)
        await db
            .collection('userNotes')
            .doc(state.user.uid)
            .update({
                collections: tempArray
            })
        dispatch('getCollections')
    },
    setCurrentLocation({commit},location){
        commit('setCurrentLocation', location)
    },
    getUser({commit}){
        const user = firebase.auth().currentUser
        commit('setUser', user)
    },
    setMainContent({commit},content){
        commit('setMainContent', content)
    },
    setMainContentTransition({commit},content){
        commit('setMainContentTransition', content)
    }
}

const mutations = {
    setCollections: (state, collections)=>(state.collections = collections),
    setUser: (state, user)=>(state.user = user),
    setMainContent: (state, content) =>(state.mainContent= content),
    setMainContentTransition: (state, value) =>(state.mainContentTransition= value),
    setCurrentLocation: (state,location) =>(state.current = location)
}

export default{
    state,
    actions,
    getters,
    mutations
}