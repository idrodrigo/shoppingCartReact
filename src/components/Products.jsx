import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  const { cart, addToCart, removeFromCart } = useCart()

  const checkProductInCart = (productId) => {
    return cart.some((item) => item.id === productId)
  }

  return (
        <main className='products'>
            <ul>
                {products.slice(0, 10).map(product => {
                  const isProductInCart = checkProductInCart(product.id)
                  return (
                    <li key={product.id}>
                        <img src={product.thumbnail} alt={product.tittle} />
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <div>
                            <button
                            style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                            onClick={() => isProductInCart
                              ? removeFromCart(product)
                              : addToCart(product)}>
                      { isProductInCart
                        ? <RemoveFromCartIcon />
                        : <AddToCartIcon />}
                            </button>
                        </div>
                    </li>

                  )
                })}
            </ul>
        </main>
  )
}
