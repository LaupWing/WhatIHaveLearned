<template>
    <ul id="List-Container">
        <p class="no-collection" v-if="!userNotes">
            Begin your everlasting knowledge journey by adding your first collection!
        </p>
        <div class="add">
            <transition 
                name="slideTopDown" 
                mode="out-in" 
                v-on:enter="animEnded"
            >
                <li 
                    v-if="!addCollection" 
                    @click="toggleAddCollection"
                >
                    <p>Add a new collection</p><Plus/>
                </li>
                <AddCollection
                    v-on:cancel="toggleAddCollection"
                    v-on:create="create"
                    :user="user"
                    :userNotes="userNotes"
                    v-else
                />
            </transition>
        </div>
        <div class="list-collection">
            <transition-group name="fadeIn">
                <li 
                    class="collection"
                    v-for="(collection) in userNotes"
                    :key="collection.collection"
                >
                    <p>{{collection.collection}}</p>
                    <img v-if="collection.icon.type === 'img'" :src="collection.icon.src" alt="">
                    <div v-else class="svg-wrapper" v-html="collection.icon.src"></div>
                </li> 
            </transition-group>
        </div>
    </ul>
</template>

<script>
import Plus from '@/components/Icons/Plus'
import AddCollection from './parts/AddCollection'
import db from '@/firebase/init'

export default {
    name: 'ListContainer',
    props:['userNotes', 'user'],
    components:{
        Plus,
        AddCollection
    },
    data(){
        return{
            addCollection: false,
            newCollection: null,
            copiedNotes: JSON.parse(JSON.stringify(this.userNotes))
        }
    },
    methods:{
        toggleAddCollection(){
            this.addCollection = !this.addCollection
        },
        animEnded(){
            if(this.newCollection){
                this.saveCollection()
            }
        },
        create(data){
            this.newCollection = data
            this.toggleAddCollection()
        },
        saveCollection(){
            this.copiedNotes.push(this.newCollection)
            db
                .collection('userNotes')
                .doc(this.user.uid)
                .update({
                    collections: this.copiedNotes
                })
                .then(()=>this.updateNotesArray())
                .catch(()=>{
                    db
                        .collection('userNotes')
                        .doc(this.user.uid)
                        .update({
                            collections: this.copiedNotes
                        })
                        .then(()=>this.updateNotesArray())
                })
        },
        updateNotesArray(){
            this.userNotes.push(this.newCollection)
            this.newCollection = null
        },
    },
    created(){
        
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
    overflow: hidden;
}
ul#List-Container li.collection{
    border-bottom: solid 1px var(--lighter-white);
    text-transform: capitalize;
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
.slideTopDown-enter-active {
  animation: heightAnim 1s;
}
.slideTopDown-leave-active {
  animation: heightAnim 1s reverse;
}
.fadeIn-enter-active {
  animation: fadeIn 1s;
}
.fadeIn-leave-active {
  animation: fadeIn 1s reverse;
}
</style>