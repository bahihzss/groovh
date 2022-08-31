import {HandleFeeTable, HandleFeeTableProps} from './HandleFeeTable'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<HandleFeeTableProps> = {
  component: HandleFeeTable,
}

export default meta

const Template: Story<HandleFeeTableProps> = () => <HandleFeeTable brandPerformances={performances.brandPerformances}/>

export const Default = Template.bind({})
Default.args = {}
