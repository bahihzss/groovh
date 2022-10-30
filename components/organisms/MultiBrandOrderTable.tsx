import React from 'react'
import {formatStraight, useMatrix} from '../../hooks/matrix'
import {Order} from '../../domain/entities/order'
import Spreadsheet from 'react-spreadsheet'

export interface MultiBrandOrderTableProps {
  multiBrandOrders: Order[]
}

export const MultiBrandOrderTable: React.FC<MultiBrandOrderTableProps> = ({multiBrandOrders}) => {
  const matrix = useMatrix(multiBrandOrders, {
    id: {
      label: 'オーダーID',
      format: formatStraight,
    },
    productIds: {
      label: '商品コード',
      format: (productIds) => productIds.join(', '),
    },
  })

  return (<Spreadsheet data={matrix}/>)
}