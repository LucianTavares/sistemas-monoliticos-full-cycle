import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe("Product Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find all products", async () => {

    await ProductModel.create({
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      salesPrice: 59.90
    })

    await ProductModel.create({
      id: "2",
      name: "Clean Arch",
      description: "Clean Arch",
      salesPrice: 75.90
    })

    const productRepository = new ProductRepository()
    const products = await productRepository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id.id).toBe("1")
    expect(products[0].name).toBe("DDD")
    expect(products[0].description).toBe("Domain Driven Design")
    expect(products[0].salesPrice).toBe(59.90)
    expect(products[1].id.id).toBe("2")
    expect(products[1].name).toBe("Clean Arch")
    expect(products[1].description).toBe("Clean Arch")
    expect(products[1].salesPrice).toBe(75.90)
  })

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      salesPrice: 59.90
    })

    const productRepository = new ProductRepository()
    const product = await productRepository.find("1")

    expect(product.id.id).toBe("1")
    expect(product.name).toBe("DDD")
    expect(product.description).toBe("Domain Driven Design")
    expect(product.salesPrice).toBe(59.90)
  })
})