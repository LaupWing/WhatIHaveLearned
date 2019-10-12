<template>
    <form id="Icons" :style="setStyling" @submit.prevent="loadingAllIcons">
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
            <Search @click="loadingAllIcons"/>
        </div>
        <div class="search-container">
            <div class="loading" v-if="loading">
                <p>Waiting for the source {{loading}}</p>
                <p>It is worth it!</p>
            </div>
            <div 
                class="icons-result"
                v-for="(item,index) in allIcons"
                :class="{chosen: chosen===item}"
                :key="index"
                @click="chosen = item"
            >
                <img v-if="item.type === 'img'" :src="item.src" alt="">
                <div v-else class="svg-container" v-html="item.src">

                </div>
            </div>
        </div>
        <div class="buttons">
            <button type="button">Cancel</button>
            <button type="button" @click="submitIcon">Confirm</button>
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
            feedback: null,
            searchTerm: this.settings.searchTerm,
            loading: null,
            undraw: null,
            noun: null,
            flatIcon: null,
            allIcons: [],
            chosen:null
        }
    },
    methods:{
        async getIcon(source){
            try{
                const config = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({search:this.searchTerm}),
                    mode: 'cors'
                }
                const response = await fetch(`https://iconapi.herokuapp.com/${source}`, config)
                const data     = await response.json()
                return data
            }
            catch(err){
                this.feedback = err.message
            }
        },
        async loadingAllIcons(){
            try{
                this.loading = 'Undraw 1/3'
                const undraw = await this.getIcon('undraw')   
                this.undraw = undraw
                    .map(svg=>{
                        return{
                            type: 'svg',
                            src: svg
                        }
                    })
            }catch(err){
                console.log(err)
            }
            try{
                this.loading = 'NounProject 2/3'
                const noun = await this.getIcon('noun')   
                this.noun = noun    
                    .map(img=>{
                        return{
                            type: 'img',
                            src: img
                        }
                    }) 
            }catch(err){
                console.log(err)
            }
            try{
                this.loading = 'FlatIcon 3/3'
                const flatIcon = await this.getIcon('flatIcon')
                this.flatIcon = flatIcon 
                    .map(img=>{
                        return{
                            type: 'img',
                            src: img
                        }
                    })    
                this.loading = null     
                this.allIcons = this.allIcons.concat(this.undraw, this.noun, this.flatIcon)
                console.log(this.allIcons)
            }catch(err){
                console.log(err)
            }
        },
        submitIcon(){
            if(this.chosen){
                this.$emit('chosenIcon', this.chosen)
            }
        }
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
        this.loadingAllIcons()
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
    padding: 10px;
    /* filter: drop-shadow(0px 2px 2px rgba(130,130,130,1)); */
}
#Icons .input-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
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
}
#Icons .search-container{
    max-width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    max-height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    background: var(--lighter-white);
}
#Icons .search-container .icons-result{
    width: 50px;
    margin: 10px; 
    transition: .25s;
    cursor: pointer;
    padding: 5px;
}
#Icons .search-container .icons-result.chosen,
#Icons .search-container .icons-result:hover{
    /* border: solid var(--contrast-color) 2px;      */
    background: var(--contrast-color);
}
#Icons .search-container .icons-result img,
#Icons .search-container .icons-result svg{
    width: 100%;
    height: 100%;
    margin: 0;
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