<template>
    <div 
        id="SideNav"
    >
        <img src="../../assets/logo.png" alt="">
        <transition :name="setTransition" mode="out-in">
            <AuthContainer 
                v-if="!user"
            />
            <ListContainer
                v-else
            />
        </transition>
    </div>
</template>

<script>
import AuthContainer from './auth/AuthContainer'
import ListContainer from './list/ListContainer'
export default {
    name: 'SideNav',
    components:{
        AuthContainer,
        ListContainer
    },
    props:['user', 'userNotes'],
    data(){
        return{
            
        }
    },
    methods: {
    },
    created(){
        
    },
    computed:{
        setTransition(){
            if(this.user)    return 'Login'
            return 'Login'
        }
    }
}
</script>

<style>
#SideNav{
    height: 100vh;
    background: var(--main-color);
    width: 250px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    position: relative;
}
#SideNav img{
    margin: 20px 0;
}
.Login-enter-active {
  animation: slideToRight .5s;
}
.Login-leave-active {
  animation: slideToLeft .5s;
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