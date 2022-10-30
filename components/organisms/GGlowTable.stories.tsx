import {GGlowTable, GGlowTableProps} from './GGlowTable'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<GGlowTableProps> = {
  component: GGlowTable,
}

export default meta

const Template: Story<GGlowTableProps> = () => <GGlowTable brandPerformances={performances.brandPerformances}/>

export const Default = Template.bind({})
Default.args = {}
