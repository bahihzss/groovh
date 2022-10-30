import {Order} from '../domain/entities/order'

export const multiBrandOrders = [
  new Order('hogehoge', ['product-1', 'product-2', 'product-3']),
  new Order('hugahuga', ['product-a', 'product-b', 'product-c']),
  new Order('piyopiyo', ['product-α', 'product-β', 'product-γ']),
]