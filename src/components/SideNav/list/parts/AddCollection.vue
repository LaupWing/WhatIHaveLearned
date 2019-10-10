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
        <button 
            class="find-icon"
            :class="{'active' : popupSettings, 'disable': !collection}" 
            @click="setPopup"
        >
            Search Icon<Search/>
        </button>
        <div class="buttons">
            <button>Cancel</button>
            <button>Create</button>
        </div>
        <Popup 
            :settings="popupSettings"
            :componentId="'Icons'"
            v-if="popupSettings"
        />
    </div>
</template>

<script>
import Search from '@/components/Icons/Search'
import Popup from '@/components/Popup/Popup'
export default {
    name: 'AddCollection',
    components:{
        Search,
        Popup
    },
    data(){
        return{
            collection: null,
            popupSettings: null
        }
    },
    methods:{
        setPopup(){
            if(!this.collection)    return
            const button = this.$el.querySelector('button.find-icon')
            this.popupSettings = {
                coords:{
                    top: button.offsetTop,
                    left: button.offsetLeft + button.offsetWidth,
                    height: button.offsetHeight
                },
                searchTerm: this.collection
            }
        }
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
#Add-Collection button.find-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .5em;
    padding: 5px 10px;
    flex-direction: column;
    border-radius: 10px;
    color: var(--lighter-white);
    transition: .5s;
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
#Add-Collection button.find-icon:hover{
    color: var(--font-color);
}
#Add-Collection button.find-icon svg{
    width: 50px;
    margin: 10px auto;
}
#Add-Collection button svg path{
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
</style>