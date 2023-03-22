import { FindAllStoreCatalogFacadeOutputDto } from "./find-all-store-catalog.facade.dto"
import { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./find-store-catalog.facade.dto"

export default interface StoreCatalogFacadeInterface {

  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}