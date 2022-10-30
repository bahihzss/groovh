import {ShopType} from '../../hooks/source-type'

export class Product {
  constructor(
    readonly id: string,
    readonly brandId: string,
  ) {
  }

  static fromSourceRow(shopType: ShopType, row: string[]) {
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