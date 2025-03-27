import React from 'react'
import OrderInProgress from '../components/OrderInProgress';
import SearchBar from '../components/SearchBar';
import './shop.css'
const ShoppingSectionsLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <header className='shopping-header'>
                <OrderInProgress />
                <SearchBar />
            </header>
            {children}
        </>
    )
}

export default ShoppingSectionsLayout