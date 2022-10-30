import type {AppProps} from 'next/app'
import '../styles/globals.css'
import 'handsontable/dist/handsontable.full.min.css'
import {registerAllModules} from 'handsontable/registry'

registerAllModules()

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
