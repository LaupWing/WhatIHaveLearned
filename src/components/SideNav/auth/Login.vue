<template>
    <form id="Login">
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
        <button>Login</button>
    </form>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            password: null,
            focusField: null,
            email: null,
            fiields
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
#Login{
    padding-top: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>