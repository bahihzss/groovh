import {ShopType, SourceType} from './index'

export const fileNamePatterns: [SourceType, ShopType, RegExp][] = [
  ['BILLING', 'YAHOO', /^billing/],
  ['RECEIPT', 'YAHOO', /^receipt/],
  ['ORDER', 'YAHOO', /^default_all_items/],
  ['AD_PERFORMANCE', 'YAHOO', /^product/],
  ['COMPANY', 'YAHOO', /^master_yahoo.*companies\.csv$/],
  ['BRAND', 'YAHOO', /^master_yahoo.*brands\.csv$/],
  ['PRODUCT', 'YAHOO', /^master_yahoo.*products\.csv$/],
  ['BILLING', 'RAKUTEN', /楽天ﾍﾟｲ_ｸｰﾎﾟﾝ利用注文分支払額\.csv$/],
  ['RECEIPT', 'RAKUTEN', /楽天ﾍﾟｲ_決済金\.csv$/],
  ['ORDER', 'RAKUTEN', /^【?経理】?楽天会社別売上算出/],
  ['COMPANY', 'RAKUTEN', /^master_for_groovh.*companies\.csv$/],
  ['BRAND', 'RAKUTEN', /^master_for_groovh.*brands\.csv$/],
  ['PRODUCT', 'RAKUTEN', /^master_for_groovh.*products\.csv$/],
]