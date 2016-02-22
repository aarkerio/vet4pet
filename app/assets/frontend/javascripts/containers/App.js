import React from 'react'
import Footer from '../components/Footer'
import AddTodo from './AddTodo_Ctnr'
import VisibleTodoList from './VisibleTodoList_Ctnr'
import ApposPage from './ApposPage/ApposPage'

const App = () => (
  <div>
    <AddTodo />           // container
    <VisibleTodoList />   // container
    <Footer />            // representational
    <ApposPage />         // container
  </div>
)

export default App
