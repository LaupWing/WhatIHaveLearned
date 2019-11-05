<template>
    <div class="overview">
        <li @click="backToCollection">Back to collection</li>
        <li class="collection">{{collection.collection}}</li>
        <li>Add new Section<Plus/></li>
    </div>
</template>

<script>
export default {
    name: 'Overview',
    props:['collection'],
    methods:{
        backToCollection(){
            this.$emit('backToCollection')
        }
    }

}
</script>

<style>

</style>