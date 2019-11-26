<template>
    <div id="align">
        <LeftAlign
            :class="active === 'left'? 'active': ''"  
            @click="active = 'left'"/>
        <CenterAlign 
            @click="active = 'center'"
            :class="active === 'center'? 'active': ''"
        />
        <RightAlign 
            @click="active = 'right'"
            :class="active === 'right'? 'active': ''"
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
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>