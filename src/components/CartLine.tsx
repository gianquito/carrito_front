import { deleteProductFromCart } from '@/services/graphql'
import CartLineAmountInput from './CartLineAmountInput'

interface CartLineProps {
    name: string
    price: number
    amount: number
    id: string
    updateProducts: () => void
}

export default function CartLine({ name, price, amount, id, updateProducts }: CartLineProps) {
    return (
        <div className="flex items-center justify-between border-b-2 px-8 py-8">
            <div>
                <p className="mb-2 text-xl">{name}</p>
                <CartLineAmountInput amount={amount} updateProducts={updateProducts} id={id} />
                <p
                    className="mt-2 select-none text-sm underline hover:cursor-pointer"
                    onClick={() => deleteProductFromCart(Number(id)).then(() => updateProducts())}
                >
                    Eliminar
                </p>
            </div>
            <div>
                <p className="text-lg">{'$' + price * amount}</p>
            </div>
        </div>
    )
}
