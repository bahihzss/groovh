import {SourceType} from './index'

export const headers: Record<SourceType, string[]> = {
  BILLING: [
    '利用日',
    '注文ID',
    '利用項目',
    '備考',
    '金額（税抜き）',
    '消費税',
    '金額（税込）'
  ],
  RECEIPT: [
    '利用日',
    '注文ID',
    '利用項目',
    '備考',
    '金額（税抜き）',
    '消費税',
    '金額（税込）'
  ],
  ORDER: [
    'Order ID',
    'Line ID',
    'Quantity',
    'Product Code',
    'Description',
    'Option Name',
    'Option Value',
    'Unit Price',
    'Unit Get Point',
    'Line Sub Total',
    'Line Get Point'
  ],
  AD_PERFORMANCE: [
    'ストアアカウント',
    'カテゴリ',
    '商品コード',
    '商品名',
    '表示回数',
    'クリック数',
    'CTR',
    'CPC',
    '利用金額',
    '注文数',
    '注文個数',
    '売上金額',
    'CVR',
    'ROAS'
  ],
  COMPANY: [
    'id',
    'name',
    'billingHandleRate',
    'receiptHandleRate',
  ],
  BRAND: [
    'id',
    'name',
    'companyId',
  ],
  PRODUCT: [
    'id',
    'brandId',
  ]
}