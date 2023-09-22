'use client'
import Navbar from '@/components/Navbar'
import ProductCard from '../components/ProductCard'
import { getProducts, getProductsAmount } from '../services/graphql'
import { useEffect, useState } from 'react'

export default function Home() {
    const [productsList, setProductsList] = useState<any>(null)
    const [amountInCart, setAmountInCart] = useState(0)

    useEffect(() => {
        getProducts()
            .then(({ data }) => setProductsList(data))
            .catch(error => console.error(error))
        getProductsAmount()
            .then(amount => setAmountInCart(amount))
            .catch(error => console.error(error))
    }, [])

    return (
        <main>
            <Navbar amountInCart={amountInCart} />
            <div className="flex gap-4">
                {productsList &&
                    productsList.productos.map((producto: any) => (
                        <ProductCard
                            {...producto}
                            key={producto.id}
                            updateCartAmount={() => setAmountInCart(prev => prev + 1)}
                        />
                    ))}
            </div>
        </main>
    )
}
