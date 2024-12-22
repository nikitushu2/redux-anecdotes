import { useDispatch, useSelector } from "react-redux";
import {vote} from "../reducers/anecdoteReducer.js"
import { notification } from "../reducers/notificationReducer.js";

export default function AnecdoteList() {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })


    function handleVote(id, content) {
      dispatch(vote(id))
      dispatch(notification(content, 5))
    }

    return (
        <>
        {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}