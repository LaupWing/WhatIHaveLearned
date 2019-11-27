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
import {mapActions} from 'vuex'

export default {
    name: 'Overview',
    components:{
        Plus
    },
    props:['sections', 'collection'],
    data(){
        return{
            addSection: false,
            newSection: null,
            goToNewSection: null
        }
    },
    methods:{
        ...mapActions(['addSectionToCollection']),
        createSection(){
            if(this.newSection !== null || this.newSection !== ''){
                this.addSection = !this.addSection
            }
        },
        animEnded(){
            if(this.newSection){
                this.addSectionToCollection({
                    collection: this.collection.collection,
                    newSection: this.newSection
                })
            }
        },
        checkNewlyAdded(section){
            if(this.goToNewSection){
                return this.goToNewSection === section.section
            }
            return false
        },
        newItemAdded(){
            setTimeout(()=>{
                this.goToNewSection = this.newSection
                setTimeout(()=>{
                    this.$emit('showSectionDetails', this.goToNewSection)
                    this.goToNewSection = null
                    this.newSection = null
                },500)
            },1000)
        },
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