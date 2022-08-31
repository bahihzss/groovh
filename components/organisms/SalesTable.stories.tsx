import {SalesTable, SalesTableProps} from './SalesTable'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<SalesTableProps> = {
  component: SalesTable,
}

export default meta

const Template: Story<SalesTableProps> = () => <SalesTable brandPerformances={performances.brandPerformances}/>

export const Default = Template.bind({})
Default.args = {}
