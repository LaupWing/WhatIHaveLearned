<template>
    <div id="align">
        <LeftAlign/>
        <CenterAlign/>
        <RightAlign/>
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
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>