import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface.dto"

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
}