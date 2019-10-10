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
        <div class="buttons">
            <button>Cancel</button>
            <button>Create</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddCollection',
    data(){
        return{
            collection: null
        }
    },
    methods:{

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