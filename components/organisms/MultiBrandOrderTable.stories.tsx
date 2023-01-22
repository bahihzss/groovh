import {OrderTable, OrderTableProps} from './OrderTable'
import {Meta, Story} from '@storybook/react'
import {multiBrandOrders} from '../../mocks/orders'

const meta: Meta<OrderTableProps> = {
  component: OrderTable,
}

export default meta

const Template: Story<OrderTableProps> = () => (<OrderTable orders={multiBrandOrders}/>)

export const Default = Template.bind({})
Default.args = {}
