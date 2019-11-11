<template>
    <div class="section">
        <li>{{section.section}}</li>
    </div>
</template>

<script>
export default {
    name: 'Section',
    props:['section'],
    methods:{

    },
    created(){
        console.log(this.section)
    }
}
</script>

<style>
.section{
    position: absolute;
    width: 100%;
}
</style>