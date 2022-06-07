export type ProductsQuery = {
  foods: {
    description: string
    id: string
    name: string
    image: {
      url: string
    }
    price: string
  }[]
}
