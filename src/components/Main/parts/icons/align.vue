<template>
    <div id="align">
        <LeftAlign @click="active = 'left'"/>
        <CenterAlign @click="active = 'center'"/>
        <RightAlign @click="active = 'right'"/>
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
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>