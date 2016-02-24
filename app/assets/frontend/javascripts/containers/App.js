import React from 'react'
import AddTodo from './AddTodo_Ctnr'
import VisibleTodoList from './VisibleTodoList_Ctnr'
import Footer from '../components/Footer'
import ApposPage from './ApposPage/ApposPage'
import cAsyncApp from './AsyncApp'


const App = () => (
  <div>
    <cAsyncApp />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ApposPage />
  </div>
)

export default App
