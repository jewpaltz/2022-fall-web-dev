<script setup lang="ts">
import type { ListEnvelope, Product } from '@/stores/products';
import { api } from '@/stores/session';
import { ref, computed } from 'vue';


    const name = ref('')
    const filteredDataArray = ref([] as string[])
    const selected = ref(null)

    async function getAsyncData(value: string) {
        const result = await api<ListEnvelope<Product>>(`products/search/${value}`)
        filteredDataArray.value = result.products.map(x=> x.title)
    }
    const cc = computed(()=> filteredDataArray.value )
</script>

<template>
  <main>
    <h1 class="title">Home Page</h1>
    <h2 class="subtitle">The page where you land</h2>

    <o-autocomplete
        v-model="name"
        expanded
        placeholder="e.g. jQuery"
        icon="search"
        clearable
        :data="cc"
        @select="(option: any) => (selected = option)"
        @typing="getAsyncData"
      ></o-autocomplete>

      
  </main>
</template>
