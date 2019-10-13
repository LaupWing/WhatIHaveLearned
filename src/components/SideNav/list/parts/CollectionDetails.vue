<template>
    <div id="Collection-Details">
        <li class="collection">{{collection.collection}}</li>
    </div>
</template>

<script>
export default {
    name: 'CollectionDetails',
    props:['collection'],
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style>
#Collection-Details{
    width: 100%;
    position: absolute;
}
</style>