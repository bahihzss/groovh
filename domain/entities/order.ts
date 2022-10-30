import {ShopType} from '../../hooks/source-type'

export class Order {
  constructor(
    readonly id: string,
    readonly productIds: string[],
  ) {
  }

  static fromSourceRow(shopType: ShopType, row: string[]) {
    switch (shopType) {
      case 'YAHOO':
        return Order.fromYahooSourceRow(row)
      case 'RAKUTEN':
        return Order.fromRakutenSourceRow(row)
    }
  }

  private static fromYahooSourceRow(row: string[]) {
    const [
      orderId,
      _lineId,
      _quantity,
      productId,
    ] = row

    return new Order(
      orderId,
      [productId],
    )
  }

  private static fromRakutenSourceRow(row: string[]) {
    const [orderId, productId] = row

    return new Order(
      orderId,
      [productId],
    )
  }
}