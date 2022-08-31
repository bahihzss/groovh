import {TemplateSummaryView, TemplateSummaryViewProps} from './TemplateSummaryView'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<TemplateSummaryViewProps> = {
  component: TemplateSummaryView,
}

export default meta

const Template: Story<TemplateSummaryViewProps> = () => <TemplateSummaryView
  companyPerformances={performances.companyPerformances}
  brandPerformances={performances.brandPerformances}
/>

export const Default = Template.bind({})
Default.args = {}
