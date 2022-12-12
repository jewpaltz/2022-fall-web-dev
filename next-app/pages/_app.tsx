import 'bulma';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import NavVue from '../components/Nav'

//const NavVue = ()=> <div className="navbar is-primary"></div>

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="root">
        <header>
            <NavVue />
        </header>

        <div className="container">
            <Component {...pageProps} />
        </div>

    </div>
    
  )
}
