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
import AddCollection from './parts/AddCollection'
import {mapGetters, mapActions} from 'vuex'
import prevenClickOnReadOnly from '@/helpers/editorHelpers'
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
            defaultDisplay:`<h1><span class="ql-size-large" style="color: rgb(255, 255, 255);">Welcome to to your introduction page</span></h1><p><em class="ql-size-large" style="color: rgb(255, 255, 255);">This is your very own home page for your notes</em></p><p><br></p><p><span class="ql-size-large" style="color: rgb(255, 255, 255);">You can put whatever you want on your own homepage. But we some ideas for your homepage that you may want to use!</span></p><ul><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Give an introduction about yourself!</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Describe your collections in a short summary</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">But these are just some ideas but you can write whatever you want!</span></li></ul><p><br></p><p><img src="https://ourswissbusiness.com/wp-content/uploads/2017/01/wow-e1484418777188.png" style="display: block; margin: auto;" width="697"></p><p><br></p>`
        }
    },
    computed:{
        ...mapGetters(['allCollections'])
    },
    methods:{
        ...mapActions(['updateCollections', 'setMainContent', 'getCollections', 'setMainContentTransition']),
        emitCollectionDetails(value){    
            this.setMainContentTransition('leftFadeOut')   
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
                this.updateCollections(this.newCollection)
            }
        },
        checkContent(){
            this.allCollections.introduction ? this.setMainContent(this.allCollections.introduction) : this.setMainContent(this.defaultDisplay)
        },
    },
    async created(){
        await this.getCollections()
        await this.checkContent()
        prevenClickOnReadOnly()
    }
}
</script>

<style>

</style>