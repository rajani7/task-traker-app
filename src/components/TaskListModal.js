import React, { useContext } from 'react'
import Modal from './Modal'
import { createTaskFormInputs } from '../formInputs/createTaskSchema'
import { useValidateTasksForm } from '../formInputs/useValidateTasksForm'
import { GlobalContext } from '../store/GlobalState'
import FormRenderer from './FormRenderer'

const TaskListModal = ({ modalIsOpen, setModalIsOpen, prefillEditTask }) => {
  let {
    validateTaskForm,
    errors,
    isSubmitted,
    validateFormElement,
    unMountForm,
  } = useValidateTasksForm()

  const {
    globalState: { tasks = [] },
    deleteTask,
    editTask,
  } = useContext(GlobalContext)

  const handleEditSubmit = (e, id) => {
    const { projectName, taskName, comments } = e.target

    let hasErrors = validateTaskForm({
      taskName: taskName.value,
      comments: comments.value,
    })
    if (hasErrors) return

    editTask({
      taskName: taskName.value,
      projectName: projectName.value,
      comments: comments.value,
      id: id,
    })
    setModalIsOpen(false)
  }

  return (
    <>
      <Modal isOpen={modalIsOpen}>
        <>
          <div>
            <h3 className="d-inline">Edit Task</h3>
            <button
              onClick={() => {
                unMountForm()
                setModalIsOpen(false)
              }}
              type="button"
              className="btn-close float-end"
            ></button>
          </div>

          <hr></hr>

          <FormRenderer
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setModalIsOpen(false)
              unMountForm()
            }}
            submitButtonName="Update Task"
            cancelButtonName="Cancel"
            inputs={createTaskFormInputs}
            prefillValues={prefillEditTask}
            errors={errors}
            isSubmitted={isSubmitted}
            validateFormElement={validateFormElement}
          ></FormRenderer>
        </>
      </Modal>
    </>
  )
}

export default TaskListModal
