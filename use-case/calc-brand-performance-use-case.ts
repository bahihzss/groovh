import {Brand} from '../domain/entities/brand'
import {Company} from '../domain/entities/company'
import {AdPerformanceRepository} from '../infrastructure/repositories/ad-performance-repository'
import {BillingRepository} from '../infrastructure/repositories/billing-repository'
import {ReceiptRepository} from '../infrastructure/repositories/receipt-repository'
import {CompanyRepository} from '../infrastructure/repositories/company-repository'
import {sum} from '../utils/collection'

export interface BrandPerformanceDto {
  brand: Brand
  company: Company
  gGlowReceipt: number
  adCost: number
  receipt: number
  receiptHandle: number
  gGlowBilling: number
  billing: number
  billingHandle: number
  profit: number
}

export class CalcBrandPerformanceUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private receiptRepository: ReceiptRepository,
    private billingRepository: BillingRepository,
    private adPerformanceRepository: AdPerformanceRepository,
  ) {
  }

  exec(brand: Brand): BrandPerformanceDto {
    const company = this.companyRepository.findById(brand.companyId)!

    const adPerformances = this.adPerformanceRepository.listByBrandId(brand.id)
    const receipts = this.receiptRepository.listByBrandId(brand.id)
    const billings = this.billingRepository.listByBrandId(brand.id)

    const adCost = sum(adPerformances, 'price')
    const gGlowReceipt = sum(receipts, 'price')
    const receipt = Math.floor(gGlowReceipt * company.receiptHandleRate)
    const receiptHandle = gGlowReceipt - receipt
    const gGlowBilling = sum(billings, 'price')
    const billing = Math.floor(gGlowBilling * company.billingHandleRate)
    const billingHandle = billing - gGlowBilling
    const profit = receipt - billing

    return {
      brand,
      company,
      adCost,
      gGlowReceipt,
      receipt,
      receiptHandle,
      gGlowBilling,
      billing,
      billingHandle,
      profit,
    }
  }
}