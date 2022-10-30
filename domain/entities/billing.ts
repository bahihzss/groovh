export class Billing {
  constructor(
    readonly orderId: string,
    readonly price: number,
  ) {
  }

  static fromSourceRow(row: string[]) {
    const [_date, orderId, _title, _note, _priceWithoutTax, _tax, price] = row

    return new Billing(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }
}