import React from 'react'
import {formatStraight, useMatrix} from '../../hooks/matrix'
import {Order} from '../../domain/entities/order'
import Spreadsheet from 'react-spreadsheet'

export interface OrderTableProps {
  orders: Order[]
}

export const OrderTable: React.FC<OrderTableProps> = ({orders}) => {
  const matrix = useMatrix(orders, {
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