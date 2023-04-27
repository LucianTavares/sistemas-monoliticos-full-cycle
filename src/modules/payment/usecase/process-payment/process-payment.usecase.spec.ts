import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transactionApproved = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1"
})

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved))
  }
}

const transactionDeclined = new Transaction({
  id: new Id("2"),
  amount: 50,
  orderId: "2",
})

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
  }
}

describe("Process payment use case unit test", () => {

  it("should approve a transaction", async () => {

    const paymentRepository = MockRepositoryApproved()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: "1",
      amount: 100
    }

    const result = await usecase.execute(input)

    expect(result.transactionId).toBe(transactionApproved.id.id)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.status).toBe("approved")
    expect(result.amount).toBe(100)
    expect(result.orderId).toBe(transactionApproved.orderId)
    expect(result.createdAt).toBe(transactionApproved.createdAt)
    expect(result.updatedAt).toBe(transactionApproved.updatedAt)
  })

  it("should decline a transaction", async () => {

    const paymentRepository = MockRepositoryDeclined()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: "1",
      amount: 50
    }

    const result = await usecase.execute(input)

    expect(result.transactionId).toBe(transactionDeclined.id.id)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.status).toBe("declined")
    expect(result.amount).toBe(50)
    expect(result.orderId).toBe(transactionDeclined.orderId)
    expect(result.createdAt).toBe(transactionDeclined.createdAt)
    expect(result.updatedAt).toBe(transactionDeclined.updatedAt)
  })
})