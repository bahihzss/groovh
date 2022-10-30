import {Store} from '../../hooks/store'
import {Order} from '../entities/order'
import {ProductRepository} from './product-repository'

export class OrderRepository {
  constructor(private store: Store, private productRepository = new ProductRepository(store)) {
  }

  listByBrandId(brandId: string) {
    const products = this.productRepository.listByBrandId(brandId)

    let orders: Order[] = []
    for (const product of products) {
      orders = [...orders, ...this.listByProductId(product.id)]
    }

    if (brandId === 'others') {
      orders = [...orders, ...this.listNonProduct()]
    }

    return orders
  }

  listByProductId(productId: string): Order[] {
    return this.store.ORDER.filter((order) => order.productId === productId)
  }

  listNonProduct(): Order[] {
    return this.store.ORDER.filter((order) => !this.productRepository.exists(order.productId))
  }

  exists(orderId: string): boolean {
    return this.store.ORDER.some((order) => order.id === orderId)
  }
}