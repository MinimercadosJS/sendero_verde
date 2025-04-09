import React from 'react'
import "./main.css"
import Basket from './components/Basket';
import StoreProvider from '@/components/ReduxStoreProvider';

const mainPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <main className='main'>
            <StoreProvider>
                <div className='main-container'>
                    <section className='content-section'>
                        {children}
                    </section>
                    <Basket />
                </div>
            </StoreProvider>
        </main>
    )
}

export default mainPageLayout