import {Store} from '../../hooks/store'
import {Company} from '../entities/company'

export class CompanyRepository {
  constructor(private store: Store) {
  }

  findById(id: string): Company | null {
    return this.store.COMPANY.find((company) => company.id === id) ?? null
  }

  list(): Company[] {
    return this.store.COMPANY
  }
}