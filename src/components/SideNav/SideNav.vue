<template>
    <div id="SideNav">
        <AuthContainer/>
        <!-- <div class="auth-container" v-if="!user">
            <nav>
                <li :class="{'active': authId === 'Login'}" @click="authId = 'Login'">Login</li>
                <li :class="{'active': authId === 'Signup'}" @click="authId = 'Signup'">Signup</li>
            </nav>
            <div class="auth">
                <transition :name="authId" mode="out-in">
                    <component :is="authId"></component>
                </transition>
            </div>
        </div> -->
    </div>
</template>

<script>
import AuthContainer from './auth/AuthContainer'
export default {
    name: 'SideNav',
    components:{
        AuthContainer
    },
    props:['user'],
    data(){
        return{
            authId: 'Login',
        }
    },
    methods: {
    },
    created(){
        
    }
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
</style>