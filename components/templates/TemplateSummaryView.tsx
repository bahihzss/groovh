import React from 'react'
import {SalesTable} from '../organisms/SalesTable'
import {GGlowTable} from '../organisms/GGlowTable'
import {GGlowTableForCompany} from '../organisms/GGlowTableForCompany'
import {CompanyPerformanceDto} from '../../use-case/calc-company-performances-use-case'
import {BrandPerformanceDto} from '../../use-case/calc-brand-performance-use-case'

export interface TemplateSummaryViewProps {
  companyPerformances: CompanyPerformanceDto[],
  brandPerformances: BrandPerformanceDto[]
}

export const TemplateSummaryView: React.FC<TemplateSummaryViewProps> = ({brandPerformances, companyPerformances}) => {
  return (
    <div className="p-5 grid gap-5">
      <SalesTable brandPerformances={brandPerformances}/>
      <section>
        <h2 className="font-bold text-3xl pb-3">ブランド別</h2>
        <GGlowTable brandPerformances={brandPerformances}/>
      </section>
      <section>
        <h2 className="font-bold text-3xl pb-3">会社別</h2>
        <GGlowTableForCompany companyPerformances={companyPerformances}/>
      </section>
    </div>
  )
}