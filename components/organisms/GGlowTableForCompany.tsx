import React from 'react'
import {CompanyPerformanceDto} from './DataSourceInput'
import styles from './GGlowTableForCompany.module.css'


export interface GGlowTableForCompanyProps {
  companyPerformance: CompanyPerformanceDto
}

export const GGlowTableForCompany: React.FC<GGlowTableForCompanyProps> = ({companyPerformance}) => {
  return <table className={styles.GGlowTableForCompany}>
    <thead>
    <tr>
      <th>総合計</th>
      <th>金額</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{companyPerformance.company.name}へ支払われる金額</td>
      <td>¥{companyPerformance.receipt.toLocaleString()}</td>
    </tr>
    <tr>
      <td>G-GLOWへ支払われる手数料</td>
      <td>¥{companyPerformance.billing.toLocaleString()}</td>
    </tr>
    <tr>
      <td>G-GLOWへ支払われる広告費</td>
      <td>¥{companyPerformance.adCost.toLocaleString()}</td>
    </tr>
    </tbody>
  </table>
}