import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import ApposPage from '../containers/ApposPage/ApposPage'

// we must group all our container components
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList /> // container linked to representational with Redux's store
    <Footer />
    <ApposPage />
  </div>
)

export default App
