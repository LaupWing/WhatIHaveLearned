<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <SideNav
      :user="user"
      :userNotes="userNotes"
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
      userNotes: []
    }
  },
  methods:{
    getNotes(){
      db
        .collection('userNotes')
        .doc(this.user.uid)
        .get()
        .then(doc=>{
          if(doc.exists){
            this.userNotes = doc.data().collections
          }
        })
    },
    loginStates(){
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.user = user
          this.getNotes()
        }else{
          this.user = null
          this.userNotes = []
        }
      })
    },
    dbStates(){
      let ref = db.collection('userNotes')
        ref.onSnapshot(snapshot=>{
          snapshot.docChanges().forEach(change=>{
            console.log(change.doc.id, this.user.uid)
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
    console.log(this.userNotes)
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
</style>
