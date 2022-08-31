import type {NextPage} from 'next'
import Head from 'next/head'
import {DataSourceInput, OnDropPayload} from '../components/organisms/DataSourceInput'
import {useCallback, useState} from 'react'
import {TemplateSummaryView} from '../components/templates/TemplateSummaryView'

const Home: NextPage = () => {
  const [performances, setPerformances] = useState<null | OnDropPayload>(null)

  const handleDrop = useCallback((payload: OnDropPayload) => {
    setPerformances(payload)
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
            <DataSourceInput onDrop={handleDrop}/>
          </div>
        ) : (
          <TemplateSummaryView
            companyPerformances={performances.companyPerformances}
            brandPerformances={performances.brandPerformances}/>
        )
      }
    </div>
  )
}

export default Home
