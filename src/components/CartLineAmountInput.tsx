import { addProductToCart } from '@/services/graphql'

interface CartProductAmountInputProps {
    id: string
    updateProducts: () => void
    amount: number
}

export default function CartLineAmountInput({ amount, updateProducts, id }: CartProductAmountInputProps) {
    function updateAmount(amount: number, exact: boolean) {
        addProductToCart(Number(id), amount, exact).then(() => updateProducts())
    }

    return (
        <div className="flex">
            <p className="mr-2 text-sm">Cantidad: </p>
            <button className="rounded-lg bg-neutral-300 px-2" onClick={() => updateAmount(-1, false)}>
                -
            </button>
            <input
                className="w-12 text-center"
                type="number"
                value={amount}
                min={0}
                onChange={e => updateAmount(Number(e.target.value), true)}
            />
            <button className="rounded-lg bg-neutral-300 px-2" onClick={() => updateAmount(1, false)}>
                +
            </button>
        </div>
    )
}
