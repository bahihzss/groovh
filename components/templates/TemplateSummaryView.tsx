import React from 'react'
import {BrandPerformanceDto, CompanyPerformanceDto} from '../organisms/DataSourceInput'
import {SalesTable} from '../organisms/SalesTable'
import {ProfitTable} from '../organisms/ProfitTable'
import {HandleFeeTable} from '../organisms/HandleFeeTable'
import {GGlowTable} from '../organisms/GGlowTable'
import {GGlowTableForCompany} from '../organisms/GGlowTableForCompany'

export interface TemplateSummaryViewProps {
  companyPerformances: CompanyPerformanceDto[],
  brandPerformances: BrandPerformanceDto[]
}

export const TemplateSummaryView: React.FC<TemplateSummaryViewProps> = ({brandPerformances, companyPerformances}) => {
  return <div className="p-5">
    <div className="w-full flex gap-5 overflow-auto pb-5">
      <SalesTable brandPerformances={brandPerformances}/>
      <ProfitTable brandPerformances={brandPerformances}/>
      <HandleFeeTable brandPerformances={brandPerformances}/>
    </div>
    <h2 className="font-bold text-3xl pb-3">ブランド別</h2>
    <div className="w-full flex gap-5 overflow-auto">
      {
        brandPerformances.map((brandPerformance) => (
          <GGlowTable key={brandPerformance.brand.id} brandPerformance={brandPerformance}/>
        ))
      }
    </div>
    <h2 className="font-bold text-3xl pb-3">会社別</h2>
    <div className="max-w-full flex gap-5 overflow-auto">
      {
        companyPerformances.map((companyPerformance) => (
          <GGlowTableForCompany key={companyPerformance.company.id} companyPerformance={companyPerformance}/>
        ))
      }
    </div>
  </div>
}