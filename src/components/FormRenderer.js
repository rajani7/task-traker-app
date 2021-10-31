import React from 'react'
import Input from './Input'

const FormRenderer = ({
  inputs,
  onSubmit,
  onCancel,
  cancelButtonName,
  submitButtonName,
  prefillValues,
  errors,
  validateFormElement,
  isSubmitted,
}) => {
  return (
    <div className="createTaskForm">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e, prefillValues && prefillValues.id)
        }}
        onChange={(e) => {
          validateFormElement &&
            isSubmitted &&
            validateFormElement(e.target.name, e.target.value)
        }}
        autoComplete="off"
      >
        {inputs.map((input, i) => {
          return (
            <React.Fragment key={i}>
              <Input
                config={input}
                prefillValues={prefillValues}
                errors={errors}
              />
            </React.Fragment>
          )
        })}

        <div className="text-end">
          {cancelButtonName && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary m-2"
            >
              {cancelButtonName}
            </button>
          )}
          <button type="submit" className="btn btn-primary m-2">
            {submitButtonName || 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRenderer
