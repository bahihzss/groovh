import {GGlowTableForCompany, GGlowTableForCompanyProps} from './GGlowTableForCompany'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<GGlowTableForCompanyProps> = {
  component: GGlowTableForCompany,
}

export default meta

const Template: Story<GGlowTableForCompanyProps> = () => <GGlowTableForCompany
  companyPerformances={performances.companyPerformances}
/>

export const Default = Template.bind({})
Default.args = {}
