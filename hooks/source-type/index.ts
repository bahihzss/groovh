import {headers} from './headers'
import {fileNamePatterns} from './file-name-patterns'

export type SourceType = 'BILLING' | 'RECEIPT' | 'ORDER' | 'AD_PERFORMANCE' | 'COMPANY' | 'BRAND' | 'PRODUCT'


const detect = (fileName: string) => {
  const [sourceType] = Object.entries(fileNamePatterns).find(([_, pattern]) => pattern.test(fileName)) ?? [null]
  return sourceType as SourceType | null
}

const validate = (header: string[], sourceType: SourceType) => {
  const validHeader = headers[sourceType]
  return JSON.stringify(header) === JSON.stringify(validHeader)
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
  constructor(fileName: string, header: string[], sourceType: SourceType) {
    const message = `ヘッダーとソースタイプが一致しません。
ファイル名：${fileName}
ソースタイプ：${sourceType}
ヘッダー：${header.join(', ')}`

    super(message)
    this.name = 'HeaderAndSourceTypeMisMatchError'
  }
}

export const useSourceType = (fileName: string, header: string[]) => {
  const sourceType = detect(fileName)

  if (sourceType === null) {
    throw new UndefinedSourceError(fileName)
  }
  if (!validate(header, sourceType)) {
    throw new HeaderAndSourceTypeMisMatchError(fileName, header, sourceType)
  }

  return sourceType
}