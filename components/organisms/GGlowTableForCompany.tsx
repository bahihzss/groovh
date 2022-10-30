import React from 'react'
import {CompanyPerformanceDto} from '../../use-case/calc-company-performances-use-case'
import {formatYen, useMatrix} from '../../hooks/matrix'
import Spreadsheet from 'react-spreadsheet'


export interface GGlowTableForCompanyProps {
  companyPerformances: CompanyPerformanceDto[]
}

export const GGlowTableForCompany: React.FC<GGlowTableForCompanyProps> = ({companyPerformances}) => {
  const matrix = useMatrix(companyPerformances, {
    company: {
      label: '会社',
      format: (company) => company.name,
    },
    receipt: {
      label: '会社へ支払われる金額',
      format: formatYen,
    },
    billing: {
      label: 'G-GLOWへ支払う手数料',
      format: formatYen,
    },
    adCost: {
      label: 'G-GLOWへ支払う広告費',
      format: formatYen,
    },
  })

  return (<Spreadsheet data={matrix}/>)
}