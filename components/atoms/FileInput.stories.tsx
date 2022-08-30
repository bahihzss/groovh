import {FileInput, FileInputProps} from "./FileInput"
import {Meta, Story} from "@storybook/react"
import {action} from '@storybook/addon-actions'

const meta: Meta<FileInputProps> = {
  component: FileInput,
}

export default meta

const Template: Story<FileInputProps> = () => (
  <div className="fixed inset-0 p-5">
    <FileInput onChange={action('change')}/>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
