<template>
  <div id="app">
    <SideNav/>
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import sortByName from './helpers/sortName.js'
import Main from './components/Main/Main3.vue'
import SideNav from './components/SideNav/SideNav.vue'
import firebase from 'firebase'
import db from '@/firebase/init' // This has to be started in order to start the app intial
import {mapGetters, mapActions} from 'vuex'
import parentClassChecker from './helpers/parentClass'

export default {
  name: 'app',
  components: {
    Main,
    SideNav
  },
  computed:{
      ...mapGetters(['getSettings'])
  },
  data(){
    return{
    }
  },
  methods:{
    ...mapActions(['getUser']),
    loginStates(){
        firebase.auth().onAuthStateChanged(user=>{
            this.getUser()
        })
    },
    dbStates(){
        let ref = db.collection('userNotes')
            ref.onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(change=>{
                    if(!this.user)  return
                    if(change.type === 'modified' && change.doc.id === this.user.uid){
                    console.log(change)
                    // console.log(this.userNotes)
                    }
                })
            })
        }
    },
    created(){
        this.loginStates()
        this.dbStates()
    },
    mounted(){
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app{
    --contrast-color: #F6E64C;
    --main-color:#272627;
    --lighter-white: rgba(255,255,255,.2);
    --secundair-color:#141414;
    --font-color: white;
    --main-font: 'Be Vietnam', sans-serif;
    --secundair-font: 'Comfortaa', cursive;
    display: flex;
    font-family: var(--main-font);
    color: var(--font-color);
}
input,
button{
    outline: none;
    border: none;
}
input[type="text"]::placeholder{
    font-style: italic;
    opacity: .5;
}
li{
    list-style: none;
}
button{
    padding: 7px 20px;
    border: none;
    text-transform: uppercase;
    color: white;
    background: transparent;
    border:2px solid var(--contrast-color);
    font-family: var(--secundair-font);
    border-radius: 20px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: .25s;
}

button:hover,
button.active{
    background: var(--contrast-color);
    color: var(--secundair-color);
}

svg{
    transition: .25s;
}
@keyframes fade {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
@keyframes topBottomSlide{
    from{
        max-height: 0;
    }
    to{
        max-height: 260px;
    }
}
@keyframes heightAnim {
    from{
        /* overflow: hidden;
        max-height: 0; */
        transform: scaleX(0);
    }
    to{
        /* overflow: hidden;
        max-height: 1000px;    */
        transform: scaleX(1);
    }
}
@keyframes flipAnim {
    from{
        transform: scaleX(0);
    }
    to{
        transform: scaleX(1);   
    }
}
@keyframes fadeIn {
    from{
        transform: translate(0,50%);
        opacity: 0;
    }
    to{
        transform: translate(0,0);
        opacity: 1;   
    }
}
@keyframes fadeInRight {
    from{
        transform: translate(10%,0);
        opacity: 0;
    }
    to{
        transform: translate(0,0);
        opacity: 1;   
    }
}
@keyframes fadeInLeft {
    from{
        transform: translate(-10%,0);
        opacity: 0;
    }
    to{
        transform: translate(0,0);
        opacity: 1;   
    }
}
@keyframes fadeOutLeft {
    from{
        transform: translate(0,0);
        opacity: 1;
    }
    to{
        transform: translate(-10%,0);
        opacity: 0;
    }
}
/* Animation classes */
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
.forward-enter-active {
    animation: slideToLeft 1s reverse;
}
.forward-leave-active {
    animation: slideToRight 1s reverse;
}
.backward-enter-active {
    animation: slideToRight 1s;
}
.backward-leave-active {
    animation: slideToLeft 1s;
}
.topBottomSlide-enter-active{
    animation: topBottomSlide 1s;
}
.topBottomSlide-leave-active{
    animation: topBottomSlide 1s reverse;
}

</style>
