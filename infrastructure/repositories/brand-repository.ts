import {Store} from '../../hooks/store'

export class BrandRepository {
  constructor(private store: Store) {
  }

  list() {
    return this.store.BRAND
  }

  listByCompanyId(companyId: string) {
    return this.store.BRAND.filter((brand) => brand.companyId === companyId)
  }
}