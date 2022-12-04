<script setup lang="ts">
    import { computed, reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import { getProducts, type Product } from "@/stores/products";

    const products = ref([] as Product[]);
    getProducts().then( x=> products.value = x.products);


</script>

<template>
    <div>
        <h1 class="title">Admin Product List</h1>

        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>    
                    <th>Brand / Category / Description</th>    
                    <th>Price / Discount</th>
                    <th>Actions</th>    
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="p in products" :key="p._id">
                    <td>
                        <img :src="p.thumbnail" class="product-thumbnail" />
                        <b>{{ p.title }}</b> <br />
                        <RouterLink :to="{ name:'admin_product_images', params:{ id: p._id}}">
                            ({{ p.images.length }}) more images
                        </RouterLink>
                        
                    </td>
                    <td>
                        <small class="light">
                            {{ p.brand }} / {{ p.category }}
                        </small>
                        {{ p.description }}
                    </td>
                    <td>
                        ${{ p.price }} (%{{ p.discountPercentage }})
                    </td>
                    <td>
                        <div class="buttons has-addons is-small">
                            <RouterLink class="button"  :to="`../product/${p._id}`" target="_blank" >
                                <span class="icon is-small">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </RouterLink>
                            <RouterLink class="button"  :to="`./product/${p._id}`">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </RouterLink>
                            <a class="button" href="#">
                                <span class="icon is-small">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </a>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped>
    .product-thumbnail {
        max-width: 75px;
        max-height: 75px;
        float: left;
        padding: 5px;
        border: 1px solid cornflowerblue;
        border-radius: 5px;
        margin: 5px 10px;
    }
    small.light {
        display: block;
        opacity: .8;
    }
    .buttons {
        flex-wrap: nowrap;
    }
</style>