<template>
    <ul id="List-Container">
        <p class="no-collection" v-if="!userNotes">
            Begin your everlasting knowledge journey by adding your first collection!
        </p>
        <div class="add">
            <li v-if="!addCollection" @click="toggleAddCollection">
                <p>Add a new collection</p><Plus/>
            </li>
            <AddCollection v-else/>
        </div>
    </ul>
</template>

<script>
import Plus from '@/components/Icons/Plus'
import AddCollection from './parts/AddCollection'
export default {
    name: 'ListContainer',
    props:['userNotes'],
    components:{
        Plus,
        AddCollection
    },
    data(){
        return{
            addCollection: false
        }
    },
    methods:{
        toggleAddCollection(){
            this.addCollection = !this.addCollection
        }
    }
}
</script>

<style>
ul#List-Container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* animation: slideToLeft 1s reverse; */
}
ul#List-Container .add{
    width: 100%;
    border: solid 1px var(--lighter-white);
    border-left: none;
    border-right: none;
}
ul#List-Container li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    transition: .25s;
}
ul#List-Container li svg{
    width: 20px;
    margin-left: 10px;
}
ul#List-Container li:hover{
    background: var(--contrast-color);
    border-color: var(--contrast-color);
    color: var(--secundair-color);
}
ul#List-Container li:hover svg#Plus path{
    fill: var(--main-color);
}
ul#List-Container p.no-collection{
    width: 90%;
    text-align: center;
    margin: 20px 0;
    margin-top: 0;
    font-size: .9em;
    color: var(--contrast-color);
}
</style>