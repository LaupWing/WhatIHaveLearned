<template>
    <div class="settings">
        <h3>These settings are for:  <span>{{getSettings.settingFor}}</span></h3>
        <EditBtn 
            @click="setSetting('edit')"
            :active="active"
            class="icon-collection"            
        />
        <Align
            class="icon-collection"
            :align="align"
        />
        <MaxWidth/>
        <MinWidth/>
        <BackgroundColor class="icon-collection"/>
        <!-- <button class="edit">Toggle Editmode</button> -->
        <!-- <button class="signout">Signout</button> -->
    </div>
</template>

<script>
import EditBtn from './icons/edit'
import Align from './icons/align'
import MinWidth from './icons/minWidth'
import MaxWidth from './icons/maxWidth'
import BackgroundColor from './icons/background'
import {mapGetters} from 'vuex'

export default {
    name: 'Settings',
    components:{
        EditBtn,
        Align,
        MinWidth,
        MaxWidth,
        BackgroundColor
    },
    computed:{
        ...mapGetters(['getSettings'])
    },
    data(){
        return{
            active:[],
            align: null
        }
    },
    methods:{
        setSetting(item){
            this.active.push(item)
        }
    },
    created(){
    }

}
</script>

<style>
.settings{
    width: 100%;
    background: transparent;
    border-bottom: solid #f2f2f2 2px;
    display: flex;
    font-family: var(--main-font);
    position: relative;
}
.settings button{
    border-radius: 0;
    color: #999;
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
.settings .icon-collection{
    border-right: solid 2px #f2f2f2;
}
.settings .icon-container:hover{
    background: var(--contrast-color);
}
.settings svg > *{
    transition: .5s;
}
.settings h2{
    font-weight: 550;
}

.settings h3{
    color: #999;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    font-size: .8em;
    position: absolute;
    opacity: .8;
    left: 0;
    bottom: 0;
    transform: translate(0,100%);
}
.settings h3 span{
    margin-left: 5px;
    border-bottom: solid 2px var(--contrast-color);
    text-transform: capitalize;
}
.settings #MaxWidth.icon-collection:hover,
.settings #MinWidth.icon-collection:hover{
    background: var(--contrast-color);
    color: var(--main-color);
    cursor: pointer;
}
</style>