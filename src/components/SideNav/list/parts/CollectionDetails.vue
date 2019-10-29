<template>
    <div id="Collection-Details">
        <li class="collection">{{collection.collection}}</li>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'CollectionDetails',
    props:['collection'],
    computed:{

    },
    data(){
        return{
            defaultDisplay: `<img src="${this.collection.icon.src}" style="display: block; margin: auto;" width="50">
            <h1><span class="ql-size-large" style="color: rgb(255, 255, 255); font-size: 48px; margin:auto;">${this.collection.collection}</span></h1>`
        }
    },
    methods:{
        ...mapActions(['setMainContent']),
    },
    created(){
        if(!this.collection.introduction){
            this.setMainContent(this.defaultDisplay)
        }
        console.log(this.collection)
        // this.setMainContent()
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