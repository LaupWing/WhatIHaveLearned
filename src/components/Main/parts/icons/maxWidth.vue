<template>
    <div id="MaxWidth" class="icon-collection" v-click-outside="outside">
        <p>Max Width</p>
        <h2 @click="openPopup">{{getSettings.maxWidth}}<span>px</span> </h2>
        <transition name="topBottomSlide">
            <Options class="popup" v-if="activePopup" v-on:toggle="openPopup"/>
        </transition>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Options from './maxWidth/options'
import ClickOutside from 'vue-click-outside'
export default {
    name: 'MaxWidth',
    components:{
        Options
    },
    computed:{
        ...mapGetters(['getSettings'])
    },
    data(){
        return{
            activePopup: false
        }
    },
    methods:{
        openPopup(){
            this.activePopup = !this.activePopup
        },
        outside(){
            if(this.activePopup){
                this.activePopup = false
            }
        }
    },
    directives: {
        ClickOutside
    }
}
</script>

<style>
#MaxWidth{
    color: #999;
    width: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
}
#MaxWidth p{
    white-space: pre-wrap;
    max-width: 100%;
    text-align: center;
    font-size: .5em;
    position: absolute;
    top: 0;
}
#MaxWidth .options{
    position: absolute;
    bottom: 0;
    transform: translate(0,100%);
    border-left: #f2f2f2 2px solid;
    border-right: #f2f2f2 2px solid;
    width: 100%;
    z-index: 10;
    box-shadow: 0px 17px 23px 0px rgba(0,0,0,0.2);
    overflow: hidden;
}
#MaxWidth .options li.option{
    border-bottom: #f2f2f2 2px solid;
    text-align: center;
    padding: 10px;
    background: white;
    transition: .5s;
    cursor: pointer;
}
#MaxWidth span{
    font-size: .5em;
}
#MaxWidth .options li.option:hover,
#MaxWidth .options li.option.active{
    background: var(--contrast-color);
} 
</style>