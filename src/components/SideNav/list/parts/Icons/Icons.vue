<template>
    <div id="Icons" :style="setStyling">

    </div>
</template>

<script>
export default {
    name: 'Icons',
    props:['settings'],
    data(){
        return{

        }
    },
    methods:{
    },
    computed:{
        setStyling(){
            return {
                top: this.settings.coords.top + 'px',
                left: (this.settings.coords.left+10) + 'px'
            }
        }

    },
    created(){
        console.log(this.settings)
    }
}
</script>

<style>
#Icons{
    position: fixed;
    width: 100px;
    height: 100px;
    background: orange;
}
</style>