<template>
    <form id="Icons" :style="setStyling">
        <div class="input-container">
            <input 
                class="icon" 
                type="text"
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false"  
                v-model="settings.searchTerm"
            >
            <Search/>
        </div>
        <div class="buttons">
            <button>Cancel</button>
            <button>Confirm</button>
        </div>        
    </form>
</template>

<script>
import Search from '@/components/Icons/Search'
export default {
    name: 'Icons',
    props:['settings'],
    components:{
        Search
    },
    data(){
        return{
            searchIcon(){

            }
        }
    },
    methods:{
    },
    computed:{
        setStyling(){
            return {
                top: (this.settings.coords.top-7) + 'px',
                left: (this.settings.coords.left+20) + 'px'
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
    width: 400px;
    height: 500px;
    background: var(--main-color);
    border: solid 3px var(--contrast-color);
    position: relative;
    border-radius: 5px;
    /* filter: drop-shadow(0px 2px 2px rgba(130,130,130,1)); */
}
#Icons .input-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: orange; */
    width: 95%;
    margin: 10px auto;
    border: solid 1px var(--font-color);
    border-radius: 5px;
}
#Icons .input-container svg{
    width: 22px;
    margin: 0 10px;
}
#Icons input[type="text"].icon{
    border: none;
    /* border-radius: 0; */
    padding: 10px 15px;
    display: block;
    width: auto;
    /* border-bottom: 3px solid var(--contrast-color); */
}
#Icons::before{
    content: '';
    height: 30px;
    background: var(--contrast-color);
    position: absolute;
    width: 30px;
    left: -15px;
    top: 2.5px;
    z-index: -1;
    transform: rotate(45deg);
}
#Icons .buttons{
    position: absolute;
    bottom: 0;
    width: 80% !important;
    margin: 0 auto;
    margin-bottom: 15px;
    left: 0;
    right: 0;

}
</style>