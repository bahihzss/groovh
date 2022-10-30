import {ShopType} from '../../hooks/source-type'

export class Receipt {
  constructor(
    readonly orderId: string,
    readonly price: number,
  ) {
  }

  static fromSourceRow(shopType: ShopType, row: string[]) {
    switch (shopType) {
      case 'YAHOO':
        return Receipt.fromYahooSourceRow(row)
      case 'RAKUTEN':
        return Receipt.fromRakutenSourceRow(row)
    }
  }

  private static fromYahooSourceRow(row: string[]) {
    const [_date, orderId, _title, _note, _priceWithoutTax, _tax, price] = row

    return new Receipt(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }

  private static fromRakutenSourceRow(row: string[]) {
    const [
      _sequence,
      _date,
      orderId,
      _paymentId,
      _paymentOrganizationId,
      _contactId,
      _paymentDate,
      price,
    ] = row

    return new Receipt(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }
}