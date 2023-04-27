import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface from "./facade.interface";
import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface.dto";

export default class PaymentFacade implements PaymentFacadeInterface {

  constructor(private processPaymentUseCase: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input)
  }
}