<script setup lang="ts">
    import FlyoutPanel from './FlyoutPanel.vue';

    const { isOpen } = defineProps<{
        isOpen: boolean;
    }>();

    const cart = [
        { id: 1, name: 'Product 1', price: 9.99, image: '' },
        { id: 2, name: 'Product 2', price: 19.99, image: '' },
        { id: 3, name: 'Product 3', price: 29.99, image: '' },
    ];

    function closeCart() {
        //isActive = false;
    }

    function checkout() {
    }
</script>

<template>
    <FlyoutPanel :is-open="isOpen" >
            <template #header>
                <h3 class="title is-3">Cart</h3>
            </template>
        <div>
            <div class="fly-out-body">
                <div v-if="!cart">
                    <p>Your cart is empty</p>
                </div>
                <div v-else>
                    <div v-for="item in cart" :key="item.id" class="box">

                            <figure class="image is-96x96">
                                <img :src="item.image" :alt="item.name" />
                            </figure>
                            <div class="">
                                <b>{{ item.name }}</b> 
                                <div class="price">${{ item.price }}</div> 
                                
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
</style>