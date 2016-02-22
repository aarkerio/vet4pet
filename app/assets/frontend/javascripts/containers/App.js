import React from 'react'
import Footer from '../components/Footer'
import AddTodo from './AddTodo_Ctnr'
import VisibleTodoList from './VisibleTodoList_Ctnr'
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
