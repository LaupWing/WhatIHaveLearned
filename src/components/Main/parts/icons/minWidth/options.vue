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
            options:[300, 400, 500, 600, 700, 800]
        }
    },
    methods:{
        ...mapActions(['updateLayoutAndInDB', 'allCollections']),
        checkActiveOption(val){
            if(val === this.getSettings.minWidth)   return 'active'
        },
        async changedLayout(value){
            await this.updateLayoutAndInDB({
                layout:{
                    minWidth: value
                },
                location: this.getCurrentLocation,
                data: this.allCollections
            })
            this.$emit('toggle')
        }
    }
}
</script>