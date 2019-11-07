<template>
    <div class="overview">
        <transition
            name="slideTopDown" 
            mode="out-in" 
            v-on:enter="animEnded"
        >
            <li v-if="!addSection" @click="addSection = true">Add new Section<Plus/></li>
            <div class="add-section" v-else>
                <input type="text" v-model="newSection">
                <div class="buttons">
                    <button @click="addSection = false, newSection = null">cancel</button>
                    <button @click="createSection">create</button>
                </div>
            </div>
        </transition>
        <li 
            v-for="(section, index) in sections"
            :key="index"
        >
            {{section}}
        </li>
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
            newSection: null
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
                console.log(this.newSection, this.addSection)
            }
        },
    }

}
</script>

<style>
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