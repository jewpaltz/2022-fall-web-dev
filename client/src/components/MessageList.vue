<script setup lang="ts">
    import session, { isLoading } from "@/stores/session";

    function deleteMessage(id: number) {
        session.messages.splice(id, 1);
    }

</script>

<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" >
            Messages
            <span class="tag is-danger" v-if="session.messages.length">
                {{ session.messages.length }}
            </span>
        </a>

        <div class="navbar-dropdown">
            <div class="message-list">
                <div class="notification is-warning" v-if="isLoading">
                    Loading...
                </div>
                <div v-for="(message, i) in session.messages" :key="i"
                    class="notification is-light" :class="`is-${message.type}`">
                    <button class="delete" @click="deleteMessage(i)"></button>
                    {{ message.text }}
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .navbar-dropdown {
        width: max-content;
        max-width: 300px;
    }
    .notification {
        margin: .5rem;
        width: calc(100% - 1rem);
    }
    .tag {
        position: absolute;
        font-size: .8em;
        top: .5em;
        right: 2.5em;
        height: 1.5em;
        padding: .5em;
        border-radius: 50%;
    }
</style>