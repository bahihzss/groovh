import {ShopType} from '../../hooks/source-type'

export class Billing {
  constructor(
    readonly orderId: string,
    readonly price: number,
  ) {
  }

  static fromSourceRow(shopType: ShopType, row: string[]) {
    switch (shopType) {
      case 'YAHOO':
        return Billing.fromYahooSourceRow(row)
      case 'RAKUTEN':
        return Billing.fromRakutenSourceRow(row)
    }
  }

  private static fromYahooSourceRow(row: string[]) {
    const [_date, orderId, _title, _note, _priceWithoutTax, _tax, price] = row

    return new Billing(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }

  private static fromRakutenSourceRow(row: string[]) {
    const [
      _sequence,
      orderId,
      _date,
      _couponName,
      price,
    ] = row

    return new Billing(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }
}