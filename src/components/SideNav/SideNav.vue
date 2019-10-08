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
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
#SideNav nav{
    display: flex;
}
#SideNav nav li{
    list-style: none;
    color: var(--font-color);
    font-size: 1em;
    font-family: var(--secundair-font);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 15px;
}
</style>