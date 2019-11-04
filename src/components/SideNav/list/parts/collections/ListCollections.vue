<template>
    <div class="list-collection">
        <div class="add">
            <transition 
                name="slideTopDown" 
                mode="out-in" 
                v-on:enter="animEnded"
            >
                <li 
                    v-if="!addCollection" 
                    @click="addCollection = !addCollection"
                >
                    <p>Add a new collection</p><Plus/>
                </li>
                <AddCollection
                    v-on:cancel="addCollection = !addCollection"
                    v-on:create="create"
                    :userNotes="allCollections"
                    v-else
                />
            </transition>
        </div>
        <transition-group name="fadeIn" v-on:enter="newItemAdded">
            <li 
                class="collection"
                v-for="(collection) in allCollections.collections"
                :class="{'go-to':checkNewlyAdded(collection)}"
                :key="collection.collection"
                @click="emitCollectionDetails(collection)"
            >
                <p>{{collection.collection}}</p>
                <img v-if="collection.icon.type === 'img'" :src="collection.icon.src" alt="">
                <div v-else class="svg-wrapper" v-html="collection.icon.src"></div>
            </li> 
        </transition-group>
    </div>
</template>

<script>    
import Plus from '@/components/Icons/Plus'
import AddCollection from '../AddCollection'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'List-Container',
    components:{
        Plus,
        AddCollection
    },
    data(){
        return{
            goToNewCollection: null,
            addCollection: false,
            newCollection: null,
        }
    },
    computed:{
        ...mapGetters(['allCollections'])
    },
    methods:{
        ...mapActions(['updateCollections']),
        emitCollectionDetails(value){
            this.$emit('showCollectionDetails', value)
        },
        checkNewlyAdded(collection){
            if(this.goToNewCollection){
                return this.goToNewCollection.collection === collection.collection
            }
            return false
        },
        create(data){
            this.newCollection = data
            this.addCollection = !this.addCollection
        },
        newItemAdded(){
            setTimeout(()=>{
                this.goToNewCollection = this.newCollection
                setTimeout(()=>{
                    this.emitCollectionDetails(this.goToNewCollection)
                    this.goToNewCollection = null
                    this.newCollection = null
                },500)
            },1000)
        },
        animEnded(){
            if(this.newCollection){
                this.saveCollection()
            }
        },
        saveCollection(){
            this.updateCollections(this.newCollection)
        },
    }
}
</script>

<style>

</style>