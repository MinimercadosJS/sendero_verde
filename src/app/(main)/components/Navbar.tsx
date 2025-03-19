// This component will be used in future versions of the application

'use client'
import { MdFavoriteBorder, MdOutlineHistory } from "react-icons/md"
import CartList from "./CartList"
import { BsCart4 } from "react-icons/bs"
import { useState } from "react"
import Link from "next/link"
import useCart from "./useCart"

const Navbar = () => {
    const [openCartList, setOpenCartList] = useState(false)
    const {itemsCount} = useCart()
    
    return   (
        <nav className='navbar'>
            <CartList openCartList={openCartList} setOpenCartList={setOpenCartList} />
            <div className="navbar-container">
                <Link href="/favorites">
                    <MdFavoriteBorder />
                </Link>
                <Link href="/recent">
                    <MdOutlineHistory />
                </Link>
                <section className='navbar-cart-section' onClick={() => setOpenCartList(!openCartList)}>
                    <div className='navbar-cart-badge'>
                        <b>{itemsCount}</b>
                    </div>
                    <BsCart4 />
                </section>
            </div>
        </nav>
    )
}

export default Navbar