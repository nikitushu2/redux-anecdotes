import { useDispatch } from "react-redux"
import { create } from "../reducers/anecdoteReducer.js"
import { display } from "../reducers/notificationReducer.js"
import anecdoteService from "../services/anecdotes.js"



export default function AnecdoteForm() {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        showNotification(content)
    }

    function showNotification(content) {
        dispatch(display(`${content} was added!`))
        setTimeout(() => {
            dispatch(display(''))
        }, 5000)
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input name="anecdote" /></div>
            <button onClick={showNotification}>create</button>
        </form>
        </>
    )
}