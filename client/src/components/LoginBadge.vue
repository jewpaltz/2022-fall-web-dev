<script setup lang="ts">
    import session, { login, logout } from '../stores/session'

</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button is-primary">
            <strong>Sign up</strong>
        </a>
        <a class="button is-light" @click="login('Moshe', 'Plotkin')">
            Log in
        </a>
    </div>
    <div v-else>
        Welcome {{session.user.firstName}} {{session.user.lastName}}
        (<a @click="logout()">
            Log out
        </a>)
    </div>

</template>


<style scoped>

</style>