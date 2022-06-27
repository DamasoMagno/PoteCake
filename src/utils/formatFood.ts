export function formatFood(foods) {
  const formattedFoods = foods.map((food) => {
    return {
      id: food.id,
      name: food.name,
      image: {
        url: food.image.url,
      },
      description: food.description,
      price: food.price,
      category: food.categories.map((category) => {
        return {
          name: category.name,
        }
      }),
    }
  })

  return formattedFoods
}
