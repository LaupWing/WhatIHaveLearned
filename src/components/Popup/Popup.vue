<template>
    <div id="Popup" @click="closePopup">
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
            this.$emit(functionName, data)
        },
        closePopup(){
            if(event.target.id === 'Popup'){
                this.$emit('close')
            }
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