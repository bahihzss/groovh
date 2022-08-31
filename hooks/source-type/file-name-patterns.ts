import {SourceType} from './index'

export const fileNamePatterns: Record<SourceType, RegExp> = {
  BILLING: /^billing/,
  RECEIPT: /^receipt/,
  ORDER: /^default_all_items/,
  AD_PERFORMANCE: /^product/,
  COMPANY: /^master_yahoo.*companies\.csv$/,
  BRAND: /^master_yahoo.*brands\.csv$/,
  PRODUCT: /^master_yahoo.*products\.csv$/,
}