import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import { ProductModel } from "./product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Invoice from "../domain/invoice.entity"
import Address from "../domain/value-object/address"
import ProductRepository from "./product.repository"

describe("Invoice Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a invoice", async () => {

    const inputProduct = {
      id: new Id("1"),
      name: "DDD",
      price: 59.90
    }
    
    const product = new Product(inputProduct)
    const productRepository = new ProductRepository()

    const inputInvoice = {
      id: new Id("1"),
      name: "invoice-1",
      document: "NI-1",
      address: new Address(
        "Rua 123",
        "23",
        "Casa verde",
        "São Paulo",
        "SP",
        "88888-888"
      ),
      items: [product],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const invoice = new Invoice(inputInvoice)
    const invoiceRepository = new InvoiceRepository()

    await productRepository.create(product)
    await invoiceRepository.create(invoice)

    const invoiceDb = await InvoiceModel.findOne({where: {id: "1"}})

    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toBe(invoice.id.id)
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.street).toBe(invoice.address.street)
    expect(invoiceDb.number).toBe(invoice.address.number)
    expect(invoiceDb.complement).toBe(invoice.address.complement)
    expect(invoiceDb.city).toBe(invoice.address.city)
    expect(invoiceDb.state).toBe(invoice.address.state)
    expect(invoiceDb.zipcode).toBe(invoice.address.zipCode)
    expect(invoiceDb.items.length).toBe(1)
    expect(invoiceDb.createdAt).toBe(invoiceDb.createdAt)
    expect(invoiceDb.updatedAt).toBe(invoiceDb.updatedAt)

  })
})