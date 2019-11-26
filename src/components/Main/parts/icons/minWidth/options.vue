<template>
    <div class="options">
        <li 
            v-for="(val, index) in options" 
            :key="index" 
            class="option"
            :class="checkActiveOption(val)"    
            @click="setMinWidth(val)"
        >
            {{val}}<span>px</span>
        </li>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
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
        ...mapActions(['valueMaxMinWidth']),
        checkActiveOption(val){
            if(val === this.getSettings.minWidth)   return 'active'
        },
        setMinWidth(value){
            this.$emit('toggle')
            this.valueMaxMinWidth({
                type: 'minWidth',
                value
            })
        }
    }
}
</script>