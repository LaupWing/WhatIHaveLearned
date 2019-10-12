<template>
    <div id="Add-Collection">
        <h2>Collection:</h2>
        <input 
            type="text" 
            autocomplete="off" 
            autocorrect="off" 
            autocapitalize="off" 
            spellcheck="false" 
            placeholder="For Example: Programming"
            v-model="collection"
        >
        <transition name="flip" mode="out-in">
            <button 
                class="find-icon"
                :class="{'active' : popupSettings, 'disable': !collection}" 
                @click="setPopup"
                v-if="!icon"
                key="1"
            >
                Search Icon<Search class="search"/>
            </button>
            <button 
                key="2"
                class="chosen-icon"
                :class="{'active' : popupSettings, 'disable': !collection}" 
                @click="setPopup"
                v-else
            >
                Change Icon 
                    <img v-if="icon.type==='img'" :src="icon.src" alt="">
                    <div v-else class="svg-wrapper" v-html="icon.src"></div>
            </button>
        </transition>
        <p class="info-icon">Icons is not a must!</p>
        <div class="buttons">
            <button @click="cancel">Cancel</button>
            <button @click="create">Create</button>
        </div>
        <Popup 
            :settings="popupSettings"
            :componentId="'Icons'"
            v-if="popupSettings"
            v-on:submitIcon="submitIcon"
        />
    </div>
</template>

<script>
import Search from '@/components/Icons/Search'
import Popup from '@/components/Popup/Popup'
import db from '@/firebase/init'
export default {
    name: 'AddCollection',
    props:['user', 'userNotes'],
    components:{
        Search,
        Popup
    },
    data(){
        return{
            collection: null,
            popupSettings: null,
            icon: null,
            copiedNotes: JSON.parse(JSON.stringify(this.userNotes))
        }
    },
    methods:{
        create(){
            this.copiedNotes.push({
                collection: this.collection,
                icon: this.icon,
                sections:[]
            })
            // console.log(this.copiedNotes, this.userNotes)
            // this.userNotes.push({
            //     collection: this.collection,
            //     icon: this.icon,
            //     sections:[]
            // })
            // this.$emit('cancel')
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
            this.userNotes.push({
                collection: this.collection,
                icon: this.icon,
                sections:[]
            })
            this.$emit('cancel')
        },
        cancel(){
            this.$emit('cancel')
        },
        setPopup(){
            if(!this.collection)    return
            const button = this.$el.querySelector('button.find-icon') || this.$el.querySelector('button.chosen-icon')
            this.popupSettings = {
                coords:{
                    top: button.offsetTop,
                    left: button.offsetLeft + button.offsetWidth,
                    height: button.offsetHeight
                },
                searchTerm: this.collection
            }
        },
        submitIcon(data){
            this.popupSettings = null,
            this.icon = data
        }
    },
    created(){
        
    }
}
</script>

<style>
#Add-Collection{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px 20px;
}
#Add-Collection h2{
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 10px;
}
#Add-Collection input[type="text"],
#Add-Collection .buttons{
    width: 100%;

}
#Add-Collection button.chosen-icon,
#Add-Collection button.find-icon{
    width: 100px;
    height: 100px;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: .5em;
    flex-direction: column;
    border-radius: 10px;
    color: var(--lighter-white);
    transition: .5s;
}
#Add-Collection button.chosen-icon img,
#Add-Collection button.chosen-icon svg{
    width: 85%;
}
#Add-Collection button.chosen-icon svg{
    height: 100%;
}
#Add-Collection button.find-icon.disable{
    border-color: lightgray;
    opacity: .2;
    cursor: default;
}
#Add-Collection button.find-icon.disable:hover{
    background: transparent;
    color: var(--lighter-white);
}
#Add-Collection p.info-icon{
    font-size: .7em;
    opacity: .3;
}
#Add-Collection button.find-icon:hover{
    color: var(--font-color);
}
#Add-Collection button.find-icon svg{
    width: 50px;
    margin: 10px auto;
}
#Add-Collection button svg.search path{
    fill: white;
}
#Add-Collection input[type="text"]{
    padding: 5px 10px;
    background: transparent;
    border-radius: 5px;
    border: solid 1px var(--font-color);
    color: var(--font-color);
}
#Add-Collection .buttons{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#Add-Collection button{
    font-size: .6em;
    margin-top: 20px;
}
.flip-enter-active {
  animation: flipAnim .5s;
}
.flip-leave-active {
  animation: flipAnim .5s reverse;
}
</style>