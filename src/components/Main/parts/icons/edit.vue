<template>
<div 
    :class="['icon-container', getSettings.editMode||active? 'active': '']" 
    @click="toggleEdit"
    @mouseover="handleHover(true)"
    @mouseout="handleHover(false)"
>
    <svg
        :class="active? 'active':''"
        id="pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.87 349.87"
    >
        <circle class="frame" cx="174.94" cy="174.94" r="170.44" transform="translate(-18.04 329.74) rotate(-83.74)"/>
        <path class="outline" d="M174.94,9A165.94,165.94,0,0,1,292.27,292.27,165.94,165.94,0,0,1,57.6,57.6,164.85,164.85,0,0,1,174.94,9m0-9A174.94,174.94,0,1,0,349.87,174.94,174.94,174.94,0,0,0,174.94,0Z" transform="translate(0 0)"/>
        <path class="pencil-outline" d="M216.31,80.87a13.59,13.59,0,0,1,9.65,4l39.16,39.21a13.68,13.68,0,0,1,0,19.34L158.74,250a13.42,13.42,0,0,1-6.56,3.62L83.3,269a2.4,2.4,0,0,1-.46.05,2.1,2.1,0,0,1-2-2.57L96.65,197.9a13.37,13.37,0,0,1,3.58-6.45L206.65,84.88a13.62,13.62,0,0,1,9.66-4m0-9a22.49,22.49,0,0,0-16,6.65L93.86,185.09a22.4,22.4,0,0,0-6,10.79L72,264.4a11.09,11.09,0,0,0,13.24,13.33l68.87-15.38a22.36,22.36,0,0,0,11-6L271.49,149.79a22.71,22.71,0,0,0,0-32.06L232.33,78.52a22.48,22.48,0,0,0-16-6.65Z" transform="translate(0 0)"/>
        <path class="pencil-head" d="M100.23,191.45a13.37,13.37,0,0,0-3.58,6.45L86.52,241.72l21.67,21.67,44-9.82a13.42,13.42,0,0,0,6.56-3.62l2.85-2.84L103.08,188.6Z" transform="translate(0 0)"/>
        <path class="pencil-gum" d="M265.12,124.09,226,84.88a13.64,13.64,0,0,0-19.31,0L192.3,99.24l58.51,58.51,14.31-14.32A13.68,13.68,0,0,0,265.12,124.09Z" transform="translate(0 0)"/>
        <rect class="pencil-body" x="113.81" y="131.8" width="126.28" height="82.75" transform="translate(-70.63 175.84) rotate(-45)"/>
        <path class="pencil-tip" d="M80.8,266.43A2.11,2.11,0,0,0,83.3,269l24.89-5.56L86.52,241.72Z" transform="translate(0 0)"/>
        <polygon class="pencil-highlight" points="129.87 215.39 161.59 247.11 250.81 157.75 219.16 126.1 129.87 215.39"/>
        <path class="pencil-shadow" d="M265.13,143.43l-14.3,14.33L161.6,247.11,158.75,250a13.48,13.48,0,0,1-6.56,3.61l-44,9.82-3.66-3.66,48.77-20.9h0l88.26-90.32,24-24A13.67,13.67,0,0,1,265.13,143.43Z" transform="translate(0 0)"/>
    </svg>
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: 'EditBtn',
    computed: {
        ...mapGetters(['getSettings'])
    },
    data(){
        return{
            active: false,
        }
    },
    methods:{
        ...mapActions(['toggleEdit']),
        handleHover(state){
            this.active = state
        }
    }
}
</script>

<style>
.icon-container.active{
    background: var(--contrast-color);
}
#pencil .frame,
#pencil .pencil-outline,
#pencil .pencil-tip,
#pencil .pencil-body{
    fill:#999;
}
.icon-container.active #pencil .outline,
.icon-container.active #pencil .pencil-gum,
.icon-container.active #pencil .pencil-head{
    fill: #fff;
}
#pencil .outline,
#pencil .pencil-highlight,
#pencil .pencil-gum,
#pencil .frame,
#pencil .pencil-head,
#pencil .pencil-shadow{
    fill: transparent;
}
.icon-container.active #pencil .frame,
.icon-container.active #pencil .pencil-outline{
    fill:#464c56;
}
.icon-container.active #pencil .pencil-body{
    fill:#f5afb4;
}
.icon-container.active #pencil .pencil-tip{
    fill:#a9b3c6;
}
.icon-container.active #pencil .pencil-highlight{
    fill:#ef7c7f;
}
.icon-container.active #pencil .pencil-shadow{
    fill:#1d1d1b;
    opacity:0.4;
}
</style>