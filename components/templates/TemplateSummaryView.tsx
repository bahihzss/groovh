import React from 'react'
import {SalesTable} from '../organisms/SalesTable'
import {GGlowTable} from '../organisms/GGlowTable'
import {GGlowTableForCompany} from '../organisms/GGlowTableForCompany'
import {CompanyPerformanceDto} from '../../use-case/calc-company-performances-use-case'
import {BrandPerformanceDto} from '../../use-case/calc-brand-performance-use-case'
import {Order} from '../../domain/entities/order'
import {OrderTable} from '../organisms/OrderTable'

export interface TemplateSummaryViewProps {
  companyPerformances: CompanyPerformanceDto[],
  brandPerformances: BrandPerformanceDto[],
  multiBrandOrders: Order[]
}

export const TemplateSummaryView: React.FC<TemplateSummaryViewProps> = (
  {
    brandPerformances,
    companyPerformances,
    multiBrandOrders,
  },
) => {
  return (
    <div className="p-5 grid gap-5">
      <div className="flex gap-5">
        <section>
          <h2 className="font-bold text-3xl pb-3">収支</h2>
          <SalesTable brandPerformances={brandPerformances}/>
        </section>
        {
          multiBrandOrders.length && (
            <section>
              <h2 className="font-bold text-3xl pb-3">複数のブランドを含む注文</h2>
              <OrderTable orders={multiBrandOrders}/>
            </section>
          )
        }
      </div>
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