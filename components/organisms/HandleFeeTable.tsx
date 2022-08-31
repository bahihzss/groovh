import React from 'react'
import {BrandPerformanceDto} from './DataSourceInput'
import styles from './HandleFeeTable.module.css'


export interface HandleFeeTableProps {
  brandPerformances: BrandPerformanceDto[]
}

export const HandleFeeTable: React.FC<HandleFeeTableProps> = ({brandPerformances}) => {
  const totalgGlowBilling = brandPerformances.reduce((sub, {gGlowBilling}) => sub + gGlowBilling, 0)
  const brandPerformancesWithRate = brandPerformances.map((brandPerformance) => ({
    ...brandPerformance,
    rate: brandPerformance.gGlowBilling / totalgGlowBilling
  }))

  return <table className={styles.HandleFeeTable}>
    <thead>
    <tr>
      <th>販売手数料（売上-入金額）</th>
      <th>販売手数料（税込）</th>
      <th>比率</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>全体</td>
      <td>&yen;{totalgGlowBilling.toLocaleString()}</td>
      <td>100%</td>
    </tr>
    {
      brandPerformancesWithRate.map((performance) => (
        <tr key={performance.brand.id}>
          <td>{performance.brand.name}</td>
          <td>&yen;{performance.gGlowBilling.toLocaleString()}</td>
          <td>{(performance.rate * 100).toLocaleString()}%</td>
        </tr>
      ))
    }
    </tbody>
  </table>
}