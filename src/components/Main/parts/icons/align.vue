<template>
    <div id="align">
        <LeftAlign
            :clicked="getSettings.align"
            v-on:click.native="saveAlignment('left')"/>
        <CenterAlign 
            :clicked="getSettings.align"
            v-on:click.native="saveAlignment('center')"
        />
        <RightAlign 
            :clicked="getSettings.align"
            v-on:click.native="saveAlignment('right')"
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
    ...mapGetters(['getSettings'])
    },
    data(){
        return{
            active: 'left'  
        }
    },
    methods:{
        ...mapActions(['saveAlignment'])
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>