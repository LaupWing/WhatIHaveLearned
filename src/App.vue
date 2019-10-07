<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <SideNav
      :user="user"
    />
    <Main ms  g="Welcome to Your Vue.js App"/>
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
      user: null
    }
  },
  created(){
    // db.collection('users').get().then(doc=>{
    //   console.log(doc)
    // })

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        console.log(this.user)
        this.user = user
      }else{
        console.log(this.user)
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
}
#app{
  --contrast-color: #F6E64C;
  --main-color:#272627;
  --secundair-color:#141414;
  --font-color: white;
  display: flex;
}
</style>
