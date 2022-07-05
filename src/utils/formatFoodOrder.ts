import { ProductCart } from '@interfaces/ProductCart'

import { formatCurrency } from './formatCurrency'

interface FoodOrder {
  name: string
  lastName: string
  address: {
    name: string
    number: string
  }
  cart: ProductCart[]
}

export function foodOrderFormatted(foodOrder: FoodOrder) {
  const order = `
    Nome: ${foodOrder.name} ${foodOrder.lastName}
    Rua: ${foodOrder.address.name}  N: ${foodOrder.address.number}

    Descrição Pedidos 
    ${foodOrder.cart.map(
      (product) =>
        `${product.quantity}x ${product.name} - ${formatCurrency(
          product.totalPrice
        )}`
    )}

    Total Pedido: 
    ${formatCurrency(
      foodOrder.cart.reduce(
        (initialCartValue, food) => initialCartValue + food.totalPrice,
        0
      )
    )}
  `

  return order
}
