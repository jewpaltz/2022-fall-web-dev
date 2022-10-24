<script setup lang="ts">
    import { reactive } from "vue";
    import { getProducts } from "../stores/products";

    const products = reactive(getProducts());
</script>

<template>
    <div>
        <div class="products">
            <div class="product" v-for="product in products" :key="product.id">
                <div class="product-image">
                    <img :src="product.thumbnail" :alt="product.title" />
                </div>
                <div class="product-info">
                    <h3>{{ product.title }}</h3>
                    <p>{{ product.description }}</p>
                    <p>{{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
