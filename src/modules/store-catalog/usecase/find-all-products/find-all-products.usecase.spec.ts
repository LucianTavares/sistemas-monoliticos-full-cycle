import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "DDD",
  description: "Domain Driven Design",
  salesPrice: 59.90
})

const product2 = new Product({
  id: new Id("2"),
  name: "Clean Arch",
  description: "Clean Arch",
  salesPrice: 79.90
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
  }
}

describe("find all products use case unit tests", () => {

  it("should find all products", async () => {

    const productRepository = MockRepository()
    const findAllUseCase = new FindAllProductsUseCase(productRepository)

    const result = await findAllUseCase.execute()

    expect(productRepository.findAll).toHaveBeenCalled()
    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe("1")
    expect(result.products[0].name).toBe("DDD")
    expect(result.products[0].description).toBe("Domain Driven Design")
    expect(result.products[0].salesPrice).toBe(59.90)
    expect(result.products[1].id).toBe("2")
    expect(result.products[1].name).toBe("Clean Arch")
    expect(result.products[1].description).toBe("Clean Arch")
    expect(result.products[1].salesPrice).toBe(79.90)
  })
})