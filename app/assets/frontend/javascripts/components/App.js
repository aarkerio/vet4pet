import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import ApposPage from '../containers/ApposPage/ApposPage'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ApposPage />
  </div>
)

export default App
