export const getProducts = async (): Promise<{
    data: {
        productos: { name: 'string'; precio: number; id: number }[]
    }
}> => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: '{ productos{ name, precio, id } }',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await request.json()
}

export const getProductsAmount = async (): Promise<number> => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: '{ productosEnLinea(idCarrito:1){ cantidadProducto } }',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 5 },
    })
    const { data } = await request.json()
    return data.productosEnLinea.reduce((acc: number, curr: any) => acc + curr.cantidadProducto, 0)
}

export const getProductsInCart = async () => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{productosEnLinea(idCarrito:1){ cantidadProducto, idProducto, producto {name, precio } }}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await request.json()
}

export const addProductToCart = async (id_producto: number, amount = 1, exact = false) => {
    const { data: dataCart } = await getProductsInCart()
    const productInCart = dataCart.productosEnLinea.find((prod: any) => prod.idProducto == id_producto)
    if (productInCart) {
        await fetch('http://127.0.0.1:5000/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{updateLineaCarrito(idCarrito: 1, idProducto:${id_producto}, cantidadProducto: ${
                    exact ? amount : productInCart.cantidadProducto + amount
                }){ lineaCarrito{ cantidadProducto } }}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } else {
        await fetch('http://127.0.0.1:5000/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{createLineaCarrito(idProducto: ${id_producto}, idCarrito: 1, cantidadProducto: ${amount}){ lineaCarrito{ cantidadProducto } }}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}

export const deleteProductFromCart = async (id_producto: number) => {
    await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{ deleteLineaCarrito(idProducto: ${id_producto}){ lineaCarrito{ cantidadProducto }}}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
