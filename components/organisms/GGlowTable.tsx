import React from 'react'
import {BrandPerformanceDto} from '../../use-case/calc-brand-performance-use-case'
import {formatPercent, formatStraight, formatYen, useMatrix} from '../../hooks/matrix'
import Spreadsheet from 'react-spreadsheet'

export interface GGlowTableProps {
  brandPerformances: BrandPerformanceDto[];
}

interface GGlowHandleDto {
  brandName: string
  billingHandleRate: number
  billingFromBrand: number
  billingForGGlow: number
  receiptHandleRate: number
  receiptForBrand: number
  receiptForGGlow: number
  adCost: number
}

export const GGlowTable: React.FC<GGlowTableProps> = ({brandPerformances}) => {
  const gGlowHandles: GGlowHandleDto[] = brandPerformances.map((performance) => {
    const {billingHandleRate, receiptHandleRate} = performance.company
    const billingFromBrand = performance.billing * billingHandleRate
    const receiptForBrand = performance.receipt * receiptHandleRate

    return {
      brandName: performance.brand.name,
      billingHandleRate: billingHandleRate - 1,
      billingFromBrand,
      billingForGGlow: billingFromBrand - performance.billing,
      receiptHandleRate: 1 - receiptHandleRate,
      receiptForBrand,
      receiptForGGlow: performance.receipt - receiptForBrand,
      adCost: performance.adCost,
    }
  })

  const matrix = useMatrix(gGlowHandles, {
    brandName: {
      label: 'ブランド',
      format: formatStraight,
    },
    receiptHandleRate: {
      label: '売上:G-GLOW手数料率',
      format: formatPercent,
    },
    receiptForBrand: {
      label: '売上:ブランド受取分',
      format: formatYen,
    },
    receiptForGGlow: {
      label: '売上:G-GLOW取分',
      format: formatYen,
    },
    billingHandleRate: {
      label: '販売手数料:G-GLOW手数料率',
      format: formatPercent,
    },
    billingFromBrand: {
      label: '販売手数料:ブランド支払分',
      format: formatYen,
    },
    billingForGGlow: {
      label: '販売手数料:G-GLOW取分',
      format: formatYen,
    },
    adCost: {
      label: '広告費',
      format: formatYen,
    },
  })

  return (<Spreadsheet data={matrix}/>)

}