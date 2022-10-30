export class Brand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly companyId: string,
  ) {
  }

  static fromSourceRow(row: string[]) {
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