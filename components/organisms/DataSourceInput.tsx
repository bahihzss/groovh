import React from 'react'
import {FileInput} from '../atoms/FileInput'
import {Alert} from '../atoms/Alert'
import styles from './DataSourceInput.module.css'

interface DataSourceInputProps {
  onDrop(files: File[]): void

  errorMessages: string[]
}

export const DataSourceInput: React.FC<DataSourceInputProps> = ({onDrop, errorMessages}) => {
  const handleFileChange = async (files: File[]) => {
    onDrop(files)
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