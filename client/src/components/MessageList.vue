<script setup lang="ts">
    import session, { isLoading } from "@/stores/session";

    function deleteMessage(id: number) {
        session.messages.splice(id, 1);
    }
</script>

<template>
    <div class="box">
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
</template>


<style scoped>

</style>