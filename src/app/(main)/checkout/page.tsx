import React from 'react'
import './checkout.css'
import CheckoutForm from './components/forms/CheckoutForm'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import "./checkout.css"

const CheckoutPage = () => {

  return (
    <section>
      <CheckoutForm />
    </section>
  )
}

export default CheckoutPage