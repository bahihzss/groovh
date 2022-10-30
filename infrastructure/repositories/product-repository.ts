import {Store} from '../../hooks/store'
import {Product} from '../../domain/entities/product'

export class ProductRepository {
  constructor(private store: Store) {
  }

  findById(productId: string): Product | null {
    return this.store.PRODUCT.find((product) => product.id === productId) ?? null
  }

  listByBrandId(brandId: string): Product[] {
    return this.store.PRODUCT.filter((product) => product.brandId === brandId)
  }

  exists(productId: string): boolean {
    return this.store.PRODUCT.some((product) => product.id === productId)
  }

  isSameBrand(productIds: string[]): boolean {
    const products = productIds
      .map((productId) => this.findById(productId))

    return products.every((product) => product?.brandId === products[0]?.brandId)
  }
}