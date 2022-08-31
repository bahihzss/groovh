import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './FileInput.module.css'
import classNames from 'classnames'

export interface FileInputProps {
  children?: React.ReactNode

  onChange(files: File[]): void
}

export const FileInput: React.FC<FileInputProps> = ({children, onChange}) => {
  const handleDropFiles = useCallback((files: File[]) => {
    onChange(files)
  }, [onChange])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: handleDropFiles})

  const rootStyle = classNames(
    styles['FileInput'],
    {
      [styles['FileInput-dragActive']]: isDragActive,
    },
  )

  return (
    <div className={rootStyle} {...getRootProps()}>
      <input {...getInputProps()}/>
      {React.Children.count(children) ? children : 'ここにファイルをドロップ'}
    </div>
  )
}