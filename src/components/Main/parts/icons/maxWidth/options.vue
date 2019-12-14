<template>
    <div class="options">
        <li 
            v-for="(val, index) in options" 
            :key="index" 
            class="option"
            :class="checkActiveOption(val)"    
            @click="changedLayout(val)"
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
        ...mapGetters(['getSettings', 'getCurrentLocation']),
    },
    data(){
        return{
            options:[600,700, 800, 900, 1000, 1100, 1200]
        }
    },
    methods:{
        ...mapActions(['valueMaxMinWidth','updateLayout']),
        checkActiveOption(val){
            if(val === this.getSettings.maxWidth)   return 'active'
        },
        setMaxWidth(value){
            this.$emit('toggle')
            this.valueMaxMinWidth({
                type: 'maxWidth',
                value
            })
        },
        changedLayout(value){
            this.updateLayout({
                layout:{
                    maxWidth: 900
                },
                location: this.getCurrentLocation
            })
        }
    }
}
</script>