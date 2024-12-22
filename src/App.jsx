import AnecdoteForm from "./components/AnecdoteForm.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import Filter from './components/Filter.jsx';
import Notification from "./components/Notification.jsx";
import { useEffect } from "react";
import anecdoteService from "./services/anecdotes.js"
import { set } from "./reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App