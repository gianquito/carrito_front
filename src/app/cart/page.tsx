'use client'
import CartLine from '@/components/CartLine'
import { getProductsInCart } from '@/services/graphql'
import { useEffect, useState } from 'react'
import { ProductosEnLinea } from '../../types'

export default function Cart() {
    const [cartProducts, setCartProducts] = useState<ProductosEnLinea>()

    function fetchProductsInCart() {
        getProductsInCart()
            .then(({ data }) => setCartProducts(data.productosEnLinea))
            .catch(() => console.error)
    }

    useEffect(() => {
        fetchProductsInCart()
    }, [])

    return (
        <div className="p-4">
            <p className="text-3xl font-medium">Carrito de Compras</p>
            {cartProducts?.length ? (
                cartProducts.map(prod => (
                    <CartLine
                        name={prod.producto.name}
                        price={prod.producto.precio}
                        amount={prod.cantidadProducto}
                        key={prod.idProducto}
                        id={prod.idProducto}
                        updateProducts={fetchProductsInCart}
                    />
                ))
            ) : (
                <p className="mt-2 text-lg">El carrito está vacío</p>
            )}
            <div className="flex justify-end text-2xl">
                <p>Total:</p>
                <p className="ml-2">
                    ${cartProducts?.reduce((acc, curr) => acc + curr.cantidadProducto * curr.producto.precio, 0)}
                </p>
            </div>
        </div>
    )
}
