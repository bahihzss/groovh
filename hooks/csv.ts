import Papa from 'papaparse'
import Encoding from 'encoding-japanese'

export class NonCsvError extends Error {
  constructor(
    readonly file: File,
  ) {
    super(`${file.name} は CSV ではありません。`)
    this.name = 'NonCsvError'
  }
}

export class FailedToDetectEncodingError extends Error {
  constructor(
    readonly file: File,
  ) {
    super(`${file.name} の文字コードを認識できませんでした。`)
    this.name = 'FailedToDetectEncodingError'
  }
}

type ParseData = string[]

interface ParseOptions {
  headerOffset: number
}

interface ParseResult {
  fileName: string
  header: ParseData
  data: ParseData[]
}

export const csv2array = (file: File) => {
  if (file.type !== 'text/csv') {
    throw new NonCsvError(file)
  }

  const filename = file.name

  const parse = (parseOptions: ParseOptions) => new Promise<ParseResult>(async (resolve) => {
    const codes = new Uint8Array(await file.arrayBuffer())
    const encoding = Encoding.detect(codes)

    if (!encoding) {
      throw new FailedToDetectEncodingError(file)
    }

    const unicodeString = Encoding.convert(codes, {
      type: 'string',
      from: encoding,
      to: 'UNICODE',
    })

    Papa.parse<ParseData>(unicodeString, {
      complete: function (results) {
        const [header, ...data] = results.data.slice(parseOptions.headerOffset)
        const filteredData = data.filter(row => Array.isArray(row) && header.length === row.length)

        resolve({
          fileName: file.name,
          header,
          data: filteredData,
        })
      },
    })
  })

  return {filename, parse}
}