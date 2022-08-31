import {ProfitTable, ProfitTableProps} from './ProfitTable'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<ProfitTableProps> = {
  component: ProfitTable,
}

export default meta

const Template: Story<ProfitTableProps> = () => <ProfitTable brandPerformances={performances.brandPerformances}/>

export const Default = Template.bind({})
Default.args = {}
