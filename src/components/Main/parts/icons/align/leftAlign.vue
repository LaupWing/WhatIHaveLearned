<template>
<div 
    :class="['icon-container', active || clicked === 'left'? 'active': '']"
    @mouseover="handleHover(true)"
    @mouseout="handleHover(false)"
>
    <svg id="left-align" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.87 349.87">
        <circle class="frame" cx="174.94" cy="174.94" r="170.44"/>
        <path class="outline" d="M174.94,9A165.94,165.94,0,0,1,292.27,292.27,165.94,165.94,0,0,1,57.6,57.6,164.85,164.85,0,0,1,174.94,9m0-9A174.94,174.94,0,1,0,349.87,174.94,174.94,174.94,0,0,0,174.94,0Z"/>
        <rect class="main-bar" x="250.95" y="59.77" width="19.16" height="230.32"/>
        <path class="bar-1" d="M133.09,104.82A13.93,13.93,0,0,0,147,118.75h70.16V90.88H147A13.94,13.94,0,0,0,133.09,104.82Z"/>
        <path class="bar-2" d="M110.64,155.92a13.93,13.93,0,0,0,13.93,13.93h92.62V142H124.57A13.94,13.94,0,0,0,110.64,155.92Z"/>
        <path class="bar-3" d="M84.32,207A13.93,13.93,0,0,0,98.25,221H217.19V193.08H98.25A13.93,13.93,0,0,0,84.32,207Z"/>
        <path class="bar-4" d="M62.64,258.11A13.93,13.93,0,0,0,76.57,272H217.19V244.17H76.57A13.94,13.94,0,0,0,62.64,258.11Z"/>
        <rect class="bar-highlight" x="250.95" y="169.85" width="19.16" height="120.25"/>
    </svg>
</div>
</template>

<script>
export default {
    name: 'leftAlign',
    props:['clicked'],
    data(){
        return{
            active: false
        }
    },
    methods:{
        handleHover(state){
            this.active = state
        }
    },
    created(){
        
    }
}
</script>

<style>
/* Active */
.icon-container.active{
    background: var(--contrast-color);
}
.cls-1{fill:#464c56;}.cls-2{fill:#fff;}.cls-3{fill:#ef7c7f;}.cls-4{fill:#a9b3c6;}.cls-5{fill:#f5afb4;}

.icon-container.active svg#left-align .frame{
    fill:#464c56;
}
.icon-container svg#left-align .bar-1,
.icon-container svg#left-align .bar-2,
.icon-container svg#left-align .bar-3,
.icon-container svg#left-align .bar-4,
.icon-container svg#left-align .main-bar{
    fill: #999;
}
.icon-container.active svg#left-align .bar-1,
.icon-container.active svg#left-align .bar-3{
    fill:#fff;
}
.icon-container svg#left-align .frame,
.icon-container svg#left-align .outline,
.icon-container svg#left-align .bar-highlight{
    fill: transparent;
}
.icon-container.active svg#left-align .bar-2{
    fill:#a9b3c6;
}
.icon-container.active svg#left-align .main-bar,
.icon-container.active svg#left-align .bar-4{
    fill:#ef7c7f;
}
.icon-container.active svg#left-align .bar-highlight{
    fill:#f5afb4;
}

</style>