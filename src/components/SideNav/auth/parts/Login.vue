<template>
    <form id="Login" @submit.prevent="submit">
        <div class="field" :class="{'active':email || focusField==='email'}">
            <label for="">Email</label>
            <input
                @focus="focusEl('email')"
                @blur="focusEl(null)"  
                type="email" 
                placeholder="test@hotmail.com"
                v-model="email"
            >
        </div>
        <div class="field" :class="{'active':password || focusField==='password'}">
            <label for="">Password</label>
            <input
                @focus="focusEl('password')"
                @blur="focusEl(null)"  
                type="password" 
                placeholder="password123"
                v-model="password"
            >
        </div>
        <p class="feedback" v-if="feedback">{{feedback}}</p>
        <button>Login</button>
    </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data(){
        return{
            password: null,
            focusField: null,
            email: null,
            feedback: null
        }
    },
    methods:{
        focusEl(field){
            this.focusField = field
        },
        submit(){
            if(this.password && this.email){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(cred=>{
                        const user = cred.user
                    })
                    .catch(err=>{
                        this.feedback = err.message
                    })
            }else{
                this.feedback = 'Please fill in both fields'
            }
        }
    }
}
</script>

<style>
#Login{
    padding-top: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>