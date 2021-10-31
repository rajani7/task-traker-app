import { ACTIONS } from './actions'

const Reducer = (state, action) => {
  if (action.type === ACTIONS.CREATE_TASK) {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    }
  }

  if (action.type === ACTIONS.EDIT_TASK) {
    const findTaskIndex = state.tasks.findIndex(
      (e) => e.id === action.payload.id,
    )
    
    const newTasks = [...state.tasks]
    newTasks[findTaskIndex] = action.payload
    return {
      ...state,
      tasks: newTasks,
    }
  }

  if (action.type === ACTIONS.DELETE_TASK) {
    const findTaskIndex = state.tasks.findIndex((e) => e.id === action.id)
    let newTasks = [...state.tasks]
    newTasks.splice(findTaskIndex, 1)

    return {
      ...state,
      tasks: newTasks,
    }
  }

  return state
}

export default Reducer;