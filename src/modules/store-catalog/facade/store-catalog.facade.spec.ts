import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model"
import StoreCatalogFacadeFactory from "../factory/facade.factory"

describe("Store Catalog Facade test", () => {

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

  it("should find a product", async () => {
    
    const facade = StoreCatalogFacadeFactory.create()
    await ProductModel.create({
      id: "1",
      name: "DDD",
      description: "Domain Driven Design",
      salesPrice: 59.90
    })

    const result = await facade.find({id: "1"})

    expect(result.id).toBe("1")
    expect(result.name).toBe("DDD")
    expect(result.description).toBe("Domain Driven Design")
    expect(result.salesPrice).toBe(59.90)
  })

  it("should find all products", async () => {
    
    const facade = StoreCatalogFacadeFactory.create()
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

    const result = await facade.findAll()

    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe("1")
    expect(result.products[0].name).toBe("DDD")
    expect(result.products[0].description).toBe("Domain Driven Design")
    expect(result.products[0].salesPrice).toBe(59.90)

    expect(result.products[1].id).toBe("2")
    expect(result.products[1].name).toBe("Clean Arch")
    expect(result.products[1].description).toBe("Clean Arch")
    expect(result.products[1].salesPrice).toBe(75.90)
  })
})