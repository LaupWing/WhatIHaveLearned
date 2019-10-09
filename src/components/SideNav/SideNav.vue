<template>
    <div id="SideNav">
        <AuthContainer 
            v-if="!user"
        />
        <ListContainer
            v-else
        />
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