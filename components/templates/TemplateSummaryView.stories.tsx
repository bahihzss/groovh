import {TemplateSummaryView, TemplateSummaryViewProps} from './TemplateSummaryView'
import {Meta, Story} from '@storybook/react'
import {brandPerformances, companyPerformances} from '../../mocks/performances'
import {multiBrandOrders} from '../../mocks/orders'

const meta: Meta<TemplateSummaryViewProps> = {
  component: TemplateSummaryView,
}

export default meta

const Template: Story<TemplateSummaryViewProps> = () => <TemplateSummaryView
  companyPerformances={companyPerformances}
  brandPerformances={brandPerformances}
  multiBrandOrders={multiBrandOrders}
/>

export const Default = Template.bind({})
Default.args = {}
