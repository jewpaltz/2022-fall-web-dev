    //import { addProductToCart } from "../stores/cart";
    //import { isLoading } from "../stores/session";
    import { computed, reactive, ref, watch } from "vue";
    import RouterLink  from "next/link";
    import { getProducts, type Product } from "../stores/products";
import { useEffect, useState } from "react";

    const isLoading = false;
    // const products = ref([] as Product[]);
    // getProducts().then( x=> products.value = x);


    function addToCart(product: Product) {
        //addProductToCart(product);
    }

export default function(){

    const [products, setProducts] = useState([] as Product[]);
    useEffect(()=> { getProducts().then( x=> setProducts(x.products) ) }, []);
    

    const [search, setSearch] = useState("");


    return (
    <div>
        <div className="control ">
            <input className="input" type="text" placeholder="Search" value={search} onChange={e=> setSearch(e.target.value) }  />
        </div>
        
        <div className="products">
            {products
                .filter( product=> product.title?.toLowerCase().includes(search.toLowerCase()) )
                .map(product=> (
            <RouterLink key={product._id} 
                        className={`product  ${ isLoading ? 'is-disabled' : '' }`}
                        href={`/product/${product._id}`}
                        >
                <div className="product-image">
                    <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="product-info">
                    <b>{ product.title }</b>
                    <p>{ product.description }</p>
                    <button className={`button is-small is-primary is-rounded add  ${ isLoading ? 'is-disabled' : '' }`}
                            
                            onClick={()=>addToCart(product)}>
                                +
                    </button>
                    
                    <p className="price">
                        <span className="currency">$</span>
                        <span className="amount">{ product.price }</span>
                    </p>
                </div>
            </RouterLink>
            ))}
        </div>
    </div>

    )
}
