<template>
    <div class="settings">
        <button class="edit">Toggle Editmode</button>
        <button class="signout">Signout</button>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    methods:{

    }
}
</script>

<style>
.settings{
    width: 100%;
    background: var(--secundair-color);
    display: flex;
}
.settings button{
    border-radius: 0;
}
.settings button.signout{
    margin-left: auto;
}
</style>