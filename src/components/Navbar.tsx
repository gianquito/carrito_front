export default function Navbar({ amountInCart }: { amountInCart: number }) {
    return (
        <div className="flex select-none items-center justify-end px-8 py-2">
            <a className="relative" href="/cart">
                {amountInCart != 0 && (
                    <div className="z-1 absolute left-5 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                        <p className="text-center text-xs font-medium text-white">{amountInCart}</p>
                    </div>
                )}
                <img src="shopping-cart.png" className="w-12" alt="carrito" draggable={false} />
            </a>
        </div>
    )
}
