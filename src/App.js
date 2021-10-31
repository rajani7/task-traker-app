import './style/index.scss'
import 'bootstrap/dist/css/bootstrap.css'
import CreateTask from './components/CreateTask'
import TaskList from './components/TaskList'
import { GlobalContext, GlobalProvider } from './store/GlobalState'
import { useContext } from 'react'

function App() {
  const { companyName } = useContext(GlobalContext)

  return (
    <div className="container">
      <GlobalProvider>
        <header className='bg-secondary py-4 text-white fw-bold ps-4 fs-4 mb-4'>{companyName}</header>
        <main>
          <section>
            <CreateTask></CreateTask>
          </section>
          <hr />
          <section>
            <TaskList></TaskList>
          </section>
        </main>
      </GlobalProvider>
    </div>
  )
}

export default App
