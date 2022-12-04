<script setup lang="ts">
    import { isLoading } from "@/stores/session";
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { getProduct, type Product } from "@/stores/products";

    const route = useRoute();
    
    const product = ref({} as Product);

    getProduct(route.params.id as string).then(x => {
        if(x){
            product.value = x            
        }

    });


</script>

<template>
    <h3 class="title is-3">Images for {{ product.title }}</h3>
    <div v-for="image in product.images" :key="image" class="image">
        <img :src="image" />
    </div>
    
</template>

<style scoped>

</style>