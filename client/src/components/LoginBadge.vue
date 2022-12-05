<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import session, { login, logout } from '../stores/session'

    async function google_login() {
        const auth_client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'profile email ',           
          callback: async function(token:any) {               
            console.log({ token });
            const data = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${token.access_token}` },
            });
            const user = await data.json();
            console.log({ user });
            session.user = user;
          },
        });
        auth_client.requestAccessToken();
    }
</script>
<script lang="ts">

    declare const google: any;
</script>
<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button is-primary">
            <strong>Sign up</strong>
        </a>
        <RouterLink class="button is-light" to="login" @click.prevent="google_login">
            Log in
        </RouterLink>
    </div>
    <div v-else class="profile">
        <img :src="session.user.picture" />
        <span>
            {{session.user.name}} ({{session.user.email}})            
        </span>

        (<a @click="logout()">
            Log out
        </a>)
    </div>

</template>


<style scoped>
    .profile {
        display: flex;
        align-items: center
    }
    .profile img {

        border-radius: 50%;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>