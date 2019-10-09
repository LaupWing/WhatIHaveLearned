<template>
    <div 
        id="SideNav"
    >
        <img src="../../assets/logo.png" alt="">
        <transition :name="setComponentId" mode="out-in">
            <!-- <AuthContainer 
                v-if="!user"
            />
            <ListContainer
                v-else
            /> -->
            <component :is="setComponentId"></component>
        </transition>
    </div>
</template>

<script>
import AuthContainer from './auth/AuthContainer'
import ListContainer from './list/ListContainer'
export default {
    name: 'SideNav',
    components:{
        'AuthContainer': AuthContainer,
        'ListContainer': ListContainer
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
        setComponentId(){
            if(this.user)    return 'ListContainer'
            return 'AuthContainer'
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
.AuthContainer-enter-active {
  animation: slideToRight .5s;
}
.AuthContainer-leave-active {
  animation: slideToLeft .5s;
}
.ListContainer-enter-active {
  animation: slideToLeft .5s reverse;
}
.ListContainer-leave-active {
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