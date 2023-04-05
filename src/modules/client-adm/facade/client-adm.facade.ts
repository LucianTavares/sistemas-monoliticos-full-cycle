import UseCaseInterface from "../../@shared/usecase/use-case.interface"
import ClientAdmFacadeInterface from "./client-adm.facade.interface"
import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface.dto"


export interface UseCaseProps {
  findUseCase: UseCaseInterface
  addUseCase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

  private _findUsecase: UseCaseInterface
  private _addUsecase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUseCase
    this._findUsecase = usecaseProps.findUseCase
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    return await this._addUsecase.execute(input)
  }
  
  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input)
  }
}