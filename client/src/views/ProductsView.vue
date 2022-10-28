<script setup lang="ts">
    import { addProductToCart } from "@/stores/cart";
import { computed, reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import { getProducts, type Product } from "../stores/products";

    const products = reactive(getProducts());

    const search = ref("");

    function addToCart(product: Product) {
        addProductToCart(product);
    }
</script>

<template>
    <div>
        <div class="control ">
            <input class="input" type="text" placeholder="Search" v-model="search"  />
        </div>
        
        <div class="products">
            <RouterLink class="product" v-for="product in products" 
                        :key="product.id" :to="`/product/${product.id}`"
                        v-show="product.title.toLowerCase().includes(search.toLowerCase())">
                <div class="product-image">
                    <img :src="product.thumbnail" :alt="product.title" />
                </div>
                <div class="product-info">
                    <b>{{ product.title }}</b>
                    <p>{{ product.description }}</p>
                    <button class="button is-small is-primary is-rounded add" @click.prevent="addToCart(product)">+</button>
                    <p class="price">
                        <span class="currency">$</span>
                        <span class="amount">{{ product.price }}</span>
                    </p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
    .products {
        display: flex;
        flex-wrap: wrap;
        background-color: aliceblue;
    }

    .add {
        float: right;
    }

    .product {
        flex-basis: 10em;
        margin: 1em;
        padding: 1em;
        border: 1px solid #000;
        border-radius: 5px;
        background-color: #fff;
    }

    .product-info {
        font-size: small;
    }

    .price {
        display: flex;
        align-items: flex-start;
    }

    .amount {
        font-size: x-large;
    }
</style>
