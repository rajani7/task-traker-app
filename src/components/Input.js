import React from 'react'

const Input = (props) => {
  const {
    config: {
        attrs, options, label
    },
    prefillValues,
    errors
  } = props

  const renderInput = () => {
    const checkToBePrefilled = (prefillValues && prefillValues[attrs.name]) || null
    let mergeAttrs = {...attrs, ...(checkToBePrefilled && {defaultValue: prefillValues[attrs.name]})}

    switch (attrs.type) {
      case 'textarea':
        return <textarea {...mergeAttrs}></textarea>

      case 'text':
        return <input {...mergeAttrs}></input>

      case 'select':
        return (
          <select {...mergeAttrs}>
            {options.map((option, i) => {
              return (
                <option key={i} name={option.name} value={option.value}>
                  {option.name}
                </option>
              )
            })}
          </select>
        )

      default:
        return <input {...mergeAttrs}></input>
    }
  }

  return (
    <div className='mb-3'>
      <label className="text-secondary" htmlFor={attrs.id}>
        {label}
      </label>
      <div>{renderInput()}</div>
      <p className='text-danger'>{errors?.[attrs.name]}</p>
    </div>
  )
}

export default Input
