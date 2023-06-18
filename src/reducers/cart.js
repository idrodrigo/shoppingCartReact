export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const updateCartInLocalStorage = (cart) => {
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)

      if (productInCartIndex >= 0) {
        // 👀 una forma sería usando structuredClone
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

        // 👶 usando el map
        // const newState = state.map(item => {
        //   if (item.id === id) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }

        //   return item
        // })

        // ⚡ usando el spread operator y slice
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
          ...state.slice(productInCartIndex + 1)
        ]

        updateCartInLocalStorage(newState)
        return newState
      }
      const newState = [...state, { ...actionPayload, quantity: 1 }]
      updateCartInLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload
      const newState = state.filter((item) => item.id !== id)
      updateCartInLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateCartInLocalStorage([])
      return []
    }
  }
  return state
}
