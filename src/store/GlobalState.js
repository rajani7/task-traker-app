import React, { createContext, useReducer } from 'react'
import { ACTIONS } from './actions'
import GlobalReducer from './Reducer'

const initialState = {
  companyName: 'My Company',
  tasks: [
    {
      id: '1',
      taskName: 'Release new car',
      projectName: 'tesla',
      comments: 'Work in progress',
    },
    {
      id: '2',
      taskName: 'Ship rockets in december',
      projectName: 'spaceX',
      comments: 'Work in progress',
    },
    {
      id: '3',
      taskName: 'Stock price target',
      projectName: 'tesla',
      comments: 'Hit 1000 dollars',
    },
  ],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(GlobalReducer, initialState)

  const createTask = (payload) => {
    const id = globalState.tasks.length + 1
    return dispatch({
      type: ACTIONS.CREATE_TASK,
      payload: { ...payload, id },
    })
  }

  const deleteTask = (id) =>
    dispatch({
      type: ACTIONS.DELETE_TASK,
      id,
    })

  const editTask = (payload) =>
    dispatch({
      type: ACTIONS.EDIT_TASK,
      payload,
    })

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        createTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
