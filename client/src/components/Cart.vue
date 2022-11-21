<script setup lang="ts">
    import FlyoutPanel from './FlyoutPanel.vue';
    import cart, { updateProductQuantity } from "../stores/cart"; 
import { computed } from 'vue';
import { isLoading } from '@/stores/session';

    const { isOpen } = defineProps<{
        isOpen: boolean;
    }>();


    function closeCart() {
        //isActive = false;
    }

    function checkout() {
    }

    const subtotal = computed(() => cart.reduce((total, item) => total + item.quantity * item.product.price, 0));
</script>

<template>
    <FlyoutPanel :is-open="isOpen" >
            <template #header>
                <h3 class="title is-3">
                    Cart 
                    <small class="subtitle is-6">({{ cart.length }} items)</small>
                </h3>
                <h4 class="subtitle is-6">
                    <b>Subtotal:</b> ${{ subtotal }}
                </h4>
            </template>
        <div>
            <div class="fly-out-body">
                <div v-if="!cart">
                    <p>Your cart is empty</p>
                </div>
                <div v-else>
                    <div v-for="item in cart" :key="item.product.id" class="box">

                            <figure class="image is-96x96">
                                <img :src="item.product.thumbnail" :alt="item.product.title" />
                            </figure>
                            <div class="">
                                <b>{{ item.product.title }}</b> 
                                <div class="price">${{ item.product.price }}</div> 
                                <div>
                                    x 
                                    <select :value="item.quantity"
                                            :disabled="isLoading" 
                                            class="quantity"
                                            @input="(e) => updateProductQuantity(item.product.id,  +(e.target as HTMLSelectElement).value)">
                                        <option value="0">0 (delete)</option>
                                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                    </select>
                                    = ${{ item.quantity * item.product.price}}</div>
                                
                            </div>
                    </div>
                </div>
            </div>
            <div class="fly-out-footer">
                <button class="button is-success" @click="checkout">Checkout</button>
            </div>
        </div>
    </FlyoutPanel>
</template>


<style scoped>
    .box {
        text-align: center;
    }
    .image {            /* note that this is the image class not the image tag */
        border: 1px solid #000;
        margin: auto;
    }
    .price {
        font-size: 1.5em;
    }

    .quantity {
        width: 40px;
        border-radius: 10px;
        border: 0;
        background-color: aliceblue;
    }
</style>