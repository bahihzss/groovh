import {Store} from '../../hooks/store'
import {OrderRepository} from './order-repository'
import {Billing} from '../../domain/entities/billing'

export class BillingRepository {

  constructor(private store: Store, private orderRepository = new OrderRepository(store)) {
  }

  listByOrderId(orderId: string): Billing[] {
    return this.store.BILLING.filter((receipt) => receipt.orderId === orderId)
  }

  listByBrandId(brandId: string): Billing[] {
    const orders = this.orderRepository.listByBrandId(brandId)

    let billings: Billing[] = []
    for (const order of orders) {
      billings = [...billings, ...this.listByOrderId(order.id)]
    }

    if (brandId === 'others') {
      billings = [...billings, ...this.listNonOrder()]
    }

    return billings
  }

  listNonOrder(): Billing[] {
    return this.store.BILLING.filter(({orderId}) => !this.orderRepository.exists(orderId))
  }
}