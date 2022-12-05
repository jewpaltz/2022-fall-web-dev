<script setup lang="ts">
    import session, { api, isLoading, setError } from "@/stores/session";
    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";

    import { addProduct, getProduct, updateProduct, type Product } from "@/stores/products";

    const route = useRoute();
    const router = useRouter();
    
    const product = ref({} as Product);
    const isNew = ref(route.params.id == 'new')

    if(!isNew.value){
        getProduct(route.params.id as string).then(x => {
            if(x){
                product.value = x            
            }else{
                isNew.value = true;
            }

        });        
    }

    const brands = ref(['Apple', 'Microsoft']);
    const categories = ref(['Phone', 'Watch']);
    api<string[]>('products/brands').then(x=> brands.value = x);
    api<string[]>('products/categories').then(x=> categories.value = x);

    async function save(){
        try {
            if(isNew.value){
                const data = await addProduct(product.value);
                session.messages.push({ type: "success", text: `Successfully inserted ${data.title}`})
            }else{
                const data = await updateProduct(product.value._id, product.value);
                session.messages.push({ type: "success", text: `Successfully updated ${data.title}`})
            }
            await router.push({ name: 'admin_products' });
        } catch (error) {
            //setError(error as string); being set in the api function
        }
    }

   async function cancel() {
    await router.push({ name: 'admin_products' });    
   } 


   const isTenorSearchOpen = ref(false);
   const tenorSearch = ref('');
   const tenorResults = ref([] as any[]);


   watch(tenorSearch, async () => {
       if(tenorSearch.value.length > 2){
        const data = await fetch(`https://tenor.googleapis.com/v2/search?q=${tenorSearch.value}&key=${import.meta.env.VITE_TENOR_API_KEY}&limit=8`)
                            .then(x=> x.json())
        console.log({ data });
        tenorResults.value = data.results;
       }
    });

</script>

<template>
    <div class="columns">

        <div class="column is-three-quarters">
            <form class="modal-card" @submit.prevent="save">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        {{ isNew ? 'New' : 'Edit' }} Product 
                    </p>
                    
                </header>
                <section class="modal-card-body">
                
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Title</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded has-icons-left">
                                    <input class="input" type="text" placeholder="Title" v-model="product.title">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Price</label>
                        </div>
                        <div class="field-body">
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            $
                                        </a>
                                    </p>
                                    <p class="control is-expanded">
                                        <input class="input" type="tel" placeholder="Price"  v-model="product.price">
                                    </p>
                                </div>
                        </div>
                    </div>
                    

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Brand</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select  v-model="product.brand">
                                            <option :value="undefined">-- Please Select a Brand --</option>
                                            <option v-for="b in brands" :key="b">{{b}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Category</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select  v-model="product.category">
                                            <option :value="undefined">-- Please Select a Category --</option>
                                            <option v-for="b in categories" :key="b">{{b}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Thumbnail</label>
                        </div>
                        <div class="field-body">
                            <div class="field  has-addons">
                                <div class="control is-expanded">
                                    <input class="input" type="text" placeholder="Complete URL" v-model="product.thumbnail">
                                </div>
                                <p class="control">
                                        <a class="button is-warning" @click.prevent="(isTenorSearchOpen = !isTenorSearchOpen)">
                                            Find a Gif
                                        </a>
                                    </p>

                            </div>
                        </div>
                    </div>

                    <div class="box" v-show="isTenorSearchOpen">
                        <h3>Tenor Search</h3>
                        <input class="input" type="text" placeholder="Complete URL" v-model="tenorSearch" />

                        <div class="image tenor-gif" v-for="tenorGif in tenorResults" :key="tenorGif.id" @click.prevent="product.thumbnail = tenorGif.media_formats.mediumgif.url" >
                            <img :src="tenorGif.media_formats.tinygif.url" />
                        </div>
                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Description</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <textarea class="textarea" placeholder="Full description of product" v-model="product.description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button" @click.prevent="cancel">Cancel</button>
                    </footer>
                </form>
            </div>
        <div class="column card">
            <div class="card-content">
                <h3 class="title">{{ product.title }}</h3>
                <div class="product-image">
                    <img :src="product.thumbnail" :alt="product.title" />
                </div>
                <div class="product-info">

                    <p class="price subtitle">
                        <span class="currency">$</span>
                        <span class="amount">{{ product.price }}</span>
                    </p>
                    <p>{{ product.description }}</p>
                
                </div>

            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .modal-card {
        width: 100%;
    }

    .tenor-gif {
        display: inline-block;
        margin: 0 10px 10px 0;
        max-width: 220px;
    }
</style>