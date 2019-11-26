<template>
    <div class="options">
        <li 
            v-for="(val, index) in options" 
            :key="index" 
            class="option"
            :class="checkActiveOption(val)"    
        >
                {{val}}<span>px</span>
        </li>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'options',
    props:['activePopup'],
    computed:{
        ...mapGetters(['getSettings']),
    },
    data(){
        return{
            options:[500, 600, 700, 800, 900, 1000]
        }
    },
    methods:{
        checkActiveOption(val){
            if(val === this.getSettings.minWidth)   return 'active'
        }
    }
}
</script>

<style>
#MinWidth .options li.option.active{
    background: var(--contrast-color);
} 

</style>