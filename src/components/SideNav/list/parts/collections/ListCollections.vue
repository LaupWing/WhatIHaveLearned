<template>
    <div class="list-collection" v-if="!showCollectionDetails" key="1">
        <div class="add">
            <transition 
                name="slideTopDown" 
                mode="out-in" 
                v-on:enter="animEnded"
            >
                <li 
                    v-if="!addCollection" 
                    @click="toggleAddCollection"
                >
                    <p>Add a new collection</p><Plus/>
                </li>
                <AddCollection
                    v-on:cancel="toggleAddCollection"
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
                @click="showCollectionDetails=collection"
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
import AddCollection from './parts/AddCollection'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'List-Container',
    data(){
        return{
            goToNewCollection: null,
        }
    },
    computed:{
        ...mapGetters(['allCollections'])
    },
    methods:{
        checkNewlyAdded(collection){
            if(this.goToNewCollection){
                return this.goToNewCollection.collection === collection.collection
            }
            return false
        },
    }
}
</script>

<style>

</style>