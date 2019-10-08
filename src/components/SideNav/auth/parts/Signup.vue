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
        <p v-if="feedback">{{feedback}}</p>
        <button>Signup</button>
    </form>
</template>

<script>
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
                if(this.password === this.confirmPassword){

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