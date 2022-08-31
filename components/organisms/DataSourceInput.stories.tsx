import {DataSourceInput} from './DataSourceInput'
import {Meta, Story} from '@storybook/react'
import {action} from '@storybook/addon-actions'

const meta: Meta = {
  component: DataSourceInput,
}

export default meta

const Template: Story = () => <div className="fixed inset-0 p-5">
  <DataSourceInput onDrop={action('drop')}/>
</div>

export const Default = Template.bind({})
Default.args = {}
