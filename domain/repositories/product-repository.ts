import {Store} from '../../hooks/store'

export class ProductRepository {
  constructor(private store: Store) {
  }

  listByBrandId(brandId: string) {
    return this.store.PRODUCT.filter((product) => product.brandId === brandId)
  }

  exists(productId: string) {
    return this.store.PRODUCT.some((product) => product.id === productId)
  }
}