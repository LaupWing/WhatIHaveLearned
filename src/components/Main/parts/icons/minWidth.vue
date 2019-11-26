<template>
    <div id="MinWidth" class="icon-collection">
        <p>Min Width</p>
        <h2 @click="openPopup">500</h2>
        <transition name="topBottomSlide">
            <Options class="popup" v-if="activePopup"/>
        </transition>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Options from './minWidth/options'
export default {
    name: 'MinWidth',
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
        ...mapActions(['elActivePopup']),
        openPopup(){
            this.activePopup = !this.activePopup
            if(this.activePopup){
                this.elActivePopup(`${this.$el.id} popup`)
            }
        }
    }
}
</script>

<style>
#MinWidth{
    color: #999;
    width: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
}
#MinWidth p{
    white-space: pre-wrap;
    max-width: 100%;
    text-align: center;
    font-size: .5em;
    position: absolute;
    top: 0;
}
#MinWidth .options{
    position: absolute;
    bottom: 0;
    transform: translate(0,102%);
    border-left: #f2f2f2 2px solid;
    border-right: #f2f2f2 2px solid;
    width: 100%;
    z-index: 10;
    box-shadow: 0px 17px 23px 0px rgba(0,0,0,0.2);
    overflow: hidden;
}
#MinWidth .options li.option{
    border-bottom: #f2f2f2 2px solid;
    text-align: center;
    padding: 10px;
    background: white;
}
</style>