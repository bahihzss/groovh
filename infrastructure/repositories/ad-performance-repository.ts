import {Store} from '../../hooks/store'
import {ProductRepository} from './product-repository'
import {AdPerformance} from '../../domain/entities/ad-performance'

export class AdPerformanceRepository {
  constructor(private store: Store, private productRepository = new ProductRepository(store)) {
  }

  listByProductId(productId: string) {
    return this.store.AD_PERFORMANCE.filter((adPerformance) => adPerformance.productId === productId)
  }

  listByBrandId(brandId: string) {
    const products = this.productRepository.listByBrandId(brandId)

    let adPerformances: AdPerformance[] = []
    for (const product of products) {
      adPerformances = [...adPerformances, ...this.listByProductId(product.id)]
    }

    return adPerformances
  }
}