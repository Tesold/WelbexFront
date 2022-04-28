import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
