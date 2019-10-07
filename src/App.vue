<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import firebase from 'firebase'
import db from '@/firebase/init' // This has to be started in order to start the app intial
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created(){
    // db.collection('users').get().then(doc=>{
    //   console.log(doc)
    // })

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.getDataOfUser()
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
