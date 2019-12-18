<template>
    <div class="overview">
        <transition
            name="slideTopDown" 
            mode="out-in" 
            v-on:enter="animEnded"
        >
            <li class="add" v-if="!addSection" @click="addSection = true">Add new Section<Plus/></li>
            <div class="add-section" v-else>
                <input type="text" v-model="newSection">
                <div class="buttons">
                    <button @click="addSection = false, newSection = null">cancel</button>
                    <button @click="createSection">create</button>
                </div>
            </div>
        </transition>
        <transition-group name="fadeIn" v-on:enter="newItemAdded">
            <li 
                v-for="(section) in sections"
                :key="section.section"
                :class="{'go-to':checkNewlyAdded(section)}"
                @click="$emit('showSectionDetails', section)"
                class="item"
            >
                {{section.section}}
            </li>
        </transition-group>
    </div>
</template>

<script>
import Plus from '@/components/Icons/Plus'
import {mapActions, mapGetters} from 'vuex'
import capatalize from '@/helpers/string'
export default {
    name: 'CollectionList',
    computed:{
        
    },
    components:{
        Plus
    },
    props:['sections', 'collection'],
    data(){
        return{
            addSection: false,
            newSection: null,
            goToNewSection: null,
            defaultDisplay: `
                <p class="ql-align-center">${this.checkTypeIcon()}</p><p class="ql-align-center"></p><h1 class="ql-align-center"><span style="font-size: 48px;">${capatalize(this.collection.collection)}</span></h1><p><br></p>
            `,
        }
    },
    methods:{
        ...mapActions(['addSectionToCollection', 'setMainContent']),
        createSection(){
            if(this.newSection !== null || this.newSection !== ''){
                this.addSection = !this.addSection
                // this.collection.sections.push({
                //     section: this.newSection,
                //     chapters:[]
                // })
            }
        },
        animEnded(){
            if(this.newSection){
                this.addSectionToCollection({
                    collection: this.collection.collection,
                    newSection: this.newSection
                })
                console.log('adding', this.collection)
            }
        },
        checkNewlyAdded(section){
            if(this.goToNewSection){
                return this.goToNewSection === section.section
            }
            return false
        },
        checkTypeIcon(){
            if(this.collection.icon.type === 'img'){
                return `<img src="${this.collection.icon.src}" width="100" style="display: block; margin: auto;">`
            }else if(this.collection.icon.type === 'svg'){
                return this.collection.icon.src
            }
        },
        newItemAdded(){
        //     setTimeout(()=>{
        //         this.goToNewSection = this.newSection
        //         console.log(this.goToNewSection)
        //         setTimeout(()=>{
        //             this.$emit('showSectionDetails', this.goToNewSection)
        //             this.goToNewSection = null
        //             this.newSection = null
        //         },500)
        //     },1000)
        }
    },
    created(){
        if(!this.collection.introduction){
            this.setMainContent(this.defaultDisplay)
        }
        else{
            this.setMainContent(this.collection.introduction)
        }
        // this.setCurrentLocation({
        //     type:'collection',
        //     collection: this.collection
        // })
        // this.updateLayoutNotInDB(this.collection.layout)
        // this.setSettingFor(this.collection.collection)
    }

}
</script>

<style>
.overview{
    position: absolute;
    width: 100%;
}
.overview .add-section{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.overview .add-section:hover{
    background: transparent !important;
}
.overview .add-section button{
    font-size: 10px;
    padding: 5px 7px;
}
</style>