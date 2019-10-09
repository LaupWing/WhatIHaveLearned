<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <SideNav
      :user="user"
    />
    <Main 
      msg="Welcome to Your Vue.js App"
      :user="user"
      :userNotes="userNotes"
    />
  </div>
</template>

<script>
import Main from './components/Main.vue'
import SideNav from './components/SideNav/SideNav.vue'
import firebase from 'firebase'
import db from '@/firebase/init' // This has to be started in order to start the app intial
export default {
  name: 'app',
  components: {
    Main,
    SideNav
  },
  data(){
    return{
      user: null,
      userNotes: null
    }
  },
  methods:{
    getNotes(){
      db
        .collection('user-notes')
        .doc(this.user.email)
        .get()
        .then(doc=>{
          if(doc.exits){
            this.userNotes = doc
          }else{
            this.userNotes = null
          }
        })
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.user = user
      }else{
        this.user = null
      }
    })
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
}
li{
  list-style: none;
}
</style>
