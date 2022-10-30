export class Order {
  constructor(
    readonly id: string,
    readonly productIds: string[],
  ) {
  }

  static fromSourceRow(row: string[]) {
    const [
      orderId,
      _lineId,
      _quantity,
      productCode,
    ] = row

    return new Order(
      orderId,
      [productCode],
    )
  }
}