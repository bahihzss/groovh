import {Alert, AlertProps} from './Alert'
import {Meta, Story} from '@storybook/react'

const meta: Meta<AlertProps> = {
  component: Alert,
}

export default meta

const Template: Story<AlertProps> = () => {
  return (
    <>
      <Alert title="エラー">致命的なエラーが発生しました</Alert>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
