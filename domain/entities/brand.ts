import {ShopType} from '../../hooks/source-type'

export class Brand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly companyId: string,
  ) {
  }

  static fromSourceRow(shopType: ShopType, row: string[]) {
    const [
      id,
      name,
      companyId,
    ] = row

    return new Brand(
      id,
      name,
      companyId,
    )
  }
}