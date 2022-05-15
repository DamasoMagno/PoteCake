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
            name: "Pizza de Calabera",
            price: 20.0,
            description:
              "Uma deliciosa pizza de calabreza, recem retirada do forno a 20.000C, esperando apenas por você compra-la",
            category: "Bolo",
          },
          {
            id: "123dagd",
            name: "Bolo de Chocolat",
            price: 25.0,
            description: "Delicioso bolo de chocolate",
            category: "Bolo",
          },
          {
            id: "123dawddd",
            name: "Bolo de Chocolate",
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
        return this.schema.all("product");
      });

      this.get("/products/:id");

      this.namespace = "";
      
      this.passthrough();
    },
  });

  return server;
}

