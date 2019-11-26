<template>
    <div id="align">
        <LeftAlign
            :clicked="active"
            v-on:click.native="active = 'left'"/>
        <CenterAlign 
            :clicked="active"
            v-on:click.native="active = 'center'"
        />
        <RightAlign 
            :clicked="active"
            v-on:click.native="active = 'right'"
        />
    </div>
</template>

<script>
import CenterAlign from './align/centerAlign'
import RightAlign from './align/rightAlign'
import LeftAlign from './align/leftAlign'
export default {
    name: 'align',
    components:{
        CenterAlign,
        RightAlign,
        LeftAlign
    },
    data(){
        return{
            active: 'left'  
        }
    },
    methods:{
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>