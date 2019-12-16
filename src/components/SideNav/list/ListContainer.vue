<template>
    <ul id="List-Container" @click="test">
        <p class="no-collection" v-if="!allCollections">
            Begin your everlasting knowledge journey by adding your first collection!
        </p>
        <div class="collections-wrapper">
            <transition :name="animation">
                <!-- Show List of the collections -->
                <ListCollections 
                    v-if="!showCollectionDetails"
                    v-on:showCollectionDetails="showCollectionDetails = $event"
                />
                <!-- Show The collection details -->
                <CollectionDetails 
                    key="2"
                    :collection="showCollectionDetails"
                    v-on:backToCollection="showCollectionDetails = null"
                v-else/>
            </transition>
        </div>
    </ul>
</template>

<script>
import sortByName from '@/helpers/sortName.js'
import CollectionDetails from './parts/collection/CollectionDetails'
import ListCollections from './parts/collections/ListCollections'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'ListContainer',
    components:{
        CollectionDetails,
        ListCollections
    },
    data(){
        return{
            goToNewCollection: null,
            addCollection: false,
            newCollection: null,
            showCollectionDetails: null,
            defaultDisplay:`<h1><span class="ql-size-large" style="color: rgb(255, 255, 255);">Welcome to to your introduction page</span></h1><p><em class="ql-size-large" style="color: rgb(255, 255, 255);">This is your very own home page for your notes</em></p><p><br></p><p><span class="ql-size-large" style="color: rgb(255, 255, 255);">You can put whatever you want on your own homepage. But we some ideas for your homepage that you may want to use!</span></p><ul><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Give an introduction about yourself!</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">Describe your collections in a short summary</span></li><li><span class="ql-size-large" style="color: rgb(255, 255, 255);">But these are just some ideas but you can write whatever you want!</span></li></ul><p><br></p><p><img src="https://ourswissbusiness.com/wp-content/uploads/2017/01/wow-e1484418777188.png" style="display: block; margin: auto;" width="697"></p><p><br></p>`
        }
    },
    computed:{
        ...mapGetters(['allCollections', 'currentUser', 'getMainContent']),
        animation(){
            if(this.showCollectionDetails){
                return 'forward'
            }else{
                return 'backward'
            }
        }
    },
    methods:{
        ...mapActions(['getCollections','updateCollections', 'setSettingFor']),
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
        saveCollection(){
            this.updateCollections(this.newCollection)
        },
        setAnim(anim){
            return anim
        },
        test(){
            console.log(this.allCollections, '--------------------listcontainer')
        }
    },
}
</script>

<style>
ul#List-Container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
ul#List-Container li.item{
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
</style>