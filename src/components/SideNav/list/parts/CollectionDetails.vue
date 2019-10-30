<template>
    <div id="Collection-Details">
        <li class="collection">{{collection.collection}}</li>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import capatalize from '@/helpers/string'
export default {
    name: 'CollectionDetails',
    props:['collection'],
    computed:{

    },
    data(){
        return{
            defaultDisplay: `
                <p class="ql-align-center">${this.checkTypeIcon()}</p><p class="ql-align-center"></p><h1 class="ql-align-center"><span style="color: rgb(255, 255, 255); font-size: 48px;">${capatalize(this.collection.collection)}</span></h1><p><br></p>
            `
        }
    },
    methods:{
        ...mapActions(['setMainContent']),
        checkTypeIcon(){
            console.log('checking type icon', this.collection.type)
            if(this.collection.icon.type === 'img'){
                console.log(this.collection, 'img')
                return `<img src="${this.collection.icon.src}" width="100" style="display: block; margin: auto;">`
            }else if(this.collection.icon.type === 'svg'){
                console.log(this.collection.icon.src, 'svg')
                return this.collection.icon.src
            }
        }
    },
    created(){
        if(!this.collection.introduction){
            this.setMainContent(this.defaultDisplay)
        }
        console.log(this.defaultDisplay)
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