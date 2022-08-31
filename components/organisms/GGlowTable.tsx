import React from 'react'
import {BrandPerformanceDto} from './DataSourceInput'
import styles from './GGlowTable.module.css'

export interface GGlowTableProps {
  brandPerformance: BrandPerformanceDto;
}

export const GGlowTable: React.FC<GGlowTableProps> = ({brandPerformance}) => {
  return <div className={styles.GGlowTable}>
    <h3>{brandPerformance.brand.name}</h3>
    <table>
      <thead>
      <tr>
        <th>売上総額の{brandPerformance.company.receiptHandleRate * 100}%</th>
        <th>売上総額の{brandPerformance.company.receiptHandleRate * 100}%</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{brandPerformance.brand.name}へ支払う売上</td>
        <td>¥{brandPerformance.receipt.toLocaleString()}</td>
      </tr>
      <tr>
        <td>G-GLOW取り分</td>
        <td>¥{brandPerformance.receiptHandle.toLocaleString()}</td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>販売手数料の{brandPerformance.company.billingHandleRate * 100}%</th>
        <th>販売手数料の{brandPerformance.company.billingHandleRate * 100}%</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>G-GLOWへ支払う手数料</td>
        <td>¥{brandPerformance.billing.toLocaleString()}</td>
      </tr>
      <tr>
        <td>G-GLOW取り分</td>
        <td>¥{brandPerformance.billingHandle.toLocaleString()}</td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>広告費</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>アイテムマッチ</td>
        <td>¥{brandPerformance.adCost.toLocaleString()}</td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>総合計</th>
        <th>金額</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{brandPerformance.brand.name}へ支払われる金額</td>
        <td>¥{brandPerformance.receipt.toLocaleString()}</td>
      </tr>
      <tr>
        <td>G-GLOWへ支払われる手数料</td>
        <td>¥{brandPerformance.billing.toLocaleString()}</td>
      </tr>
      <tr>
        <td>G-GLOWへ支払われる広告費</td>
        <td>¥{brandPerformance.adCost.toLocaleString()}</td>
      </tr>
      </tbody>
    </table>
  </div>
}