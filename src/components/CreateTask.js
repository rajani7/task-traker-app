import React, { useContext, useState } from 'react'
import Modal from './Modal'
import '../style/createTask.scss'
import { createTaskFormInputs } from '../formInputs/createTaskSchema'
import { GlobalContext } from '../store/GlobalState'
import FormRenderer from './FormRenderer'
import { useValidateTasksForm } from '../formInputs/useValidateTasksForm'

const CreateTask = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { createTask } = useContext(GlobalContext)
  let { validateTaskForm, errors, isSubmitted, validateFormElement } = useValidateTasksForm()

  const handleCreateTaskSubmit = (e) => {
    const { projectName, taskName, comments } = e.target

    let hasErrors = validateTaskForm({
      taskName: taskName.value,
      comments: comments.value,
    })
    if (hasErrors) return

    createTask({
      taskName: taskName.value,
      projectName: projectName.value,
      comments: comments.value,
    })

    setModalIsOpen(false)
  }

  return (
    <div className="createTask">
      <Modal isOpen={modalIsOpen}>
        <>
          <div className="">
            <h3 className="d-inline">Create Task</h3>
            <button
              onClick={() => setModalIsOpen(false)}
              type="button"
              className="btn-close float-end"
            ></button>
          </div>

          <hr></hr>
          <FormRenderer
            submitButtonName={'Create'}
            cancelButtonName={'Cancel'}
            inputs={createTaskFormInputs}
            onSubmit={handleCreateTaskSubmit}
            onCancel={() => setModalIsOpen(false)}
            errors={errors}
            isSubmitted={isSubmitted}
            validateFormElement={validateFormElement}
          />
        </>
      </Modal>
      <button
        onClick={() => {
          setModalIsOpen(true)
        }}
        type="button"
        className="btn btn-primary"
      >
        Create Task &nbsp; <i className="fas fa-plus fa-1x"></i>
      </button>
    </div>
  )
}

export default CreateTask
