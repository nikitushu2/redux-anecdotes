import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes.js"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id
          ? action.payload // New object
          : anecdote
      )
    },
    append(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})


export const { append, set, updateVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const create = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToVote = state.anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

    await anecdoteService.saveVote(updatedAnecdote)
    dispatch(updateVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer