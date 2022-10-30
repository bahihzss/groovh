import {useMemo} from 'react'

type Column<T, K extends keyof T> = {
  label: string
  format: (value: T[K]) => string
}

type Columns<T> = Partial<{
  [K in keyof T]: Column<T, K>
}>

const columnEntries = <T>(columns: Columns<T>) => {
  return Object.entries(columns) as [keyof T, Column<T, keyof T>][]
}

export const formatStraight = (value: string) => value
export const formatYen = (value: number) => '¥' + value.toLocaleString()
export const formatPercent = (value: number) => (value * 100).toLocaleString() + '%'

export const useMatrix = <T>(
  collection: T[],
  columns: Columns<T>,
) => {
  return useMemo(() => {
    const entries = columnEntries(columns)

    const header = entries.map(([_, {label}]) => ({
      value: label,
      readonly: true,
    }))
    const data: { value: string }[][] = [header]

    for (const item of collection) {
      data.push(entries.map(([key, column]) => ({
        value: column.format(item[key]),
      })))
    }

    return data
  }, [collection, columns])
}