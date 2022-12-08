
    //import { ref } from 'vue';
    //import { RouterLink } from 'vue-router';
    //import Cart from './Cart.vue';
    //import LoginBadge from './LoginBadge.vue';
    //import MessageList from './MessageList.vue';
//
    //const isActive = ref(false);
    //const isCartOpen = ref(false);

import Link from "next/link"

    const Cart = ()=> <div></div>
    const LoginBadge = ()=> <div></div>
    const MessageList = ()=> <div></div>

export default ()=>{
    return (

    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <Cart is-open="isCartOpen" />

        <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>
      
          <a className="navbar-burger { 'is-active': isActive }" click="isActive = !isActive" role="button" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" className="navbar-menu { 'is-active': isActive }">
          <div className="navbar-start">
            <Link href="/" className="navbar-item">
              Home
            </Link>
      
            <Link className="navbar-item" href="/products">
              Products
            </Link>
      
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>
      
              <div className="navbar-dropdown">
                <Link className="navbar-item" href="/about">
                  About
                </Link>
                <a className="navbar-item">
                  Jobs
                </a>
                <a className="navbar-item">
                  Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
      
          <div className="navbar-end">
            <MessageList />
            <div className="navbar-item">
                <button className="button is-primary" click="isCartOpen = !isCartOpen">
                  <strong>Cart</strong>
                </button>
              </div>
            <div className="navbar-item">

              <login-badge></login-badge>
            </div>
          </div>
        </div>
        </div>
      </nav>
      
)
}