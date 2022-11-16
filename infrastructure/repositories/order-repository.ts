import {Store} from '../../hooks/store'
import {Order} from '../../domain/entities/order'
import {ProductRepository} from './product-repository'
import {unique} from '../../utils/array'
import {distinct} from '../../utils/collection'

export class OrderRepository {
  private orders: Order[] = []
  private multiBrandOrders: Order[] = []

  constructor(private store: Store, private productRepository = new ProductRepository(store)) {
    const uniqueIds = unique(this.store.ORDER.map(({id}) => id))

    for (const id of uniqueIds) {
      const ordersOfId = this.store.ORDER.filter((order) => order.id === id)
      const productIds = ordersOfId.map((order) => order.productIds).flat()
      const order = new Order(id, productIds)

      if (this.productRepository.isSameBrand(productIds)) {
        this.orders.push(order)
      } else {
        this.multiBrandOrders.push(order)
      }
    }
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

    return distinct(orders, 'id')
  }

  listByProductId(productId: string): Order[] {
    return this.orders.filter((order) => order.productIds.includes(productId))
  }

  listNonProduct(): Order[] {
    return this.orders.filter((order) => order.productIds.every((productId) => !this.productRepository.exists(productId)))
  }

  listMultiBrand(): Order[] {
    return this.multiBrandOrders
  }

  exists(orderId: string): boolean {
    return this.orders.some((order) => order.id === orderId)
  }
}