<script setup lang="ts">
    import { isLoading } from "@/stores/session";
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { getProduct, type Product } from "@/stores/products";

    const route = useRoute();
    
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

    const brands = ['Apple', 'Microsoft']
    const categories = ['Phone', 'Watch']


</script>

<template>
    <div class="columns">

        <div class="column is-three-quarters">
            <div class="modal-card">
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
                                        <option value="">-- Please Select a Brand --</option>
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
                                        <option value="">-- Please Select a Category --</option>
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
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Complete URL">
                            </div>

                        </div>
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
                    <button class="button">Cancel</button>
                </footer>
                </div>
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
</style>