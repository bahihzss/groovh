import {GGlowTable, GGlowTableProps} from './GGlowTable'
import {Meta, Story} from '@storybook/react'
import {performances} from '../../mocks/performances'

const meta: Meta<GGlowTableProps> = {
  component: GGlowTable,
}

export default meta

const Template: Story<GGlowTableProps> = () => <GGlowTable brandPerformance={performances.brandPerformances[1]}/>

export const Default = Template.bind({})
Default.args = {}
