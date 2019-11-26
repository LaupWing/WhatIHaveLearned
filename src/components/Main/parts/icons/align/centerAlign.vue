<template>
<div 
    :class="['icon-container', active? 'active': '']"
    @mouseover="handleHover(true)"
    @mouseout="handleHover(false)"
>
    <svg id="align-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.87 349.87">
        <circle class="frame" cx="174.94" cy="174.94" r="170.44" transform="translate(-72.46 174.94) rotate(-45)"/>
        <path class="outline" d="M174.94,9A165.94,165.94,0,0,1,292.27,292.27,165.94,165.94,0,0,1,57.6,57.6,164.85,164.85,0,0,1,174.94,9m0-9A174.94,174.94,0,1,0,349.87,174.94,174.94,174.94,0,0,0,174.94,0Z"/>
        <path class="bar-1" d="M145.39,92.51v27.87H124.7a13.94,13.94,0,1,1,0-27.87Z"/>
        <path class="bar-1" d="M237,106.45a13.93,13.93,0,0,1-13.94,13.93H204.51V92.51h18.58A13.94,13.94,0,0,1,237,106.45Z"/>
        <path class="bar-2" d="M145.29,137.5v27.87H113.37a13.94,13.94,0,0,1,0-27.87Z"/>
        <path class="bar-2" d="M248.25,151.43a13.93,13.93,0,0,1-13.93,13.94H204.51V137.5h29.81A13.93,13.93,0,0,1,248.25,151.43Z"/>
        <path class="bar-3" d="M145.29,182.5v27.87H100.21a13.94,13.94,0,1,1,0-27.87Z"/>
        <path class="bar-3" d="M261.42,196.44a13.93,13.93,0,0,1-13.94,13.93h-43V182.5h43A13.94,13.94,0,0,1,261.42,196.44Z"/>
        <path class="bar-4" d="M272.25,241.43a13.93,13.93,0,0,1-13.93,13.93H204.51V227.49h53.81A13.93,13.93,0,0,1,272.25,241.43Z"/>
        <path class="bar-4" d="M145.29,227.49v27.87H89.37a13.94,13.94,0,0,1,0-27.87Z"/>
        <rect class="main-bar" x="165.36" y="59.77" width="19.16" height="230.32"/>
        <rect class="bar-highlight" x="165.36" y="169.85" width="19.16" height="120.25"/>
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
.icon-container.active{
    background: var(--contrast-color);
}
.icon-container.active svg#align-left .frame{
    fill:#464c56;
}
.icon-container.active svg#align-left .main-bar{
    fill:#ef7c7f;
}
.icon-container.active svg#align-left .bar-highlight,
.icon-container.active svg#align-left .bar-1{
    fill:#f5afb4;
}
.icon-container.active svg#align-left .bar-2{
    fill:#a9b3c6;
}

.icon-container svg#align-left .frame,
.icon-container.active svg#align-left .outline,
.icon-container.active svg#align-left .bar-3,
.icon-container.active svg#align-left .bar-4{
    fill:#fff;
}

.icon-container svg#align-left .main-bar,
.icon-container svg#align-left .bar-1,
.icon-container svg#align-left .bar-2,
.icon-container svg#align-left .bar-3,
.icon-container svg#align-left .bar-4{
    fill: #999;
}

.icon-container svg#align-left .outline,
.icon-container svg#align-left .bar-highlight{
    fill: transparent;
}
</style>