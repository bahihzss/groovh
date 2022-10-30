import type {NextPage} from 'next'
import Head from 'next/head'
import {DataSourceInput} from '../components/organisms/DataSourceInput'
import {useCallback, useState} from 'react'
import {TemplateSummaryView} from '../components/templates/TemplateSummaryView'
import {useStore} from '../hooks/store'
import {CompanyRepository} from '../infrastructure/repositories/company-repository'
import {BrandRepository} from '../infrastructure/repositories/brand-repository'
import {ReceiptRepository} from '../infrastructure/repositories/receipt-repository'
import {BillingRepository} from '../infrastructure/repositories/billing-repository'
import {AdPerformanceRepository} from '../infrastructure/repositories/ad-performance-repository'
import {BrandPerformanceDto, CalcBrandPerformanceUseCase} from '../use-case/calc-brand-performance-use-case'
import {CalcCompanyPerformancesUseCase, CompanyPerformanceDto} from '../use-case/calc-company-performances-use-case'
import {Order} from '../domain/entities/order'
import {OrderRepository} from '../infrastructure/repositories/order-repository'
import {Loading} from '../components/atoms/Loading'

interface Performances {
  brandPerformances: BrandPerformanceDto[],
  companyPerformances: CompanyPerformanceDto[]
}

const Home: NextPage = () => {
  const [performances, setPerformances] = useState<null | Performances>(null)
  const [multiBrandOrders, setMultiBrandOrders] = useState<Order[]>([])
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const {store, addFromCsv} = useStore()

  const handleDrop = useCallback(async (files: File[]) => {
    setIsLoading(true)
    const _errorMessages: string[] = []
    for (const file of files) {
      try {
        await addFromCsv(file)
      } catch (e) {
        if (e instanceof Error) _errorMessages.push(e.message)
        console.error(e)
      }
    }
    setErrorMessages(_errorMessages)

    if (_errorMessages.length === 0) {
      const companyRepository = new CompanyRepository(store)
      const brandRepository = new BrandRepository(store)
      const receiptRepository = new ReceiptRepository(store)
      const billingRepository = new BillingRepository(store)
      const adPerformanceRepository = new AdPerformanceRepository(store)

      const calcBrandPerformanceUseCase = new CalcBrandPerformanceUseCase(
        companyRepository,
        receiptRepository,
        billingRepository,
        adPerformanceRepository,
      )
      const brands = brandRepository.list()
      const brandPerformances = brands.map((brand) =>
        calcBrandPerformanceUseCase.exec(brand),
      )

      const calcCompanyPerformanceUseCase = new CalcCompanyPerformancesUseCase(brandRepository)
      const companies = companyRepository.list()
      const companyPerformances: CompanyPerformanceDto[] = companies.map((brand) =>
        calcCompanyPerformanceUseCase.execute(brand, brandPerformances),
      )

      setPerformances({companyPerformances, brandPerformances})

      const orderRepository = new OrderRepository(store)
      const multiBrandOrders = orderRepository.listMultiBrand()

      setMultiBrandOrders(multiBrandOrders)
    }
    setIsLoading(false)
  }, [])

  return (
    <div>
      <Head>
        <title>Groovh - TOP</title>
        <meta name="description" content="Yahoo!ショッピングの売上をブランドごとに振り分けるツール"/>
        <link rel="icon" href="/favicon.svg"/>
      </Head>
      {
        performances === null ? (
          <div className="fixed inset-0 p-5">
            <DataSourceInput onDrop={handleDrop} errorMessages={errorMessages}/>
          </div>
        ) : (
          <TemplateSummaryView
            companyPerformances={performances.companyPerformances}
            brandPerformances={performances.brandPerformances}
            multiBrandOrders={multiBrandOrders}
          />
        )
      }
      {
        isLoading && <div className="fixed inset-0 bg-black bg-opacity-40 grid place-content-center">
          <Loading/>
        </div>
      }
    </div>
  )
}

export default Home
