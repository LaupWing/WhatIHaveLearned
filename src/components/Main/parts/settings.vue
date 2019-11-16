<template>
    <div class="settings">
        <EditBtn 
            @click="setSetting('edit')"
            :active="active"
        />
        <!-- <button class="edit">Toggle Editmode</button> -->
        <button class="signout">Signout</button>
    </div>
</template>

<script>
import EditBtn from './icons/edit'
export default {
    name: 'Settings',
    components:{
        EditBtn
    },
    data(){
        return{
            active:[]
        }
    },
    methods:{
        test(){
            console.log(this.active)
        },
        setSetting(item){
            this.active.push(item)
            console.log(this.active)
        }
    }
}
</script>

<style>
.settings{
    width: 100%;
    background: var(--secundair-color);
    display: flex;
}
.settings button{
    border-radius: 0;
}
.settings button.signout{
    margin-left: auto;
}
.settings svg{
    width: 40px;
    height: 100%;
}
.settings .icon-container{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .25s;
    cursor: pointer;
}
.settings .icon-container:hover{
    background: var(--contrast-color);
}
.settings svg > *{
    transition: .5s;
}
</style>