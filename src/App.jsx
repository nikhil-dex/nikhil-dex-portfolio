import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import Laptop3D from './components/Laptop3D'
import GlassDock from './components/GlassDock'
import GlassNavbar from './components/GlassNavbar'
import Services from './components/Services'
import Logovortex from './components/Logovortex'
import GlitchNavbar from './components/GlitchNavbar'
function App() {
  return (
   // App.jsx
<main className="bg-[#f5f5f3] text-neutral-900 min-h-screen">
      <Laptop3D />
      <Projects />
      <About />
      <Services />
      {/* <Logovortex /> */}
    <GlitchNavbar
  brand="airDeck_V1"
  items={[
    // { label: "Visit Airdeck", href: "https://airdeckv1.vercel.app" },
    { label: "Visit", href: "https://airdeckv2.vercel.app" }
  ]}
/>
      <Footer />
      <GlassNavbar />
      <GlassDock/>
    </main>
  )
}

export default App