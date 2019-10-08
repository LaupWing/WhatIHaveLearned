<template>
    <form id="Signup">
        <div class="field" :class="{'active':email || focusField==='email'}">
            <label for="">Email</label>
            <input
                @focus="focusEl('email')"
                @blur="focusEl(null)" 
                required 
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
                required 
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
                required 
                type="password" 
                placeholder="password123"
                v-model="confirmPassword"
            >
        </div>
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
            email: null
        }
    },
    methods:{
        focusEl(field){
            this.focusField = field
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