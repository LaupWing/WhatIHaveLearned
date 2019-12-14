<template>
    <div id="align">
        <LeftAlign
            :clicked="getSettings.align"
            v-on:click.native="changedLayout('left')"/>
        <CenterAlign 
            :clicked="getSettings.align"
            v-on:click.native="changedLayout('center')"
        />
        <RightAlign 
            :clicked="getSettings.align"
            v-on:click.native="changedLayout('right')"
        />
    </div>
</template>

<script>
import CenterAlign from './align/centerAlign'
import RightAlign from './align/rightAlign'
import LeftAlign from './align/leftAlign'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'align',
    components:{
        CenterAlign,
        RightAlign,
        LeftAlign
    },
    computed:{
    ...mapGetters(['getSettings', 'getCurrentLocation', 'allCollections'])
    },
    data(){
        return{
            active: 'left'  
        }
    },
    methods:{
        ...mapActions(['updateLayout']),
        async changedLayout(value){
            await this.updateLayout({
                layout:{
                    align: value
                },
                location: this.getCurrentLocation,
                data: this.allCollections
            })
            this.$emit('toggle')
        }
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>