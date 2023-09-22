import { addProductToCart } from '@/services/graphql'

interface ProductCardProps {
    name: string
    precio: number
    id: number
    updateCartAmount: () => void
}

export default function ProductCard({ name, precio, id, updateCartAmount }: ProductCardProps) {
    async function handleClick() {
        await addProductToCart(id)
        updateCartAmount()
    }

    return (
        <div className="w-max flex-shrink-0 rounded-lg border border-neutral-400 px-4 py-2 pt-36">
            <div className="flex">
                <p className="text-lg">{name}</p>
                <p className="ml-4">{'$' + precio}</p>
            </div>
            <button
                className="w-full rounded-xl bg-blue-500 py-1 text-white hover:bg-blue-600 active:bg-blue-700"
                onClick={handleClick}
            >
                Agregar al carrito
            </button>
        </div>
    )
}
