<template>
    <form id="Signup" @submit.prevent="submit">
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
        <div class="field" :class="{'active':confirmPassword || focusField==='confirmPassword'}">
            <label for="">Confirm Password</label>
            <input
                @focus="focusEl('confirmPassword')"
                @blur="focusEl(null)"  
                type="password" 
                placeholder="password123"
                v-model="confirmPassword"
            >
        </div>
        <p class="feedback" v-if="feedback">{{feedback}}</p>
        <button>Signup</button>
    </form>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data(){
        return{
            password: null,
            confirmPassword: null,
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
            if(this.password && this.confirmPassword && this.email){
                const ref = db.collection('users').doc(this.email)
                if(this.password === this.confirmPassword){
                    ref
                        .get()
                        .then(doc=>{
                            if(doc.exists){
                                this.feedback = 'Email is already in use!'
                            }
                            else{
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(this.email,this.password)
                                    .then(cred=>{
                                        const user = cred.user
                                        ref.set({
                                            user_id: user.uid
                                        })
                                    })

                            }
                        })
                }else{
                    this.feedback = 'The password has to match!'
                }
            }else{
                this.feedback = 'All fields has to be filled in!'
            }
        }
    }
}
</script>

<style>
#Signup{
    padding-top: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>