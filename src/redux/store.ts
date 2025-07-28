import { applyMiddleware, createStore } from 'redux'
import charactersReducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(charactersReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export default store
