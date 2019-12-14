<template>
    <div 
        id="BackgroundColor"
        :class="['icon-container', active ? 'active': '']"
        @mouseover="handleHover(true)"
        @mouseout="handleHover(false)"
    >
        <svg id="bg-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169 225">
            <path class="outline" d="M165.46,0C168.15,1.18,169,3.26,169,6.14q-.07,106.32,0,212.64c0,4.69-1.52,6.22-6.15,6.22H6.39C1.73,225,.2,223.47.2,218.82q0-85.33,0-170.68a8,8,0,0,1,2.21-5.72C14.26,29.2,26.07,15.9,37.94,2.66A29.68,29.68,0,0,1,41.07,0ZM9.61,215.56H159.52V9.42H47.15v2.45q0,19,0,38c0,4.76-1.6,6.37-6.29,6.37H9.61ZM37.5,17.19,11.05,46.82H37.5Z"/>
            <path class="inner" d="M9.61,215.56V56.25H40.86c4.69,0,6.29-1.61,6.29-6.37q0-19,0-38V9.42H159.52V215.56Z"/>
            <path class="inner" d="M37.5,17.19V46.82H11.05Z"/>
            <path class="tear" d="M85.1,43.22c17.05,24.48,33.58,48.3,44.68,75.49,11.39,27.9-8.85,59.68-38.65,63.22-29.46,3.51-55.28-19.37-54-48.85.3-6.69,2.81-13.53,5.45-19.81,9.23-22,22.54-41.64,36.06-61.14C80.63,49.32,82.68,46.57,85.1,43.22ZM87.47,176.9c1.72-.29,5,1.16,5.27-2.43.32-3.82-3.06-3.09-5.42-3.36-.12,0-.24,0-.35,0A39.12,39.12,0,0,1,51,141.87c-.65-2.63-.48-5.47-1.18-8.09-.31-1.15-1.83-2-2.8-3-.93,1-2.23,1.91-2.7,3.11s-.1,2.59.07,3.88C47.38,159.61,65,175.74,87.47,176.9Z"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'BackgroundColor',
    data(){
        return{
            active: false
        }
    },
    methods:{
        handleHover(state){
            this.active = state
        }
    }
}
</script>

<style>
#BackgroundColor svg{
    width: 28px
}
.icon-container svg#bg-color .outline,
.icon-container svg#bg-color .tear{
    fill: #999;
}

.icon-container svg#bg-color .inner{
    fill: transparent;
}
.icon-container.active svg#bg-color .tear{
    fill: lightblue ;
}
.icon-container.active svg#bg-color .inner{
    fill: white;
}



</style>