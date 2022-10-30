import React from 'react'
import {BrandPerformanceDto} from '../../use-case/calc-brand-performance-use-case'
import {sum} from '../../utils/collection'
import {formatPercent, formatStraight, formatYen, useMatrix} from '../../hooks/matrix'
import Spreadsheet from 'react-spreadsheet'


export interface SalesTableProps {
  brandPerformances: BrandPerformanceDto[]
}

interface SalesSummary {
  brandName: string
  sales: number
  salesRate: number
  profit: number
  handleFee: number
  handleFeeRate: number
}

export const SalesTable: React.FC<SalesTableProps> = ({brandPerformances}) => {
  const totalSales = sum(brandPerformances, 'gGlowReceipt')
  const totalHandleFee = sum(brandPerformances, 'gGlowBilling')
  const totalProfit = totalSales - totalHandleFee

  const total: SalesSummary = {
    brandName: '合計',
    sales: totalSales,
    salesRate: 1,
    profit: totalProfit,
    handleFee: totalHandleFee,
    handleFeeRate: 1,
  }

  const salesSummaries: SalesSummary[] = brandPerformances.map((brandPerformance) => {
    const sales = brandPerformance.gGlowReceipt
    const handleFee = brandPerformance.gGlowBilling
    const profit = sales - handleFee

    return {
      brandName: brandPerformance.brand.name,
      sales,
      salesRate: sales / totalSales,
      profit,
      handleFee,
      handleFeeRate: handleFee / totalHandleFee,
    }
  })

  const matrix = useMatrix([total, ...salesSummaries], {
    brandName: {
      label: 'ブランド',
      format: formatStraight,
    },
    sales: {
      label: '売上',
      format: formatYen,
    },
    salesRate: {
      label: '売上の割合',
      format: formatPercent,
    },
    profit: {
      label: '入金額',
      format: formatYen,
    },
    handleFee: {
      label: '販売手数料',
      format: formatYen,
    },
    handleFeeRate: {
      label: '販売手数料の割合',
      format: formatPercent,
    },
  })

  return (<Spreadsheet data={matrix}/>)
}