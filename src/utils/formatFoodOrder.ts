import { ProductCart } from '@interfaces/ProductCart'

import { formatCurrency } from './formatCurrency'

interface FoodOrder {
  name: string
  lastName: string
  paymentMethod: string
  address: {
    name: string
    number: string
  }
  cart: ProductCart[]
}

export function foodOrderFormatted(foodOrder: FoodOrder) {
  const name = `Nome: ${foodOrder.name} ${foodOrder.lastName}`

  const address = `Rua: ${foodOrder.address.name} N: ${foodOrder.address.number}`

  const paymentMethod = `Metodo de Pagamento: ${foodOrder.paymentMethod}`

  const productsDescription = `Descrição Pedidos \n${foodOrder.cart.map(
    (product) =>
      `${product.quantity}x ${product.name} - ${formatCurrency(
        product.totalPrice
      )}`
  )}`

  const totalCartPrice = `Total Pedido: ${formatCurrency(
    foodOrder.cart.reduce(
      (initialCartValue, food) => initialCartValue + food.totalPrice,
      0
    )
  )}`

  return (
    name +
    '\n' +
    address +
    '\n' +
    paymentMethod +
    '\n' +
    productsDescription +
    '\n' +
    totalCartPrice
  )
}
