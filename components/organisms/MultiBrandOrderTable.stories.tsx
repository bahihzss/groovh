import {MultiBrandOrderTable, MultiBrandOrderTableProps} from './MultiBrandOrderTable'
import {Meta, Story} from '@storybook/react'
import {multiBrandOrders} from '../../mocks/orders'

const meta: Meta<MultiBrandOrderTableProps> = {
  component: MultiBrandOrderTable,
}

export default meta

const Template: Story<MultiBrandOrderTableProps> = () => (<MultiBrandOrderTable multiBrandOrders={multiBrandOrders}/>)

export const Default = Template.bind({})
Default.args = {}
