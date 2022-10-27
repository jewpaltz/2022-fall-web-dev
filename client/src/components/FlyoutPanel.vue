<script setup lang="ts">
import { ref } from 'vue';

    const { isOpen } = defineProps<{
        isOpen: boolean;
    }>();

</script>

<template>
    <div class="fly-out" :class="{ 'is-open': isOpen }">
        <div class="fly-out-body">
            <div class="fly-out-header">
                <slot name="header" />
            </div>
            
            <slot />
        </div>
    </div>
</template>


<style scoped>
    .fly-out {
        position: fixed;
        top: 0;
        right: -20em;
        bottom: 0;
        width: 20em;
        background-color: #ffffffaa;
        border-left: 1px solid #000;
        z-index: 100;

        transition: right 0.5s ease-in-out;
    }

    .fly-out.is-open {
        right: 0;
    }

    .fly-out-body {
        height: 100%;
        background-color: #fff;
        margin: .5em;
        padding: 1em;
    }

    .fly-out-header {
        padding: 1em;
        background-color: aquamarine;
    }
</style>