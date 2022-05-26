import { createServer, Model } from "miragejs";

export function makeServer() {
  let server = createServer({
    models: {
      product: Model,
    },

    seeds(server) {
      server.db.loadData({
        products: [
          {
            id: "123dawd",
            name: "Pizza de Calabreza",
            price: 20.0,
            description:
              "Uma deliciosa pizza de calabreza, recem retirada do forno a 20.000C, esperando apenas por você compra-la",
            category: "Pizza",
          },
          {
            id: "123dagd",
            name: "Bolo de Chocolate",
            price: 25.0,
            description: "Delicioso bolo de chocolate",
            category: "Bolo",
          },
          {
            id: "123dawddd",
            name: "Bolo de Chocolate Red Wave",
            price: 25.0,
            description: "Delicioso bolo de chocolate",
            category: "Bolo",
          },
        ],
      });
    },

    routes() {
      this.namespace = '/api',

      this.get("/products", () => {
        return this.db.products;
      });

      this.get("/products/:id");

      this.get("/products/categories", (schema, request) => {
        const category = request.queryParams.category;

        if(!category){
          return this.db.products;
        }

        return this.db.products.where({ category });
      })

      this.namespace = "";
      
      this.passthrough();
    },
  });

  return server;
}

