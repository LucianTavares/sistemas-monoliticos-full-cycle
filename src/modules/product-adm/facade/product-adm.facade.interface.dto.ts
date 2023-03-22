export interface AddProductFacadeInterfaceInputDto {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface CheckStockProductFacadeInterfaceInputDto {
  productId: string
}

export interface CheckStockProductFacadeInterfaceOutputDto {
  productId: string
  stock: number
}