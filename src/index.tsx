import * as React from 'react'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <>Example Component: {text}</>
}
