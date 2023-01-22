import {Brand} from '../domain/entities/brand'
import {Company} from '../domain/entities/company'
import {AdPerformanceRepository} from '../infrastructure/repositories/ad-performance-repository'
import {BillingRepository} from '../infrastructure/repositories/billing-repository'
import {ReceiptRepository} from '../infrastructure/repositories/receipt-repository'
import {CompanyRepository} from '../infrastructure/repositories/company-repository'
import {sum} from '../utils/collection'
import {Order} from '../domain/entities/order'
import {OrderRepository} from '../infrastructure/repositories/order-repository'

export interface BrandPerformanceDto {
  brand: Brand
  company: Company
  gGlowReceipt: number
  adCost: number
  prOptionCost: number
  receipt: number
  receiptHandle: number
  gGlowBilling: number
  billing: number
  billingHandle: number
  profit: number
  orders: Order[]
}

export class CalcBrandPerformanceUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private receiptRepository: ReceiptRepository,
    private billingRepository: BillingRepository,
    private adPerformanceRepository: AdPerformanceRepository,
    private orderRepository: OrderRepository,
  ) {
  }

  exec(brand: Brand): BrandPerformanceDto {
    const company = this.companyRepository.findById(brand.companyId)!

    const adPerformances = this.adPerformanceRepository.listByBrandId(brand.id)
    const receipts = this.receiptRepository.listByBrandId(brand.id)
    const billings = this.billingRepository.listByBrandId(brand.id)

    const adCost = sum(adPerformances, 'price')
    const gGlowReceipt = sum(receipts, 'price')
    const receipt = Math.round(gGlowReceipt * company.receiptHandleRate)
    const receiptHandle = gGlowReceipt - receipt
    const gGlowBilling = sum(billings, 'price')
    const billing = Math.round(gGlowBilling * company.billingHandleRate)
    const billingHandle = billing - gGlowBilling
    const profit = receipt - billing
    const prOptionCost = Math.round(gGlowReceipt * (1 - company.receiptHandleRate))

    const orders = this.orderRepository.listByBrandId(brand.id)

    return {
      brand,
      company,
      adCost,
      prOptionCost,
      gGlowReceipt,
      receipt,
      receiptHandle,
      gGlowBilling,
      billing,
      billingHandle,
      profit,
      orders,
    }
  }
}