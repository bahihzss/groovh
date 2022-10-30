export class AdPerformance {
  constructor(
    readonly productId: string,
    readonly price: number,
  ) {
  }

  static fromSourceRow(row: string[]) {
    const [
      _store,
      _category,
      productCode,
      _productName,
      _impressionCount,
      _clickCount,
      _ctr,
      _cpc,
      price,
    ] = row

    return new AdPerformance(
      productCode.replace(/^az-market_/, ''),
      parseInt(price),
    )
  }
}