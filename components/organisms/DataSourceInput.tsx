import React, {useState} from 'react'
import {FileInput} from '../atoms/FileInput'
import {Alert} from '../atoms/Alert'
import styles from './DataSourceInput.module.css'
import {useStore} from '../../hooks/store'
import {BrandRepository} from '../../infrastructure/repositories/brand-repository'
import {BrandPerformanceDto, CalcBrandPerformanceUseCase} from '../../use-case/calc-brand-performance-use-case'
import {CompanyRepository} from '../../infrastructure/repositories/company-repository'
import {CalcCompanyPerformancesUseCase, CompanyPerformanceDto} from '../../use-case/calc-company-performances-use-case'
import {ReceiptRepository} from '../../infrastructure/repositories/receipt-repository'
import {BillingRepository} from '../../infrastructure/repositories/billing-repository'
import {AdPerformanceRepository} from '../../infrastructure/repositories/ad-performance-repository'

export interface OnDropPayload {
  companyPerformances: CompanyPerformanceDto[]
  brandPerformances: BrandPerformanceDto[]
}

interface DataSourceInputProps {
  onDrop(payload: OnDropPayload): void
}

export const DataSourceInput: React.FC<DataSourceInputProps> = ({onDrop}) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([])

  const handleFileChange = async (files: File[]) => {
    const {store, addFromCsv} = useStore()

    const _errorMessages: string[] = []
    for (const file of files) {
      try {
        await addFromCsv(file)
      } catch (e) {
        if (e instanceof Error) _errorMessages.push(e.message)
      }
    }
    setErrorMessages(_errorMessages)

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

    onDrop({companyPerformances, brandPerformances})
  }

  return (
    <>
      <FileInput onChange={handleFileChange}/>
      {errorMessages.length > 0 && (
        <div
          className={styles.DataSourceInput_errorArea}>
          {errorMessages.map((errorMessage) => (
            <Alert key={errorMessage} title="エラー">
              <pre>{errorMessage}</pre>
            </Alert>
          ))}
        </div>
      )}
    </>
  )
}