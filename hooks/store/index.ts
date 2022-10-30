import {detectSourceType, SourceType} from '../source-type'
import {Billing} from '../../domain/entities/billing'
import {Receipt} from '../../domain/entities/receipt'
import {Order} from '../../domain/entities/order'
import {AdPerformance} from '../../domain/entities/ad-performance'
import {Company} from '../../domain/entities/company'
import {Brand} from '../../domain/entities/brand'
import {Product} from '../../domain/entities/product'
import {csv2array} from '../csv'
import {useState} from 'react'

export interface Store {
  BILLING: Billing[],
  RECEIPT: Receipt[],
  ORDER: Order[],
  AD_PERFORMANCE: AdPerformance[],
  COMPANY: Company[],
  BRAND: Brand[],
  PRODUCT: Product[],
}

interface Model {
  new(...args: any): any

  fromSourceRow(row: string[]): InstanceType<Model>
}

const models: Record<SourceType, Model> = {
  BILLING: Billing,
  RECEIPT: Receipt,
  ORDER: Order,
  AD_PERFORMANCE: AdPerformance,
  COMPANY: Company,
  BRAND: Brand,
  PRODUCT: Product,
}

export const useStore = () => {
  const [store, setStore] = useState<Store>({
    BILLING: [],
    RECEIPT: [],
    ORDER: [],
    AD_PERFORMANCE: [],
    COMPANY: [],
    BRAND: [],
    PRODUCT: [],
  })

  const addFromCsv = async (file: File) => {
    const {fileName, header, data} = await csv2array(file).parse()
    const sourceType = detectSourceType(fileName, header)

    setStore({
      ...store,
      [sourceType]: [
        ...store[sourceType],
        ...data.map((row) => models[sourceType].fromSourceRow(row)),
      ],
    })
  }

  return {store, addFromCsv}
}