import React from 'react'
import AddTodo from './AddTodo_Ctnr'
import VisibleTodoList from './VisibleTodoList_Ctnr'
import Footer from '../components/Footer'
import ApposPage from './ApposPage/ApposPage'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ApposPage />
  </div>
)

export default App
