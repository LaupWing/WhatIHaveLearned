<template>
    <div id="SideNav">
    
        <div class="auth-container" v-if="!user">
            <nav>
                <li :class="{'active': authId === 'Login'}" @click="authId = 'Login'">Login</li>
                <li :class="{'active': authId === 'Signup'}" @click="authId = 'Signup'">Signup</li>
            </nav>
            <div class="auth">
                <transition :name="authId" mode="out-in">
                    <component :is="authId"></component>
                </transition>
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
            authId: 'Login',
        }
    },
    methods: {
    },
    created(){
        console.log(this.authId)
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
#SideNav .auth-container{
    height: 500px;
    width: 85%;
    overflow: hidden;
}
#SideNav nav{
    display: flex;
    width: 100%;
    justify-content: space-around;
}

#SideNav nav li{
    list-style: none;
    color: var(--font-color);
    font-size: 1em;
    font-family: var(--secundair-font);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
}
#SideNav nav li.active{
    border-bottom: 3px solid var(--contrast-color);
}
#SideNav .field{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 10px 0;
    opacity: .3;
    font-family: var(--main-font);
    transition: .25s;
    width: 90%;
}
#SideNav .field label{
    color: white;
}
#SideNav .field input{
    color: black;
    border: none;
    border-bottom: 1px solid var(--font-color);
    color: var(--font-color);
    background: transparent;
    padding: 10px 5px;
    outline: none;
    font-size: .8em;
    width: 100%;
}
#SideNav .field input::placeholder{
    opacity: .3;
}
#SideNav .field.active{
    opacity: 1;
}
#SideNav button{
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
    margin-top: 20px;
}

.Login-enter-active {
  animation: slideToRight .5s;
}
.Login-leave-active {
  animation: slideToLeft .5s;
}
.Signup-enter-active {
  animation: slideToLeft .5s reverse;
}
.Signup-leave-active {
  animation: slideToRight .5s reverse;
}
@keyframes slideToLeft {
    from{
        transform: translate(0,0);
    }to{
        transform: translate(100%,0);
    }
}
@keyframes slideToRight {
    from{
        transform: translate(-100%,0);
    }to{
        transform: translate(0,0);
    }
}
</style>