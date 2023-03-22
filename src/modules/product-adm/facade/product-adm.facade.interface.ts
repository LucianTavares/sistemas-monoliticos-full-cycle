import { AddProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceOutputDto } from "./product-adm.facade.interface.dto"


export default interface ProductAdmFacadeInterface {

  addProduct(input: AddProductFacadeInterfaceInputDto): Promise<void>
  checkStock(input: CheckStockProductFacadeInterfaceInputDto): Promise<CheckStockProductFacadeInterfaceOutputDto>
}