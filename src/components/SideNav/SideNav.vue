<template>
    <div id="SideNav">
    
        <div class="auth-container" v-if="!user">
            <nav>
                <li @click="authId = 'Login'">Login</li>
                <li @click="authId = 'Signup'">Signup</li>
            </nav>
            <div class="auth">
                <component :is="authId"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Login from './auth/Login'
import Signup from './auth/Signup'
export default {
    name: 'SideNav',
    components:{
        'Login':Login,
        'Signup': Signup
    },
    props:['user'],
    data(){
        return{
            authId: 'Login'
        }
    },
    methods: {
        
    },
    created(){}
}
</script>

<style>
#SideNav{
    height: 100vh;
    background: var(--main-color);
    width: 250px;
}
</style>