<template>
    <div id="Collection-Details">
        <li class="back" @click="backToCollection">Back to collection</li>
        <h2 class="title">{{collection.collection}}</h2>
        <transition :name="animation">
            <SectionList
                :sections="collection.sections"
                :collection="collection"
                v-on:backToCollection="backToCollection"
                v-on:showSectionDetails="showSection"
                v-if="!section"
            />
            <Section
                v-else
                v-on:backTosection="section = null"
                :section="section"
                :collection="collection"
            />
        </transition>
    </div>
</template>

<script>
import SectionList from './parts/SectionList'
import Plus from '@/components/Icons/Plus'
import {mapGetters, mapActions} from 'vuex'
import capatalize from '@/helpers/string'
import Section from './parts/Section'
export default {
    name: 'CollectionDetails',
    props:['collection'],
    components:{
        Plus,
        Section,
        SectionList
    },
    computed:{
        animation(){
            if(this.section){
                return 'forward'
            }else{
                return 'backward'
            }
        }
    },
    data(){
        return{
            defaultDisplay: `
                <p class="ql-align-center">${this.checkTypeIcon()}</p><p class="ql-align-center"></p><h1 class="ql-align-center"><span style="font-size: 48px;">${capatalize(this.collection.collection)}</span></h1><p><br></p>
            `,
            section: null
        }
    },
    methods:{
        ...mapActions([
            'setMainContent', 
            'setMainContentTransition', 
            'setSettingFor', 
            'setCurrentLocation',
            'updateLayoutNotInDB'
        ]),
        checkTypeIcon(){
            if(this.collection.icon.type === 'img'){
                return `<img src="${this.collection.icon.src}" width="100" style="display: block; margin: auto;">`
            }else if(this.collection.icon.type === 'svg'){
                return this.collection.icon.src
            }
        },
        backToCollection(){
            this.setMainContentTransition('rightFadeOut')
            this.$emit('backToCollection')
        },
        showSection(section){
            this.setMainContentTransition('leftFadeOut')
            this.section = section
        }
    },
    created(){
        this.setCurrentLocation({
            type:'collection',
            collection: this.collection
        })
        this.updateLayoutNotInDB(this.collection.layout)
        this.setSettingFor(this.collection.collection)
    }
}
</script>

<style>
#Collection-Details{
    width: 100%;
    position: absolute;
}
#Collection-Details li.back{
    border: solid white 1px;
    border-left: none;
    border-radius: 0 20px 20px 0;
    width: 70%;
}
#Collection-Details h2{
    text-transform: capitalize;
}
</style>