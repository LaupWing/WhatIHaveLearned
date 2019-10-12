<template>
    <ul id="List-Container">
        <p class="no-collection" v-if="!userNotes">
            Begin your everlasting knowledge journey by adding your first collection!
        </p>
        <div class="add">
            <li v-if="!addCollection" @click="toggleAddCollection">
                <p>Add a new collection</p><Plus/>
            </li>
            <AddCollection 
                v-on:cancel="toggleAddCollection"
                :user="user"
                :userNotes="userNotes"
            v-else/>
        </div>
        <div class="list-collection">
            <li 
                class="collection"
                v-for="(collection, index) in userNotes"
                :key="index"
            >
                <p>{{collection.collection}}</p>
                <img v-if="collection.icon.type === 'img'" :src="collection.icon.src" alt="">
                <div v-else class="svg-wrapper" v-html="collection.icon.src"></div>
            </li> 
        </div>
    </ul>
</template>

<script>
import Plus from '@/components/Icons/Plus'
import AddCollection from './parts/AddCollection'
export default {
    name: 'ListContainer',
    props:['userNotes', 'user'],
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
    },
    created(){
        console.log(this.userNotes, this.user)
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
ul#List-Container .add,
ul#List-Container .list-collection{
    width: 100%;
}
ul#List-Container .add{
    border: solid 1px var(--lighter-white);
    border-left: none;
    border-right: none;
}
ul#List-Container li.collection{
    border-bottom: solid 1px var(--lighter-white);
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
ul#List-Container li svg,
ul#List-Container li img{
    width: 20px;
    margin-left: 10px;
}
ul#List-Container li svg{
    height: 100%;
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