export class Receipt {
  constructor(
    readonly orderId: string,
    readonly price: number,
  ) {
  }

  static fromSourceRow(row: string[]) {
    const [_date, orderId, _title, _note, _priceWithoutTax, _tax, price] = row

    return new Receipt(
      orderId.replace('az-market-', ''),
      parseInt(price),
    )
  }
}