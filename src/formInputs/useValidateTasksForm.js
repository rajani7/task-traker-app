import { useEffect, useState } from 'react'

export const useValidateTasksForm = () => {
  let OnlyTextAllowed = {
    regex: /^[a-zA-Z ]+$/,
    errorMsg: 'Only letters are allowed',
  }
  let OnlyAlphaNumericAllowed = {
    regex: /^[a-z0-9A-Z., ]+$/,
    errorMsg: 'Special character not allowed. Comma and Fullstop allowed',
  }

  let [errors, setErrors] = useState({})
  let [isSubmitted, setisSubmitted] = useState(false)
  let tempErrors = { ...errors }

  function validateTaskName(value) {
    if (value.length > 0) {
      if (!OnlyTextAllowed.regex.test(value)) {
        tempErrors = { ...tempErrors, taskName: OnlyTextAllowed.errorMsg }
      } else {
        tempErrors = { ...tempErrors, taskName: '' }
      }
    } else {
      tempErrors = { ...tempErrors, taskName: '' }
    }
  }

  function validateComments(value) {
    // comments input validation
    if (value.length > 0) {
      if (!OnlyAlphaNumericAllowed.regex.test(value)) {
        tempErrors = {
          ...tempErrors,
          comments: OnlyAlphaNumericAllowed.errorMsg,
        }
      } else {
        tempErrors = { ...tempErrors, comments: '' }
      }
    } else {
      tempErrors = { ...tempErrors, comments: '' }
    }
  }

  function validateTaskForm(formData) {
    let { taskName, comments } = formData
    let hasErrors = false
    setisSubmitted(true)
    // call all validations
    validateTaskName(taskName)
    validateComments(comments)

    setErrors(tempErrors)
    Object.keys(tempErrors).forEach((key) => {
      if (tempErrors[key]?.length > 0) {
        hasErrors = true
        return
      }
    })

    if (hasErrors === false) {
      setisSubmitted(false)
    }

    return hasErrors
  }

  function validateFormElement(name, value) {
    switch (name) {
      case 'taskName':
        validateTaskName(value)

        break

      case 'comments':
        validateComments(value)
        break

      default:
        return new Error(`form element name: ${name} is invalid`)
    }

    setErrors(tempErrors)
  }

  function unMountForm() {
    tempErrors = {}
    setErrors({})
    setisSubmitted(false)
  }

  return {
    validateTaskForm, // perform validation all form elements
    errors, // state for errors
    isSubmitted, // state to track if form is submitted atleast once, so onChange on form will trigger based on this
    validateFormElement, // perform validation on single element
    unMountForm, // cleanup
  }
}
