<template>
    <div class="section">
        <li @click="backToOverview" class="back_to_sectionOverview">Back</li>
        <h4>{{section.section}}</h4>
        <li class="add">Add a chapter <Icons/></li>
    </div>
</template>

<script>
import Icons from '../../../../../Icons/Plus'
import capatalize from '@/helpers/string'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Section',
    props:['section', 'collection'],
    components:{
        Icons
    },
    data(){
        return{
            defaultDisplay: `<p class="ql-align-center">${this.checkTypeIcon()}</p><h1 class="ql-align-center"><span style="font-size: 48px;">${capatalize(this.collection.collection)}:</span><em style="font-size: 48px; color: rgb(187, 187, 187);">${this.section.section}</em></h1>`
        }
    },
    methods:{
        ...mapActions(['setCurrentLocation','setMainContent', 'setMainContentTransition']),
        backToOverview(){
            this.setMainContentTransition('rightFadeOut')
            this.$emit('backTosection')
        },
        checkContent(){
            if(!this.section.introduction){
                this.setMainContent(this.defaultDisplay)
            }else{
                this.setMainContent(this.section.introduction)
            }
            this.setCurrentLocation({
                type: 'section',
                collection: this.collection,
                section: this.section
            })
        },
        checkTypeIcon(){
            if(this.collection.icon.type === 'img'){
                return `<img src="${this.collection.icon.src}" width="100" style="display: block; margin: auto;">`
            }else if(this.collection.icon.type === 'svg'){
                return this.collection.icon.src
            }
        },
    },
    created(){
        this.checkContent()
    }
}
</script>

<style>
.section{
    position: absolute;
    width: 100%;
}
ul#List-Container .section .back_to_sectionOverview{
    border: solid white 1px;
    border-left: none;
    border-radius: 0 20px 20px 0;
    padding: 5px;
    width: 30%;
    font-size: .8em;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* text-transform: uppercase; */
    letter-spacing: 1px;
}
.section h4{
    padding: 10px;
    text-transform: capitalize;
    font-size: 1.5em;
    font-weight: normal;
    color: var(--contrast-color);
    border-bottom: var(--contrast-color) .5px solid;
}
</style>