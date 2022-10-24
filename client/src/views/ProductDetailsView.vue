<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { getProduct } from "../stores/products";

    const route = useRoute();
    
    const product = ref(getProduct(+route.params.id));

</script>

<template>
    <div v-if="product" class="section">
        <div class="product-image">
            <img :src="product.thumbnail" :alt="product.title" />
        </div>
        <div class="product-info">
            <h3 class="title">{{ product.title }}</h3>
            <p class="price subtitle">
                <span class="currency">$</span>
                <span class="amount">{{ product.price }}</span>
            </p>
            <p>{{ product.description }}</p>

        </div>
    </div>
    <div v-else class="section">
        <h2 class="title">Product not found</h2>
    </div>
</template>

<style scoped>
    .section {
        display: flex;
        background-color: aliceblue;
    }
    .product-info {
        padding: 1em;;
    }
</style>