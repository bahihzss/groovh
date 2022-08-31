import React from 'react'
import styles from './Alert.module.css'

export interface AlertProps {
  title: string
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({children, title}) => {
  return (
    <div className={styles.Alert}>
      <div className={styles.Alert_title}>
        {title}
      </div>
      <div className={styles.Alert_content}>
        {children}
      </div>
    </div>
  )
}