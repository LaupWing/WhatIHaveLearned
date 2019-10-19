<template>
    <ul id="List-Container">
        <p class="no-collection" v-if="!allCollections">
            Begin your everlasting knowledge journey by adding your first collection!
        </p>
        <div class="collections-wrapper">
            <transition name="slideInOut">
                <!-- Show List of the collections -->
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
                        >
                            <p>{{collection.collection}}</p>
                            <img v-if="collection.icon.type === 'img'" :src="collection.icon.src" alt="">
                            <div v-else class="svg-wrapper" v-html="collection.icon.src"></div>
                        </li> 
                    </transition-group>
                </div>
                <!-- Show The collection details -->
                <CollectionDetails 
                    key="2"
                    :collection="showCollectionDetails"
                v-else/>
            </transition>
        </div>
    </ul>
</template>

<script>
import Plus from '@/components/Icons/Plus'
import AddCollection from './parts/AddCollection'
import db from '@/firebase/init'
import sortByName from '@/helpers/sortName.js'
import CollectionDetails from './parts/CollectionDetails'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'ListContainer',
    components:{
        Plus,
        AddCollection,
        CollectionDetails
    },
    data(){
        return{
            goToNewCollection: null,
            addCollection: false,
            newCollection: null,
            showCollectionDetails: null,
            defaultDisplay:[
                {
                    "attributes": {
                    "color": "#ffffff",
                    "underline": true
                    },
                    "insert": "Hello There"
                },
                {
                    "attributes": {
                    "header": 1
                    },
                    "insert": "\n"
                }
            ]
        }
    },
    computed:{
        ...mapGetters(['allCollections', 'currentUser', 'getMainContent']),
    },
    methods:{
        ...mapActions(['getCollections','updateCollections', 'setMainContent']),
        toggleAddCollection(){
            this.addCollection = !this.addCollection
        },
        checkNewlyAdded(collection){
            if(this.goToNewCollection){
                return this.goToNewCollection.collection === collection.collection
            }
            return false
        },
        animEnded(){
            if(this.newCollection){
                this.saveCollection()
            }
        },
        newItemAdded(){
            setTimeout(()=>{
                this.goToNewCollection = this.newCollection
                setTimeout(()=>{
                    this.showCollectionDetails = this.goToNewCollection
                    this.goToNewCollection = null
                    this.newCollection = null
                },500)
            },1000)
        },
        create(data){
            this.newCollection = data
            this.toggleAddCollection()
        },
        saveCollection(){
            this.updateCollections(this.newCollection)
        },
        checkContent(){
            this.allCollections.introduction ? this.setMainContent(this.allCollections.introduction) : this.setMainContent(this.defaultDisplay) 
            console.log(this.getMainContent)
            // if(this.allCollections.introduction){
            //     this.setMainContent(this.allCollections.introduction)
            // }
            // else{
            //     this.setMainContent(this.defaultDisplay)
            // }
        }
    },
    async created(){
        await this.getCollections()
        this.checkContent()
    }
}
</script>

<style>
ul#List-Container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* animation: slideToLeft 1s reverse; */
    position: relative;
}
ul#List-Container .add,
ul#List-Container .list-collection{
    width: 100%;
}
ul#List-Container .collections-wrapper{
    position: relative;
    width: 100%;   
}
ul#List-Container .list-collection{
    position: absolute;
}
ul#List-Container .add{
    border: solid 1px var(--lighter-white);
    border-left: none;
    border-right: none;
    overflow: hidden;
}
ul#List-Container li.collection{
    border-bottom: solid 1px var(--lighter-white);
    text-transform: capitalize;
}
ul#List-Container li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    transition: .25s;
}
ul#List-Container li svg,
ul#List-Container li img{
    width: 20px;
    margin-left: 10px;
}
ul#List-Container li svg{
    height: 100%;
}
ul#List-Container li:hover,
ul#List-Container li.go-to{
    background: var(--contrast-color);
    border-color: var(--contrast-color);
    color: var(--secundair-color);
}
ul#List-Container li:hover svg#Plus path{
    fill: var(--main-color);
}
ul#List-Container p.no-collection{
    width: 90%;
    text-align: center;
    margin: 20px 0;
    margin-top: 0;
    font-size: .9em;
    color: var(--contrast-color);
}
.slideTopDown-enter-active {
    animation: heightAnim 1s;
}
.slideTopDown-leave-active {
    animation: heightAnim 1s reverse;
}
.fadeIn-enter-active {
    animation: fadeIn 1s;
}
.fadeIn-leave-active {
    animation: fadeIn 1s reverse;
}
.slideInOut-enter-active {
    animation: slideToLeft 1s reverse;
}
.slideInOut-leave-active {
    animation: slideToRight 1s reverse;
}
</style>