<template>
  <main id="Main">
    <div
      v-if="user" 
      class="user"
    >
      <button @click="signout">Signout</button>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Main',
  props: ['user', 'msg'],
  methods:{
    signout(){
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
#Main{
  flex-grow: 1;
  background: var(--secundair-color);
  position: relative;
}
</style>
