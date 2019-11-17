<template>
    <div id="align">
        <CenterAlign/>
        <RightAlign/>
    </div>
</template>

<script>
import CenterAlign from './align/centerAlign'
import RightAlign from './align/rightAlign'
export default {
    name: 'align',
    components:{
        CenterAlign,
        RightAlign
    }
    
}
</script>

<style>
#align{
    display: flex;
}
</style>