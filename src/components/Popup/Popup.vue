<template>
    <div id="Popup">
        <component 
            :is="componentId"
            :settings="settings"
            v-on:emitToParent="emitToParent"
        >
        </component>
    </div>
</template>

<script>
import Icons from '@/components/SideNav/list/parts/Icons/Icons'
export default {
    name: 'Popup',
    props:['componentId', 'settings'],
    components:{
        'Icons': Icons
    },
    data(){ 
        return{

        }
    },
    methods: {
        emitToParent(data, functionName){
            console.log(functionName)
            this.$emit(functionName, data)
        }
    },
}
</script>

<style>
#Popup{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}
</style>