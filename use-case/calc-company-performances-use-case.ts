import {BrandRepository} from '../domain/repositories/brand-repository'
import {BrandPerformanceDto} from './calc-brand-performance-use-case'
import {Company} from '../domain/entities/company'
import {sum} from '../utils/aggregation'

export interface CompanyPerformanceDto {
  company: Company
  adCost: number
  receipt: number
  billing: number
}

export class CalcCompanyPerformancesUseCase {
  constructor(private brandRepository: BrandRepository) {
  }

  execute(company: Company, brandPerformances: BrandPerformanceDto[]) {
    const brands = this.brandRepository.listByCompanyId(company.id)

    let brandPerformancesForCompany: BrandPerformanceDto[] = []
    for (const brand of brands) {
      const brandPerformancesForBrand = brandPerformances.filter((performance) => performance.brand.id === brand.id)
      brandPerformancesForCompany = [...brandPerformancesForCompany, ...brandPerformancesForBrand]
    }

    const billing = sum(brandPerformancesForCompany, 'billing')
    const receipt = sum(brandPerformancesForCompany, 'receipt')
    const adCost = sum(brandPerformancesForCompany, 'adCost')

    return {
      company,
      adCost,
      receipt,
      billing,
    }
  }
}