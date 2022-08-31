export class Product {
  constructor(
    readonly id: string,
    readonly brandId: string,
  ) {
  }

  static fromCsvRow(row: string[]) {
    const [
      id,
      brandId,
    ] = row

    return new Product(
      id,
      brandId,
    )
  }
}