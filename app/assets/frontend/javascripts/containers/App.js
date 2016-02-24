import React from 'react'
import AddTodo from './AddTodo_Ctnr'
import VisibleTodoList from './VisibleTodoList_Ctnr'
import Footer from '../components/Footer'
import ApposPage from './ApposPage/ApposPage'
import AsyncApp from './AsyncApp'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ApposPage />
    <AsyncApp />
  </div>
)

export default App
