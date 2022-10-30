import {headers} from './headers'
import {fileNamePatterns} from './file-name-patterns'

export type ShopType = 'YAHOO' | 'RAKUTEN'
export type SourceType = 'BILLING' | 'RECEIPT' | 'ORDER' | 'AD_PERFORMANCE' | 'COMPANY' | 'BRAND' | 'PRODUCT'


const detect = (fileName: string) => {
  const [sourceType, shopType] = fileNamePatterns.find(([_so, _sh, pattern]) => pattern.test(fileName)) ?? [null, null]
  return [sourceType, shopType] as const
}

export const validateSourceType = (header: string[], sourceType: SourceType, shopType: ShopType, fileName: string) => {
  const validHeader = headers[shopType][sourceType]
  const isValid = JSON.stringify(header) === JSON.stringify(validHeader)

  if (!isValid) {
    throw new HeaderAndSourceTypeMisMatchError(fileName, header, sourceType, shopType)
  }
}

class UndefinedSourceError extends Error {
  constructor(fileName: string) {
    const message = `${fileName} のソースタイプを判別できませんでした。
このアプリはファイル名からソースタイプを判別しているので、ファイル名を修正してください。`

    super(message)
    this.name = 'UndefinedSourceError'
  }
}

class HeaderAndSourceTypeMisMatchError extends Error {
  constructor(fileName: string, header: string[], sourceType: SourceType, shopType: ShopType) {
    const message = `ヘッダーとソースタイプが一致しません。
ファイル名：${fileName}
ショップタイプ：${shopType}
ソースタイプ：${sourceType}
与えられたヘッダー：${header.join(', ')}
期待されるヘッダー：${headers[shopType][sourceType]?.join(', ')}`

    super(message)
    this.name = 'HeaderAndSourceTypeMisMatchError'
  }
}

export const detectSourceType = (fileName: string) => {
  const [sourceType, shopType] = detect(fileName)

  if (sourceType === null || shopType === null) {
    throw new UndefinedSourceError(fileName)
  }

  return [sourceType, shopType] as const
}