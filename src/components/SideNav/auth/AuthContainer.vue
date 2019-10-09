<template>
    <div class="auth-container">
        <nav>
            <li :class="{'active': authId === 'Login'}" @click="authId = 'Login'">Login</li>
            <li :class="{'active': authId === 'Signup'}" @click="authId = 'Signup'">Signup</li>
        </nav>
        <div class="auth">
            <transition :name="authId">
                <component :is="authId"></component>
            </transition>
        </div>
    </div>
</template>

<script>
import Login from './parts/Login'
import Signup from './parts/Signup'
export default {
    name: 'AuthContainer',
    components:{
        'Login':Login,
        'Signup': Signup
    },
    data(){
        return{
            authId: 'Login'
        }
    },
    methods: {
        
    },
}
</script>

<style>
.auth-container{
    height: 500px;
    width: 90%;
    overflow: hidden;
    position: relative;
    /* animation: slideToRight 1s forwards; */
}
.auth-container .auth{
    width: 100%;
}
.auth-container nav{
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.auth-container nav li{
    list-style: none;
    color: var(--font-color);
    font-size: 1em;
    font-family: var(--secundair-font);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
}
.auth-container nav li.active{
    border-bottom: 3px solid var(--contrast-color);
}
.auth-container .field{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 10px 0;
    opacity: .3;
    font-family: var(--main-font);
    transition: .25s;
    width: 90%;
}
.auth-container .field label{
    color: white;
}
.auth-container .field input{
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
.auth-container .field input::placeholder{
    opacity: .3;
}
.auth-container .field.active{
    opacity: 1;
}
.auth-container button{
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
    transition: .25s;
}

.auth-container button:hover{
    background: var(--contrast-color);
    color: var(--secundair-color);
}

.auth-container .feedback{
    max-height: 0;
    overflow: hidden;
    padding: 10px 0;
    color: red;
    animation: heightAnim 2s forwards;
    text-align: center;
    font-size: .7em;
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
</style>