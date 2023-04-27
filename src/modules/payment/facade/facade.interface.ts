import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface.dto";

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>
}