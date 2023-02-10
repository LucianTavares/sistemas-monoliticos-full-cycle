import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import Product from "../domain/product.entity"
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

  it("should create a product", async () => {

    const productProps = {
      id: new Id("1"),
      name: "DDD",
      description: "Domain driven design",
      purchasePrice: 25.90,
      stock: 150
    }
    const product = new Product(productProps)
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const productDb = await ProductModel.findOne({
      where: { id: product.id.id }
    })

    expect(productProps.id.id).toEqual(productDb.id)
    expect(productProps.name).toEqual(productDb.name)
    expect(productProps.description).toEqual(productDb.description)
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice)
    expect(productProps.stock).toEqual(productDb.stock)
  })

  it("should find a product", async () => {

    const productRepository = new ProductRepository()

    ProductModel.create({
      id: "1",
      name: "DDD",
      description: "Domain driven design",
      purchasePrice: 25.90,
      stock: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const product = await productRepository.find("1")

    expect(product.id.id).toEqual("1")
    expect(product.name).toEqual("DDD")
    expect(product.description).toEqual("Domain driven design")
    expect(product.purchasePrice).toEqual(25.90)
    expect(product.stock).toEqual(150)
  })
})