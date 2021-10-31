import React, { useContext } from 'react'
import Modal from './Modal'
import FormRenderer from './FormRenderer'
import { createTaskFormInputs } from '../formInputs/createTaskSchema'
import { GlobalContext } from '../store/GlobalState'
import { useValidateTasksForm } from '../formInputs/useValidateTasksForm'

const CreateTaskModal = ({ modalIsOpen, setModalIsOpen }) => {
  const { createTask } = useContext(GlobalContext)
  let {
    validateTaskForm,
    errors,
    isSubmitted,
    validateFormElement,
    unMountForm,
  } = useValidateTasksForm()

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
    <Modal isOpen={modalIsOpen}>
      <>
        <div className="">
          <h3 className="d-inline">Create Task</h3>
          <button
            onClick={() => {
              setModalIsOpen(false)
              unMountForm()
            }}
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
          onCancel={() => {
            setModalIsOpen(false)
            unMountForm()
          }}
          errors={errors}
          isSubmitted={isSubmitted}
          validateFormElement={validateFormElement}
        />
      </>
    </Modal>
  )
}

export default CreateTaskModal
