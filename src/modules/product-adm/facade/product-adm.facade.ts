import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";
import { AddProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceInputDto, CheckStockProductFacadeInterfaceOutputDto } from "./product-adm.facade.interface.dto";

export interface UseCasesProps {
  addUseCase: UseCaseInterface
  stockUsecase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

  private _addUsecase: UseCaseInterface
  private _checkStockUsecase: UseCaseInterface

  constructor(useCasesProps: UseCasesProps) {
    this._addUsecase = useCasesProps.addUseCase
    this._checkStockUsecase = useCasesProps.stockUsecase
  }

  addProduct(input: AddProductFacadeInterfaceInputDto): Promise<void> {
    // caso o DTO do caso de uso for != do DTO da facade, converter o DTO da facade para o DTO do caso de uso 
    return this._addUsecase.execute(input)
  }
  checkStock(input: CheckStockProductFacadeInterfaceInputDto): Promise<CheckStockProductFacadeInterfaceOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}