import React from 'react'
import { Button } from 'components/generic'

export const RemoveButton = ({ arrayHelpers, i }) => {
  return (
    <Button
      fullWidth={false}
      size="small"
      text='Remove Facility'
      type='button'
      onClick={() => {
        if (window.confirm('Are you sure you want to remove this facility?')){
        arrayHelpers.move(i, 0)
        arrayHelpers.remove(0)
        }
      }}
    />
  )
}
export const AddButton = ({ arrayHelpers, initVal }) => {
  return (
    <Button
      fullWidth={false}
      size="small"
      text='Add Another Facility'
      type='button'
      onClick={() => {
        arrayHelpers.push(initVal)
      }}
    />
  )
}
