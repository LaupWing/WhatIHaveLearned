<template>
<div 
    :class="['icon-container', active? 'active': '']" 
    @mouseover="handleHover(true)"
    @mouseout="handleHover(false)"
>
    <svg id="leftAlign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.87 349.87">
        <circle class="frame" cx="174.94" cy="174.94" r="170.44"/>
        <path class="outline" d="M174.94,9A165.94,165.94,0,0,1,292.27,292.27,165.94,165.94,0,0,1,57.6,57.6,164.85,164.85,0,0,1,174.94,9m0-9A174.94,174.94,0,1,0,349.87,174.94,174.94,174.94,0,0,0,174.94,0Z"/>
        <rect class="main-bar" x="80.56" y="59.77" width="19.16" height="230.32"/>
        <path class="bar-1" d="M217.26,104.82a13.93,13.93,0,0,1-13.94,13.93H133.16V90.88h70.16A13.94,13.94,0,0,1,217.26,104.82Z"/>
        <path class="bar-2" d="M239.71,155.92a13.93,13.93,0,0,1-13.93,13.93H133.16V142h92.62A13.94,13.94,0,0,1,239.71,155.92Z"/>
        <path class="bar-3" d="M266,207A13.93,13.93,0,0,1,252.1,221H133.16V193.08H252.1A13.93,13.93,0,0,1,266,207Z"/>
        <path class="bar-4" d="M287.71,258.11A13.93,13.93,0,0,1,273.78,272H133.16V244.17H273.78A13.94,13.94,0,0,1,287.71,258.11Z"/>
        <rect class="bar-highlight" x="80.56" y="169.85" width="19.16" height="120.25"/>
    </svg>
</div>
</template>

<script>
export default {
    name: 'EditBtn',
    data(){
        return{
            active: false,
            clicked: false
        }
    },
    methods:{
        handleHover(state){
            if(!this.clicked){
                this.active = state
            }
        }
    }
}
</script>

<style>
/* Active */
.icon-container.active{
    background: var(--contrast-color);
}
.icon-container.active svg#leftAlign .frame{
    fill:#464c56;
}
.icon-container.active svg#leftAlign .bar-1,
.icon-container.active svg#leftAlign .bar-4,
.icon-container.active svg#leftAlign .outline{
    fill: #fff;
} 
.icon-container.active svg#leftAlign .main-bar,
.icon-container.active svg#leftAlign .bar-3{
    fill:#ef7c7f;
}
.icon-container.active svg#leftAlign .bar-2{
    fill: #a9b3c6;
}
.icon-container.active svg#leftAlign .bar-highlight{
    fill:#f5afb4;
}

/* Not active */

.icon-container svg#leftAlign .frame,
.icon-container svg#leftAlign .bar-highlight,
.icon-container svg#leftAlign .outline{
    fill: transparent;
}

.icon-container svg#leftAlign .main-bar,
.icon-container svg#leftAlign .bar-1,
.icon-container svg#leftAlign .bar-2,
.icon-container svg#leftAlign .bar-3,
.icon-container svg#leftAlign .bar-4{
    fill: #999;
}


</style>