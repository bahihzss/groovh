import {detectSourceType, ShopType, SourceType, validateSourceType} from '../source-type'
import {Billing} from '../../domain/entities/billing'
import {Receipt} from '../../domain/entities/receipt'
import {Order} from '../../domain/entities/order'
import {AdPerformance} from '../../domain/entities/ad-performance'
import {Company} from '../../domain/entities/company'
import {Brand} from '../../domain/entities/brand'
import {Product} from '../../domain/entities/product'
import {csv2array} from '../csv'

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

  fromSourceRow(shopType: ShopType, row: string[]): InstanceType<Model>
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

interface HeaderOffset {
  shopType: ShopType
  sourceType: SourceType
  offset: number
}

const headerOffsets: HeaderOffset[] = [
  {
    shopType: 'RAKUTEN',
    sourceType: 'BILLING',
    offset: 3,
  },
  {
    shopType: 'RAKUTEN',
    sourceType: 'RECEIPT',
    offset: 3,
  },
]

export const useStore = () => {
  const store: Store = {
    BILLING: [],
    RECEIPT: [],
    ORDER: [],
    AD_PERFORMANCE: [],
    COMPANY: [],
    BRAND: [],
    PRODUCT: [],
  }

  const addFromCsv = async (file: File) => {
    const {filename, parse} = csv2array(file)

    const [sourceType, shopType] = detectSourceType(filename)
    const headerOffset = headerOffsets.find((offset) => offset.shopType === shopType && offset.sourceType === sourceType)

    const {header, data} = await parse({
      headerOffset: headerOffset?.offset ?? 0,
    })
    validateSourceType(header, sourceType, shopType, filename)

    store[sourceType] = [
      ...store[sourceType],
      ...data.map((row) => models[sourceType].fromSourceRow(shopType, row)),
    ]
  }

  return {store, addFromCsv}
}