import {FileInput, FileInputProps} from "./FileInput"
import {Meta, Story} from "@storybook/react"
import {action} from '@storybook/addon-actions'

const meta: Meta<FileInputProps> = {
  component: FileInput,
}

export default meta

const Template: Story<FileInputProps> = () => (
  <div className="grid gap-3">
    <FileInput onChange={action('change')}/>
    <FileInput onChange={action('change')}>
      他のテキストも入れられる
    </FileInput>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
