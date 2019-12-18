<template>
    <div class="section">
        <li @click="backToOverview" class="back_to_sectionOverview">Back</li>
        <h4>{{section.section}}</h4>
        <li class="add">Add a chapter <Icons/></li>
    </div>
</template>

<script>
import Icons from '../../../../../Icons/Plus'
export default {
    name: 'Section',
    props:['section', 'Collection'],
    components:{
        Icons
    },
    methods:{
        backToOverview(){
            this.$emit('backTosection')
        }
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
ul#List-Container .section .back_to_sectionOverview{
    border: solid white 1px;
    border-left: none;
    border-radius: 0 20px 20px 0;
    padding: 5px;
    width: 30%;
    font-size: .8em;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* text-transform: uppercase; */
    letter-spacing: 1px;
}
.section h4{
    padding: 10px;
    font-size: 1.5em;
    font-weight: normal;
    color: var(--contrast-color);
    border-bottom: var(--contrast-color) 1px solid;
}
</style>