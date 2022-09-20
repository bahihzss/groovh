import React, {useState} from 'react'
import {FileInput} from '../atoms/FileInput'
import {file2csv} from '../../hooks/csv'
import {Alert} from '../atoms/Alert'
import styles from './DataSourceInput.module.css'
import {Billing} from '../../entities/billing'
import {Receipt} from '../../entities/receipt'
import {Order} from '../../entities/order'
import {AdPerformance} from '../../entities/ad-performance'
import {Company} from '../../entities/company'
import {Brand} from '../../entities/brand'
import {Product} from '../../entities/product'
import {getSourceType} from '../../hooks/source-type'

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

export interface CompanyPerformanceDto {
  company: Company
  adCost: number
  receipt: number
  billing: number
}

export interface OnDropPayload {
  companyPerformances: CompanyPerformanceDto[]
  brandPerformances: BrandPerformanceDto[]
}

interface DataSourceInputProps {
  onDrop(payload: OnDropPayload): void
}

export const DataSourceInput: React.FC<DataSourceInputProps> = ({onDrop}) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const handleFileChange = async (files: File[]) => {
    const resources = {
      BILLING: [] as Billing[],
      RECEIPT: [] as Receipt[],
      ORDER: [] as Order[],
      AD_PERFORMANCE: [] as AdPerformance[],
      COMPANY: [] as Company[],
      BRAND: [] as Brand[],
      PRODUCT: [] as Product[],
    }

    const _errorMessages: string[] = []
    for (const file of files) {
      try {
        const {parse} = file2csv(file)
        const {fileName, header, data} = await parse()
        const sourceType = getSourceType(fileName, header)

        switch (sourceType) {
          case 'BILLING':
            resources.BILLING = [...resources.BILLING, ...data.map(Billing.fromCsvRow)]
            break
          case 'RECEIPT':
            resources.RECEIPT = [...resources.RECEIPT, ...data.map(Receipt.fromCsvRow)]
            break
          case 'ORDER':
            resources.ORDER = [...resources.ORDER, ...data.map(Order.fromCsvRow)]
            break
          case 'AD_PERFORMANCE':
            resources.AD_PERFORMANCE = [...resources.AD_PERFORMANCE, ...data.map(AdPerformance.fromCsvRow)]
            break
          case 'COMPANY':
            resources.COMPANY = [...resources.COMPANY, ...data.map(Company.fromCsvRow)]
            break
          case 'BRAND':
            resources.BRAND = [...resources.BRAND, ...data.map(Brand.fromCsvRow)]
            break
          case 'PRODUCT':
            resources.PRODUCT = [...resources.PRODUCT, ...data.map(Product.fromCsvRow)]
            break
        }
      } catch (e) {
        if (e instanceof Error) _errorMessages.push(e.message)
      }
    }
    setErrorMessages(_errorMessages)

    const brandPerformances: BrandPerformanceDto[] = resources.BRAND.map(brand => {
      const company = resources.COMPANY.find((company) => company.id === brand.companyId)!
      const products = resources.PRODUCT.filter((product) => product.brandId === brand.id)

      let orders: Order[] = []
      let adPerformances: AdPerformance[] = []

      for (const product of products) {
        const ordersForProducts = resources.ORDER.filter((order) => order.productId === product.id)
        orders = [...orders, ...ordersForProducts]

        const adPerformancesOfProduct = resources.AD_PERFORMANCE.filter((adPerformance) => adPerformance.productId === product.id)
        adPerformances = [...adPerformances, ...adPerformancesOfProduct]
      }

      if (brand.id === 'others') {
        const nonBrandOrders = resources.ORDER.filter((order) => resources.PRODUCT.every((product) => product.id !== order.productId))
        orders = [...orders, ...nonBrandOrders]
      }

      const uniqueOrderIdList = [...new Set(orders.map(({id}) => id))]

      let receipts: Receipt[] = []
      let billings: Billing[] = []

      for (const orderId of uniqueOrderIdList) {
        const receiptsForOrder = resources.RECEIPT.filter((receipt) => receipt.orderId === orderId)
        receipts = [...receipts, ...receiptsForOrder]

        const billingsForOrder = resources.BILLING.filter((billing) => billing.orderId === orderId)
        billings = [...billings, ...billingsForOrder]
      }

      if (brand.id === 'others') {
        const nonOrderReceipts = resources.RECEIPT.filter((receipt) => resources.ORDER.every((order) => order.id !== receipt.orderId))
        receipts = [...receipts, ...nonOrderReceipts]

        const nonOrderBillings = resources.BILLING.filter((billing) => resources.ORDER.every((order) => order.id !== billing.orderId))
        billings = [...billings, ...nonOrderBillings]
      }

      const adCost = adPerformances.reduce((sub, {price}) => sub + price, 0)

      const gGlowReceipt = receipts.reduce((sub, {price}) => sub + price, 0)
      const receipt = Math.floor(gGlowReceipt * company.receiptHandleRate)
      const receiptHandle = gGlowReceipt - receipt

      const gGlowBilling = billings.reduce((sub, {price}) => sub + price, 0)
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
    })

    const companyPerformances: CompanyPerformanceDto[] = resources.COMPANY.map(company => {
      const brands = resources.BRAND.filter((brand) => brand.companyId === company.id)

      let brandPerformancesForCompany: BrandPerformanceDto[] = []
      for (const brand of brands) {
        const brandPerformancesForBrand = brandPerformances.filter((performance) => performance.brand.id === brand.id)
        brandPerformancesForCompany = [...brandPerformancesForCompany, ...brandPerformancesForBrand]
      }

      const billing = brandPerformancesForCompany.reduce((sub, {billing}) => sub + billing, 0)
      const receipt = brandPerformancesForCompany.reduce((sub, {receipt}) => sub + receipt, 0)
      const adCost = brandPerformancesForCompany.reduce((sub, {adCost}) => sub + adCost, 0)

      return {
        company,
        adCost,
        receipt,
        billing,
      }
    })

    onDrop({companyPerformances, brandPerformances})
  }

  return (
    <>
      <FileInput onChange={handleFileChange}/>
      {errorMessages.length > 0 && (
        <div
          className={styles.DataSourceInput_errorArea}>
          {errorMessages.map((errorMessage) => (
            <Alert key={errorMessage} title="エラー">
              <pre>{errorMessage}</pre>
            </Alert>
          ))}
        </div>
      )}
    </>
  )
}