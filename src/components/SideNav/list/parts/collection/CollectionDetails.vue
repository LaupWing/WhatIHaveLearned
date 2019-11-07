<template>
    <div id="Collection-Details">
        <li @click="backToCollection">Back to collection</li>
        <li class="collection">{{collection.collection}}</li>
        <Overview
            :sections="collection.sections"
            :collection="collection"
            v-on:backToCollection="backToCollection"
        />
        <Section
            v-if="section"
            :section="section"
        />
    </div>
</template>

<script>
import Overview from './parts/Overview'
import Plus from '@/components/Icons/Plus'
import {mapGetters, mapActions} from 'vuex'
import capatalize from '@/helpers/string'
export default {
    name: 'CollectionDetails',
    props:['collection'],
    components:{
        Plus,
        Overview
    },
    data(){
        return{
            defaultDisplay: `
                <p class="ql-align-center">${this.checkTypeIcon()}</p><p class="ql-align-center"></p><h1 class="ql-align-center"><span style="color: rgb(255, 255, 255); font-size: 48px;">${capatalize(this.collection.collection)}</span></h1><p><br></p>
            `,
            section: null
        }
    },
    methods:{
        ...mapActions(['setMainContent']),
        checkTypeIcon(){
            if(this.collection.icon.type === 'img'){
                return `<img src="${this.collection.icon.src}" width="100" style="display: block; margin: auto;">`
            }else if(this.collection.icon.type === 'svg'){
                return this.collection.icon.src
            }
        },
        backToCollection(){
            this.$emit('backToCollection')
        }

    },
    created(){
        if(!this.collection.introduction){
            this.setMainContent(this.defaultDisplay)
        }
    }
}
</script>

<style>
#Collection-Details{
    width: 100%;
    position: absolute;
}
#Collection_Details h1{
    text-transform: capitalize;
}
</style>