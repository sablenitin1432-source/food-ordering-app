import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Card/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Success from './pages/PlaceOrder/Success'
import FakePayment from './pages/FakePayment/FakePayment.jsx'
import Verify from './pages/Verify/Verify.jsx'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/fake-payment" element={<FakePayment />} />
          <Route path="/success" element={<Success />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>

      </div>
      <Footer />

    </>
  )
}

export default App
