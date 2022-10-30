import {unique} from './array'

export const sum = <T>(collection: T[], key: keyof T) => {
  return collection.reduce((sub, item) => sub + Number(item[key]), 0)
}

export const distinct = <T>(collection: T[], key: keyof T): T[] => {
  const uniqueKeyValues = unique(collection.map((item) => item[key]))

  const result: T[] = []
  for (const keyValue of uniqueKeyValues) {
    result.push(collection.find((item) => item[key] === keyValue)!)
  }

  return result
}