import React from 'react'
import styles from './Loading.module.css'

export interface LoadingProps {
}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return <div className={styles['lds-ring']}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}