import {GGlowTableForCompany, GGlowTableForCompanyProps} from './GGlowTableForCompany'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<GGlowTableForCompanyProps> = {
  component: GGlowTableForCompany,
}

export default meta

const Template: Story<GGlowTableForCompanyProps> = () => <GGlowTableForCompany
  companyPerformance={performances.companyPerformances[1]}/>

export const Default = Template.bind({})
Default.args = {}
