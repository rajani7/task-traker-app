import React, { useContext, useState } from 'react'
import Modal from './Modal'
import '../style/createTask.scss'
import { createTaskFormInputs } from '../formInputs/createTaskSchema'
import { GlobalContext } from '../store/GlobalState'
import FormRenderer from './FormRenderer'
import { useValidateTasksForm } from '../formInputs/useValidateTasksForm'
import CreateTaskModal from './CreateTaskModal'

const CreateTask = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
 

  return (
    <div className="createTask">
      <CreateTaskModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
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
