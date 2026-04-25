import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Beats from './components/Beats'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white' }}>
      <Navbar />
      <main>
        <Hero />
        <Beats />
        <About />
        <Portfolio />
        <Services />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default App
