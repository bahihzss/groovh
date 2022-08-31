import React from 'react'
import {BrandPerformanceDto} from './DataSourceInput'
import styles from './ProfitTable.module.css'


export interface ProfitTableProps {
  brandPerformances: BrandPerformanceDto[]
}

export const ProfitTable: React.FC<ProfitTableProps> = ({brandPerformances}) => {
  const totalProfit = brandPerformances.reduce((sub, {profit}) => sub + profit, 0)

  return <table className={styles.ProfitTable}>
    <thead>
    <tr>
      <th>Yahoo売上</th>
      <th>手数料込み金額（税込）</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>全体</td>
      <td>&yen;{totalProfit.toLocaleString()}</td>
    </tr>
    {
      brandPerformances.map((performance) => (
        <tr key={performance.brand.id}>
          <td>{performance.brand.name}</td>
          <td>&yen;{performance.profit.toLocaleString()}</td>
        </tr>
      ))
    }
    </tbody>
  </table>
}