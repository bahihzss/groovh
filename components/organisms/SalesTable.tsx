import React from 'react'
import {BrandPerformanceDto} from './DataSourceInput'
import styles from './SalesTable.module.css'


export interface SalesTableProps {
  brandPerformances: BrandPerformanceDto[]
}

export const SalesTable: React.FC<SalesTableProps> = ({brandPerformances}) => {
  const totalgGlowReceipt = brandPerformances.reduce((sub, {gGlowReceipt}) => sub + gGlowReceipt, 0)
  const brandPerformancesWithRate = brandPerformances.map((brandPerformance) => ({
    ...brandPerformance,
    rate: brandPerformance.gGlowReceipt / totalgGlowReceipt
  }))

  return <table className={styles.SalesTable}>
    <thead>
    <tr>
      <th>Yahoo売上</th>
      <th>手数料込み金額（税込）</th>
      <th>比率</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>全体</td>
      <td>&yen;{totalgGlowReceipt.toLocaleString()}</td>
      <td>100%</td>
    </tr>
    {
      brandPerformancesWithRate.map((performance) => (
        <tr key={performance.brand.id}>
          <td>{performance.brand.name}</td>
          <td>&yen;{performance.gGlowReceipt.toLocaleString()}</td>
          <td>{(performance.rate * 100).toLocaleString()}%</td>
        </tr>
      ))
    }
    </tbody>
  </table>
}