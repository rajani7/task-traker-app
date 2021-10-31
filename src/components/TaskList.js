import React, { useContext, useState } from 'react'
import { createTaskFormInputs } from '../formInputs/createTaskSchema'
import { GlobalContext } from '../store/GlobalState'
import FormRenderer from './FormRenderer'
import Modal from './Modal'
import '../style/taskList.scss'
import { useValidateTasksForm } from '../formInputs/useValidateTasksForm'

const TaskList = () => {
  const {
    globalState: { tasks = [] },
    deleteTask,
    editTask,
  } = useContext(GlobalContext)
  let {
    validateTaskForm,
    errors,
    isSubmitted,
    validateFormElement,
  } = useValidateTasksForm()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [prefillEditTask, setprefillEditTask] = useState(null)
  const handleDelete = (id) => {
    deleteTask(id)
  }

  const onEdit = (editableTask) => {
    setprefillEditTask(editableTask)
    setModalIsOpen(true)
  }

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
              onClick={() => setModalIsOpen(false)}
              type="button"
              className="btn-close float-end"
            ></button>
          </div>

          <hr></hr>

          <FormRenderer
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setModalIsOpen(false)
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
      <div className="container">
        <div className="row py-4 align-items-start fw-bolder bg-secondary text-white">
          <div className="col">Task ID</div>
          <div className="col">Task Name</div>
          <div className="col">Project</div>
          <div className="col">Comments</div>
          <div className="col">Task Edit</div>
          <div className="col">Task Delete</div>
        </div>
        {tasks.length === 0 && <p className="text-center my-4">No tasks.</p>}
        {tasks.map((task, i) => {
          const { id, taskName, comments, projectName } = task
          return (
            <div key={i} className="py-2 row align-items-start taskItem">
              <div className="col">{id}</div>
              <div className="col">{taskName}</div>
              <div className="col">{projectName}</div>
              <div className="col">{comments}</div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => onEdit(task)}
                >
                  Edit <i className="far fa-edit fa-1x"></i>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete <i className="far fa-trash-alt fa-1x"></i>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TaskList
