import {Store} from '../../hooks/store'
import {OrderRepository} from './order-repository'
import {Receipt} from '../entities/receipt'

export class ReceiptRepository {
  constructor(private store: Store, private orderRepository = new OrderRepository(store)) {
  }

  listByOrderId(orderId: string): Receipt[] {
    return this.store.RECEIPT.filter((receipt) => receipt.orderId === orderId)
  }

  listByBrandId(brandId: string): Receipt[] {
    const orders = this.orderRepository.listByBrandId(brandId)

    let receipts: Receipt[] = []
    for (const orderId of [...new Set(orders.map(({id}) => id))]) {
      receipts = [...receipts, ...this.listByOrderId(orderId)]
    }

    if (brandId === 'others') {
      receipts = [...receipts, ...this.listNonOrder()]
    }

    return receipts
  }

  listNonOrder(): Receipt[] {
    return this.store.RECEIPT.filter(({orderId}) => !this.orderRepository.exists(orderId))
  }
}